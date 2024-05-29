import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Fonts from '../theme/Fonts';
import Color from '../assets/utilis/Color';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {getData} from '../API';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RazorpayCheckout from 'react-native-razorpay';
import AppointmentScreen from './AppointmentScreen';
import {successToast, errorToast} from '../components/toasts';
import {useSelector} from 'react-redux';
import {postData} from '../API';
import {useTranslation} from 'react-i18next';

const DoctorProfile = ({navigation, route}) => {
  const {t} = useTranslation();
  const {Id} = route?.params;

  const {reschedule} = route?.params;
  const {appointmentDetails} = route?.params;
  const {otherDoctorAppointment} = route?.params;
  console.log('appointmentDetails==', appointmentDetails);
  const user = useSelector(state => state.user);
  console.log('Id==', Id);
  console.log('user==', user);
  const theme = {colors: {text: '#000', background: '#fff'}};
  const [doctorData, setDoctorData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [morningSchedule, setMorningSchedule] = React.useState([]);
  const [eveningSchedule, setEveningSchedule] = React.useState([]);
  const [timeSchedule, setTimeSchedule] = React.useState();
  const [comment, setComment] = React.useState('');
  const [allComments, setAllComments] = React.useState([]);
  const [announcements, setAnnouncements] = React.useState([]);
  const [experience, setExperience] = React.useState('');

  const [timing, setTiming] = useState([
    {
      Day: 'Monday',
      morning_start_time: '10 am',
      morning_end_time: '2 pm',
      evening_start_time: '3 pm',
      evening_end_time: '7 pm',
      key: 1,
    },
    {
      Day: 'Tuesday',
      morning_start_time: '10 am',
      morning_end_time: '2 pm',
      evening_start_time: '3 pm',
      evening_end_time: '7 pm',
      key: 2,
    },
    {
      Day: 'Wednesday',
      morning_start_time: '10 am',
      morning_end_time: '2 pm',
      evening_start_time: '3 pm',
      evening_end_time: '7 pm',
      key: 3,
    },
    {
      Day: 'Thursday',
      morning_start_time: '10 am',
      morning_end_time: '2 pm',
      evening_start_time: '3 pm',
      evening_end_time: '7 pm',
      key: 4,
    },
    {
      Day: 'Friday',
      morning_start_time: '10 am',
      morning_end_time: '2 pm',
      evening_start_time: '3 pm',
      evening_end_time: '7 pm',
      key: 5,
    },
    {
      Day: 'Saturday',
      morning_start_time: '10 am',
      morning_end_time: '2 pm',
      evening_start_time: '3 pm',
      evening_end_time: '7 pm',
      key: 6,
    },
  ]);

  const getDoctorProfile = async () => {
    setLoading(true);
    let body = {
      patient_id: user?.data?.id,
    };
    let result = await getData(`doctorlist/${user?.data?.id}`);
    if (result.success) {
      const filteredData = result.data.filter(item => item.doctor_id === Id);

      setDoctorData(filteredData);
      console.log('filteredData====', filteredData);
      console.log('fav====', filteredData[0].favourite_status);
      setFavouriteUnfavourite(filteredData[0].favourite_status);
      calculateExperience(filteredData[0].experience);
      setMorningSchedule(filteredData[0].schedule_morning);
      setEveningSchedule(filteredData[0].schedule_evening);

      setLoading(false);
    }
  };

  const [favouriteUnfavourite, setFavouriteUnfavourite] = React.useState(
    doctorData[0]?.favourate_status,
  );

  // const getDoctorProfile = async () => {
  //   setLoading(true);
  //   let result = await getData(`dolo/profile/${Id}`);
  //   if (result.success) {

  //     setDoctorData(result?.data);
  //     console.log('filteredData====', result);
  //  //  console.log('expyear====', filteredData[0].experience);
  //    calculateExperience(result?.data?.experience);
  //      setMorningSchedule(result?.data?.schedule_morning);
  //      setEveningSchedule(result?.data?.schedule_evening);

  //     setLoading(false);
  //   }
  // };

  const setDoctorFavouriteUnfavourite = async () => {
    console.log('favouriteUnfavourite',favouriteUnfavourite);
    let body = {
      patient_id: user?.data?.id,
      doctor_id: doctorData[0]?.doctor_id,
      status: favouriteUnfavourite == 0 ? 1 : 0,
    };
       console.log('body',body);
    let res = await postData('favourite_doctor', body);
    console.log('res',res);
    if (res?.success) {
      setFavouriteUnfavourite(prev => !prev);
      // getDoctorProfile();
      // successToast(t('Doctor Profile.statusUpdated'));
      successToast(res.message);
    } else {
      errorToast('book an appointment first');
      console.log('body==', body, favouriteUnfavourite);
    }
  };

  const checkValidation = () => {
    if (comment == '') {
      errorToast('Cannot Send Blank Comment');
    } else {
      sendComment();
    }
  };

  const sendComment = async txt => {
    var body = {
      patient_id: user?.data?.id,
      doctor_id: Id,
      comment: comment,
    };
    console.log();
    const result = await postData(`patientfeedbackdoctor`, body);
    if (result.status) {
      successToast('comment send successfully');
      await getAllComments();
      setComment('');
    } else {
      errorToast('You Cannot Comment here');
      setComment('');
    }
  };

  const getAllComments = async () => {
    let result = await getData(`patientfeedbacklistdoctor/${Id}`);

    if (result.status) {
      setAllComments(result.data);
    }
  };

  const getAnnouncementList = async () => {
    var body = {
      doctor_id: Id,
    };

    let result = await postData('patientdoctorannoucementlist', body);
    if (result.success) {
      setAnnouncements(result.data);
    }
  };

  const getTimeSchedule = async () => {
    //  setLoading(true);
    let result = await getData(`scheduleprofile/${Id}`);
    if (result.message == 'Successully') {
      setTimeSchedule(result?.data[0]);
    }
  };

  useEffect(() => {
    getDoctorProfile();
    getTimeSchedule();
    getAllComments();
    getAnnouncementList();
    setFavouriteUnfavourite(doctorData[0]?.favourate_status);
  }, [Id]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getDoctorProfile();
  //     getTimeSchedule();
  //     getAllComments();
  //     getAnnouncementList();
  //     setFavouriteUnfavourite(doctorData[0]?.favourate_status);
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  const calculateExperience = async experience => {
    var d = new Date();

    var userday = new Date('30-04-2023'.split('-').reverse().join('-')).getDate();
    var usermonth = new Date(
      '30-04-2023'.split('-').reverse().join('-'),
    ).getMonth();
    var useryear = new Date(
      '30-04-2023'.split('-').reverse().join('-'),
    ).getFullYear();

    var curday = d.getDate();
    var curmonth = d.getMonth() + 1;
    var curyear = d.getFullYear();
   console.log('--',curday,curmonth,curyear)
    var exp = curyear - useryear;

    if (curmonth < usermonth || (curmonth >= usermonth && curyear >= useryear && curday >= userday )) {
    return exp--;
    }
    console.log('expppp==', exp);
    return setExperience(exp);
  };

  React.useEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackButton);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []),
  );

  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
      {/* <View style={{flexDirection: 'row', padding: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Doctor Profile</Text>
      </View> */}
      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <>
            <DoctorPlaceholder />
            <DoctorPlaceholder />
            <DoctorPlaceholder />
            <DoctorPlaceholder />
            <DoctorPlaceholder />
          </>
        ) : (
          <View style={styles.listItem}>
            <View
              style={{
                flexDirection: 'row',
                width: Dimensions.get('window').width - 136,
              }}>
              <ImageBackground
                style={styles.listImage}
                imageStyle={{borderRadius: 15}}
                source={{
                  uri: doctorData[0]?.profileimage
                    ? `data:image/png;base64,${doctorData[0]?.profileimage}`
                    : 'https://www.w3schools.com/w3images/avatar6.png',
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', padding: 5}}
                  onPress={() => setDoctorFavouriteUnfavourite()}>
                  <MaterialCommunityIcons
                    size={30}
                    name="cards-heart"
                    color={favouriteUnfavourite == 1 ? Color.red : Color.white}
                  />
                </TouchableOpacity>
              </ImageBackground>
              <View style={styles.listItemText}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.listItemTitle}>
                    Dr. {doctorData[0]?.name}
                  </Text>
                  {doctorData[0]?.doctor_available == 1 ? (
                    // <Octicons
                    // name='dot-fill'
                    // color={Color.green}
                    // size={20}
                    // />
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        backgroundColor: Color.green,
                      }}></View>
                  ) : (
                    // <Octicons
                    // name='dot-fill'
                    // color={Color.red}
                    // size={20}
                    // />
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        backgroundColor: Color.red,
                      }}></View>
                  )}
                </View>
                <Text style={styles.listItemSubTitle}>
                  {doctorData[0]?.specialization}
                </Text>
                {doctorData[0]?.experienceyear && (
                  <Text style={styles.listItemSubTitle}>
                    <Text style={{color: Color.red}}>
                      {doctorData[0]?.experienceyear} 
                      {/* {t('Doctor Profile.years')} */}
                    </Text>{' '}
                    {t('Doctor Profile.experience')}
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {[1, 2, 3, 4, 5].map(count => {
                    return (
                      <MaterialCommunityIcons
                        name="star"
                        size={28}
                        color={
                          count <= doctorData[0]?.rating ? 'orange' : 'grey'
                        }
                      />
                    );
                  })}
                </View>
                <Text style={styles.listItemSubTitle}>
                  <Text style={styles.add_heding_style}>
                    {' '}
                    {t('Doctor Profile.Clinic Address')}
                  </Text>{' '}
                  :{' '}
                  {doctorData[0]?.location &&
                    doctorData[0]?.location}
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('MapScreen', {
                        // latitude:doctorData[0]?.latitude,
                        // longitude:doctorData[0]?.longitude
                        position: doctorData[0],
                        location: doctorData[0].location,
                      })
                    }>
                    <Text style={styles.accept_style}>
                      {t('Doctor Profile.Map Location')}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
             {[1, 2, 3, 4, 5].map(count => {
                      return (
                        <MaterialCommunityIcons
                          name="star"
                          size={20}
                         // color={count <= item.rating ? 'orange' : 'grey'}
                         color={'orange'}
                        />
                      );
                    })}
          </View> */}
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              {/* {item.status == '0' && (
          <Text
            style={{
              color: Color.red,
              fontFamily: Fonts.primarySemiBold,
            }}>
            Pending
          </Text>
        )} */}
            </View>
          </View>
        )}
        {loading ? (
          <>
            <DoctorPlaceholder />
            <DoctorPlaceholder />
            <DoctorPlaceholder />
            <DoctorPlaceholder />
          </>
        ) : (
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
              width: Dimensions.get('window').width - 80,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.detail_lable_style}>
                {t('Doctor Profile.Qualification')} :
              </Text>

              <Text style={styles.detail_txt_style}>
                {doctorData[0]?.Degree}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.detail_lable_style}>
                  {t('Doctor Profile.Consultation Fees')} :
                </Text>

                <Text style={styles.detail_txt_style}>
                  {doctorData[0]?.fees}/-
                </Text>
              </View>
              {doctorData[0]?.feeconsultation == 1 ? (
                <Text style={styles.accept_style}>
                  {t('Doctor Profile.Accept Online')}
                </Text>
              )  :
              ( <Text style={styles.accept_style}>
                {t('Doctor Profile.Pay At Clinic')}
              </Text>)
            
            } 
                 
          
           
            </View>
            {/* <View style={{flexDirection: 'row'}}>
              <Text style={styles.detail_lable_style}>
                {t('Doctor Profile.Speciality')} :
              </Text>

              <Text style={styles.speciality_detail_txt_style}>
                {doctorData[0]?.speciality}
              </Text>
            </View> */}

            <View style={{flexDirection: 'row'}}>
              <Text style={styles.detail_lable_style}>
                {t('Doctor Profile.Facilities')} :
              </Text>

              <Text style={styles.speciality_detail_txt_style}>
                {doctorData[0]?.facilities}
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 10,
          }}>
        {/* { doctorData[0]?.doctor_available == 1 && */}
         <Button
            labelStyle={{
              color: Color.white,
              fontSize: 12,
              fontFamily: Fonts.primarySemiBold,
            }}
            style={{
              backgroundColor: Color.black,
              // marginTop: 10,
              // marginBottom: 10,
              // borderRadius: 12,
            }}
            uppercase={false}
            color={'#000'}
            contentStyle={{
              height: 45,
              // alignItems: 'center',
              color: Color.primary,
            }}
            dark
            // loading={loading}
            mode="contained"
            onPress={() =>
              reschedule === true
                ? navigation.navigate('AppointmentBookingScreen', {
                    doctor_details: doctorData,
                    morningSchedule: morningSchedule,
                    eveningSchedule: eveningSchedule,
                    reschedule: true,
                    appointmentDetails: appointmentDetails,
                    otherDoctorAppointment: true,
                  })
                : navigation.navigate('AppointmentBookingScreen', {
                    doctor_details: doctorData,
                    morningSchedule: morningSchedule,
                    eveningSchedule: eveningSchedule,
                  })
            }>
            {t('Doctor Profile.Book Appointment')}
          </Button>
          {/* } */}

          <Button
            labelStyle={{
              color: Color.white,
              fontSize: 12,
              fontFamily: Fonts.primarySemiBold,
            }}
            style={{
              backgroundColor: Color.black,
              marginLeft: 10,
              // marginTop: 10,
              // marginBottom: 10,
              // borderRadius: 12,
            }}
            uppercase={false}
            color={'#000'}
            contentStyle={{
              height: 45,
              // alignItems: 'center',
              color: Color.primary,
              paddingHorizontal: 10,
            }}
            dark
            // loading={loading}
            mode="contained"
            onPress={() =>
              navigation.navigate('RatingScreen', {
                doctor_data: doctorData,
              })
            }>
            {t('Doctor Profile.Rate Doctor')}
          </Button>
        </View>

        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <Text style={styles.detail_lable_style}>
            {t('Doctor Profile.Timings')} ⏰
          </Text>

          {/* <FlatList
            data={timeSchedule}
            horizontal={true}
            nestedScrollEnabled={true}
            
            renderItem={_renderItem}
          /> */}
          {/* --------- */}
          <ScrollView horizontal={true}>
            {timeSchedule?.Sunday?.morning?.checked &&
              timeSchedule?.Sunday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {t('Doctor Profile.Sunday')}
                  </Text>
                  {timeSchedule?.Sunday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {new Date(timeSchedule?.Sunday?.morning?.start_time)
                        .toLocaleTimeString()
                        .slice(0, -6)}
                      {new Date(timeSchedule?.Sunday?.morning?.start_time)
                        .toLocaleTimeString()
                        .slice(8)}{' '}
                      -{' '}
                      {new Date(timeSchedule?.Sunday?.morning?.end_time)
                        .toLocaleTimeString()
                        .slice(0, -6)}
                      {new Date(timeSchedule?.Sunday?.morning?.end_time)
                        .toLocaleTimeString()
                        .slice(7)}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}

                  {timeSchedule?.Sunday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {timeSchedule?.Sunday?.evening?.start_time} -{' '}
                      {timeSchedule?.Sunday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}

            {/* --------- */}
            {timeSchedule?.Monday?.morning?.checked &&
              timeSchedule?.Monday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {t('Doctor Profile.Monday')}
                  </Text>
                  {timeSchedule?.Monday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {timeSchedule?.Monday?.morning?.start_time} -{' '}
                      {timeSchedule?.Monday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}

                  {timeSchedule?.Monday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {timeSchedule?.Monday?.evening?.start_time} -{' '}
                      {timeSchedule?.Monday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Tuesday?.morning?.checked &&
              timeSchedule?.Tuesday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {t('Doctor Profile.Tuesday')}
                  </Text>
                  {timeSchedule?.Tuesday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {timeSchedule?.Tuesday?.morning?.start_time} -{' '}
                      {timeSchedule?.Tuesday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}

                  {timeSchedule?.Tuesday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {timeSchedule?.Tuesday?.evening?.start_time} -{' '}
                      {timeSchedule?.Tuesday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Wednesday?.morning?.checked &&
              timeSchedule?.Wednesday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {t('Doctor Profile.Wednesday')}
                  </Text>
                  {timeSchedule?.Wednesday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {timeSchedule?.Wednesday?.morning?.start_time} -{' '}
                      {timeSchedule?.Wednesday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}

                  {timeSchedule?.Wednesday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {timeSchedule?.Wednesday?.evening?.start_time} -{' '}
                      {timeSchedule?.Wednesday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Thursday?.morning?.checked &&
              timeSchedule?.Thursday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {t('Doctor Profile.Thursday')}
                  </Text>
                  {timeSchedule?.Thursday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {timeSchedule?.Thursday?.morning?.start_time} -{' '}
                      {timeSchedule?.Thursday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}

                  {timeSchedule?.Thursday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {timeSchedule?.Thursday?.evening?.start_time} -{' '}
                      {timeSchedule?.Thursday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Friday?.morning?.checked &&
              timeSchedule?.Friday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {t('Doctor Profile.Friday')}
                  </Text>
                  {timeSchedule?.Friday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {timeSchedule?.Friday?.morning?.start_time} -{' '}
                      {timeSchedule?.Friday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}

                  {timeSchedule?.Friday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {timeSchedule?.Friday?.evening?.start_time} -{' '}
                      {timeSchedule?.Friday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
            {/* --------- */}
            {timeSchedule?.Saturday?.morning?.checked &&
              timeSchedule?.Saturday?.evening?.checked && (
                <View style={styles.timing_card_style}>
                  <Text style={styles.day_name_style}>
                    {t('Doctor Profile.Saturday')}
                  </Text>
                  {timeSchedule?.Saturday?.morning?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {timeSchedule?.Saturday?.morning?.start_time} -{' '}
                      {timeSchedule?.Saturday?.morning?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Morning')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}

                  {timeSchedule?.Saturday?.evening?.checked ? (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {timeSchedule?.Saturday?.evening?.start_time} -{' '}
                      {timeSchedule?.Saturday?.evening?.end_time}
                    </Text>
                  ) : (
                    <Text style={styles.shift_style}>
                      {t('Doctor Profile.Evening')} :{' '}
                      {t('Doctor Profile.Close')}
                    </Text>
                  )}
                </View>
              )}
            {/* ------------ */}
          </ScrollView>
        </View>

        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <Text style={styles.detail_lable_style}>
            {t('Doctor Profile.Announcements')} 🔊
          </Text>

          {announcements != null &&
            announcements.map((item, index) => {
              return (
                <TouchableOpacity style={styles.card}>
                  <Text
                    style={{
                      color: Color.white,
                      fontFamily: Fonts.primaryRegular,
                    }}>
                    {item.annoucement_message}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>

        <KeyboardAvoidingView>
          <View style={{paddingHorizontal: 15, marginTop: 15}}>
            <Text style={styles.detail_lable_style}>
              {t('Doctor Profile.Leave a Comment')} 📝
            </Text>
            <View style={styles.comment_section_style}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25, marginTop: 5}}
                source={{
                  uri: 'https://www.w3schools.com/w3images/avatar6.png',
                }}
              />
              <TextInput
                theme={theme}
                dense
                value={comment}
                onChangeText={text => setComment(text)}
                mode="flat"
                underlineColor={Color.black}
                activeUnderlineColor={Color.black}
                style={{
                  paddingVertical: 5,
                  marginTop: 10,
                  color: Color.black,
                  width: '70%',
                  marginLeft: 7,
                }}
                multiline={true}
                numberoflines={'8'}
              />

              <Button
                mode="text"
                // loading={sendLoading}
                icon="send"
                onPress={() => checkValidation()}
                uppercase={false}
                labelStyle={{
                  color: Color.black,
                  fontSize: 25,
                }}
                contentStyle={
                  {
                    // marginLeft:15
                  }
                }
                style={{
                  marginTop: 10,
                }}
              />
            </View>

            <Text style={{...styles.detail_lable_style, marginTop: 20}}>
              {t('Doctor Profile.All Comments')} 🧾
            </Text>
            {allComments !== null &&
              allComments.map((item, index) => {
                return (
                  <View style={styles.all_comment_section_style}>
                    <Image
                      style={{width: 50, height: 50, borderRadius: 25}}
                      source={{
                        uri: item?.Patientprofile
                          ? `data:image/png;base64,${item?.Patientprofile}`
                          : 'https://www.w3schools.com/w3images/avatar6.png',
                      }}
                    />
                    <Text style={styles.comment_style}>{item?.comment}</Text>
                  </View>
                );
              })}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
  },
  listItem: {
    justifyContent: 'space-between',
    padding: 15,
    // marginVertical: 10,
    // backgroundColor: '#fff',
    // borderRadius: 15,
    // elevation: 8,
    // shadowColor: Color.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    width: '100%',
  },
  listImage: {
    height: 120,
    width: 100,
    //  borderRadius: 15,
    marginRight: 15,
  },
  listItemText: {
    justifyContent: 'space-evenly',
  },
  listItemTitle: {
    fontSize: 16,
    flex: 1,
    color: Color.black,
    // fontWeight: '700',
    fontFamily: Fonts.primaryBold,
  },
  listItemSubTitle: {
    fontSize: 14,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
  },
  add_heding_style: {
    fontSize: 16,
    fontFamily: Fonts.primaryBold,
    marginLeft: -30,
  },
  detail_lable_style: {
    color: Color.red,
    fontFamily: Fonts.primaryBold,
    fontSize: 15,
  },
  detail_txt_style: {
    color: Color.black,
    fontFamily: Fonts.primaryBold,
    fontSize: 20,
    paddingLeft: 5,
  },
  accept_style: {
    color: '#1d387a',
    fontFamily: Fonts.primaryBold,
    fontSize: 12,
    paddingLeft: 20,
  },
  speciality_detail_txt_style: {
    color: Color.black,
    fontFamily: Fonts.primaryBold,
    fontSize: 16,
    paddingLeft: 5,
    //marginTop:5
  },
  timing_card_style: {
    marginLeft: 8,
    marginTop: 10,
    backgroundColor: '#fffcf3',
    paddingVertical: 15,
    paddingHorizontal: 3,
    width: Dimensions.get('window').width - 100,
    borderRadius: 8,
    elevation: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    //backgroundColor: '#25CCF7',
    shadowColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  day_name_style: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    borderBottomColor: Color.black,
    borderBottomWidth: 0.5,
    fontSize: 18,
    width: '95%',
    textAlign: 'center',
    // paddingVertical: 5,
  },
  shift_style: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    borderBottomColor: Color.black,
    borderBottomWidth: 0.5,
    width: '95%',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 17,
  },
  comment_section_style: {
    // marginTop:15,
    // paddingHorizontal:15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  all_comment_section_style: {
    marginTop: 10,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  comment_style: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,

    fontSize: 17,
    width: '80%',
  },
  card: {
    // height: 50,
    // flex: 1,
    margin: 10,
    borderRadius: 10,
    elevation: 10,
    // padding: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#a9a9a9',
    shadowColor: Color.black,
    justifyContent: 'center',
    //  alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
