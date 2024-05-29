import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useState} from 'react';
import {useEffect, useFocusEffect} from 'react';
import {SafeAreaView} from 'react-navigation';
import {BLACK, PRIMARY_COLOR, RED, WHITE} from '../constant/Colors';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomButton from '../components/CustomButton';
import RegisterScreen from './RegisterScreen';
import {HOME_SCREEN, REGISTER_SCREEN} from '../constant/Screens';
import {showToast} from '../components/Toast';
import BannerSlider from '../components/BannerSlider';
import Fonts from '../theme/Fonts';
import {ServerURL, postData, postData2} from '../API/index';
import {CommonActions} from '@react-navigation/native';
import validator from '../components/validation';
import {showError} from '../components/helperFunction';
import {getData} from '../API/index';

import {errorToast, successToast} from '../components/toasts';
import Carousel from 'react-native-reanimated-carousel';
import ImageModal from 'react-native-image-modal';
import {
  Avatar,
  TextInput,
  Button,
  useTheme,
  Searchbar,
  IconButton,
} from 'react-native-paper';
import Color from '../assets/utilis/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import axios from 'axios';


const MyAppointments = ({navigation}) => {
  const {t} = useTranslation();
  const width = Dimensions.get('window').width;
  const user = useSelector(state => state.user);
   console.log('me==>',user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [allAppointments, setAllAppointments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const [docList, setDocList] = React.useState([]);
  const [favDoctorList, setFavDoctorList] = React.useState([]);

  console.log('allAppointments',allAppointments);
  // const [announcementList, setAnnouncementList] = React.useState([
  //   {
  //     announcement:
  //       'This space is for admin announcement/promotion or any other informative post.',
  //     date: '06/12/2022',
  //     id: '1',
  //   },
  //   {
  //     announcement:
  //       'This space is for admin announcement/promotion or any other informative post.',
  //     date: '06/12/2022',
  //     id: '2',
  //   },
  // ]);

  const [announcementList, setAnnouncementList] = React.useState([]);

  const getAnnouncementList = async () => {
    const res = await getData('annoucemnetlist');
    // console.log('annoucemnetlist---->', res?.data);
    if (res?.success) {
      setAnnouncementList(res?.data);
    }
  };

  const getAppointmentList = async () => {
    // console.log('dt==',appointment?.patient_id,appointment?.doctor_id,feedBack,prescriptions)
    setLoading(true);
    var body = {
      patient_id: user?.data?.id,
    };

    //  console.log('body===>', body);
    const result = await postData('patientappointmentdetails', body);
    // console.log('all appoi===>', result?.data);
    if (result?.status) {
      setAllAppointments(result?.data);
    }
    setLoading(false);
  };
//   const getAppointmentList = async () => {
  
//   setLoading(true);
//  await axios.post(`${ServerURL}/patientappointmentdetails`, {
//     patient_id: user?.data?.id,
//   })
//   .then(function (response) {
//     console.log('appList==>',response);
//        if (response?.status) {
//       setAllAppointments(response?.data);
//       setLoading(false)
//     }
//   })
//   .catch(function (error) {
//     console.log(error);
//     setLoading(false)
//   });
// }


 

 

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAppointmentList();
      fetchPopularDoctors(), favouriteDoctorList(), getAnnouncementList();
      // console.log(
      //   'cdshbhdcbh====',
      //   new Date()
      //     .toLocaleTimeString()
      //     .replace(new Date().toLocaleTimeString().slice(-6, -3), ''),
      // );
    });

    return unsubscribe;
  }, []);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     getAppointmentList();
  //  }, 30000);
  // }, []);

  React.useEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  React.useEffect(() => {
    getAppointmentList();
    fetchPopularDoctors(), favouriteDoctorList(), getAnnouncementList();
  }, []);

  const RefreshControl = async () => {
    getAppointmentList();
    fetchPopularDoctors(), favouriteDoctorList(), getAnnouncementList();
    successToast('Refreshed Successfully!');
    // navigation.push('HomeScreen')
  };

  const fetchPopularDoctors = async () => {
    // var result = await getData(`latitude_longitude/${user?.data?.id}`);
    var result = await getData(`popular_doctor`);
    // console.log('result',result)
    // if (result?.success) {
      setDocList(result);
    // }
  };

    // console.log('docList',docList)


  const favouriteDoctorList = async () => {
    setLoading(true);

    let body = {
      patient_id: user?.data?.id,
      // doctor_id:doctor_id,
      // status:status
    };
    // const result = await postData('favourite_doctor', body);
    const result = await getData(`favourite_doctor_list/${user?.data?.id}`);
    if (result.message == "Favorite doctors fetched successfully.") {
      setFavDoctorList(result?.data);
      // setSearchName(result?.data)
      setLoading(false);
      console.log('FDL-->', result?.data);
    }
  };

  const _renderItem = ({item}) => {
    // console.log('item>>>>>>>>>>>>>>>>>>>>>',item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DoctorProfile', {
            Id: item?.doctor_id,
          })
        }
        style={{
          backgroundColor: Color.white,
          borderRadius: 5,
          height: 400,
          //padding: 15,
          marginLeft: 25,
          marginRight: 25,
          alignItems: 'center',
          shadowOffset: {width: 10, height: 10},
          shadowColor: '#fff',
          shadowOpacity: 5,
          elevation: 20,
          shadowRadius: 5,
        }}>
        <Image
          source={{
            uri: item?.profileimage
              ? `data:image/png;base64,${item?.profileimage}`
              : 'https://www.w3schools.com/w3images/avatar6.png',
          }}
          //  source={item.profileimage}
          style={{
            height: 150,
            width: '100%',
            //  borderWidth: 1,
            //  borderColor: Color.black,
          }}
        />
        <Text style={{...styles.doc_name, fontSize: 20}}>{item?.name}</Text>
        <Text style={{...styles.specialization, fontSize: 15}}>
          {item?.specialization}
        </Text>
      </TouchableOpacity>
    );
  };

  const _renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DoctorProfile', {
            Id: item?.doctor_id,
          })
        }
        style={{
          backgroundColor: Color.white,
          borderRadius: 5,
          //  height: 200,
          width: Dimensions.get('window').width / 3 - 15,
          padding: 2,
          // marginLeft: 25,
          marginRight: 7,
          alignItems: 'center',
          shadowOffset: {width: 10, height: 10},
          shadowColor: '#fff',
          shadowOpacity: 5,
          elevation: 20,
          shadowRadius: 5,
          marginTop: 10,
          borderColor: Color.black,
          borderWidth: 0.5,
        }}>
        <Image
          source={{
            uri: item?.profileimage
              ? `data:image/png;base64,${item?.profileimage}`
              : 'https://www.w3schools.com/w3images/avatar6.png',
          }}
          //  source={item.profileimage}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            marginTop: 5,
            //  borderWidth: 1,
            //  borderColor: Color.black,
          }}
        />
        <Text style={styles.doc_name} numberOfLines={1}>
          {item?.name}
        </Text>
        <Text style={styles.specialization}>{item?.specialization}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={{marginTop: 10, paddingHorizontal: 12}}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Searchbar
            placeholder={t('My Appointments.Search Doctor,Clinic')}
            editable={false}
            style={{
              fontFamily: 'Poppins-Bold',
              borderColor: '#557297',
              borderWidth: 2,
            }}
            placeholderTextColor={Color.black}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.middle_container}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Text style={styles.heading_top_style}>
            {t('My Appointments.Your Appointments')} 🗓
          </Text>
          <TouchableOpacity
                      style={[styles.read_btn_style1,{flexDirection:'row',alignItems:'center'}]}
                      onPress={() =>
                        RefreshControl()
                      }>
        <EvilIcons name="refresh" size={20} color={Color.white} style={{}}/>
                      <Text style={styles.read_txt_style}> Refresh</Text>
          </TouchableOpacity>
              </View>
          {allAppointments?.length > 0 ? (
            <FlatList
              data={allAppointments && allAppointments}
              horizontal={true}
              nestedScrollEnabled={true}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.apppointment_card_style}>
                    <Text style={styles.doctor_name_style}>
                      Dr. {item?.Doctorname}
                    </Text>
                    <Text style={styles.appointment_date_style}>
                      {new Date(
                        item?.createdate.split('/').reverse().join('-'),
                      ).getDate() === new Date().getDate() &&
                      new Date(
                        item?.createdate.split('/').reverse().join('-'),
                      ).getMonth() === new Date().getMonth() &&
                      new Date(
                        item?.createdate.split('/').reverse().join('-'),
                      ).getFullYear() === new Date().getFullYear()
                        ? 'Today'
                        : item?.createdate}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View style={styles.token_nmbr_container}>
                        <Text style={styles.token_number_style}>
                          {item?.patient_name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Fonts.primaryBold,
                            fontSize: 60,
                            color: Color.black,
                            textShadowColor: Color.black,
                            textShadowOffset: {width: 0.5, height: 0.5},
                            textShadowRadius: 9,
                          }}>
                          {item?.token_no <= 9
                            ? `0${item.token_no}`
                            : item?.token_no}
                        </Text>
                        <Text style={styles.token_number_style}>
                          {t('My Appointments.Your Token No.')}
                        </Text>
                      </View>

                      <View
                        style={{...styles.token_nmbr_container, marginLeft: 5}}>
                        <Text style={styles.token_number_style}>
                          {item?.patient_name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Fonts.primaryBold,
                            fontSize: 60,
                            color: Color.black,
                            textShadowColor: Color.black,
                            textShadowOffset: {width: 0.5, height: 0.5},
                            textShadowRadius: 9,
                          }}>
                          {/* {new Date((item.createdate).split('/').reverse().join("-")).getDate() !==
                      new Date().getDate() &&
                      new Date((item.createdate).split('/').reverse().join("-")).getMonth() ==
                      new Date().getMonth() 
                        ? '00'
                        : item.highConsulting} */}
                          {item?.highConsulting <= 9 &&
                          item?.highConsulting != null
                            ? `0${item?.highConsulting}`
                            : item?.highConsulting === null
                            ? '00'
                            : item?.highConsulting}
                        </Text>
                        <Text style={styles.token_number_style}>
                          {t('My Appointments.Now Consulting')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: Color.grey,
                  fontSize: 16,
                  fontFamily: Fonts.primarySemiBold,
                }}>
                {t('My Appointments.You have no appointments')}
              </Text>
            </View>
          )}

          <Text style={styles.heading_top_style}>
            {t('My Appointments.Announcements')} 🔊
          </Text>
          {announcementList && (
            <FlatList
              data={announcementList}
              horizontal={true}
              nestedScrollEnabled={true}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.announcement_card_style}>
                   
                    <View
                      style={{
                        height: Dimensions.get('window').height / 5,
                        width: Dimensions.get('window').width / 3,
                      }}>
                      <View
                        style={{
                          alignSelf: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}>
                        <ImageModal
                          modalImageResizeMode="contain"
                          modalImageStyle={{
                            height: 200,
                            width: 317,
                            borderRadius: 20,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                          source={{
                            uri: `https://rapidhealth.me/public/assets/adminannoucementimage/${item?.annoucement_image}`,
                          }}
                          style={{
                            height: 80,
                            width: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            borderRadius: 5,
                            alignSelf: 'center',
                            
                          }}
                        />
                      </View>
                      <Text
                        style={styles.announcement_txt_style}
                        numberOfLines={2}>
                        {item?.message}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.read_btn_style}
                      onPress={() =>
                        navigation.navigate('ReadMore', {
                          announcementId: item?.id,
                        })
                      }>
                      <Text style={styles.read_txt_style}>Read More ...</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
          {favDoctorList && (
            <>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.heading_top_style}>
                  {t('My Appointments.Favourite Doctors')} 👨‍⚕️
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyFavouriteDoctors')}>
                  <Text
                    style={{
                      ...styles.heading_top_style,
                      fontSize: 15,
                      marginTop: 5,
                      fontFamily: Fonts.primarySemiBold,
                    }}>
                    {t('My Appointments.View All')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Carousel
              mode="parallax"
              loop
              width={width - 50}
              height={width-140}
              autoPlay={true}
              //data={[...new Array(6).keys()]}
              data={favDoctorList}
              scrollAnimationDuration={1000}
              // onSnapToItem={index => console.log('current index:', index)}
              renderItem={_renderItem}
            />
          </View> */}

              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => `key-${index}`}
                nestedScrollEnabled={true}
                data={favDoctorList}
                numColumns={3}
                horizontal={false}
                renderItem={_renderItem2}
              />
            </>
          )}

          <Text style={styles.heading_top_style}>
            {t('My Appointments.Popular Doctors')} 👨‍⚕️
          </Text>
          {docList && (
            <View
              style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Carousel
                mode="parallax"
                loop
                width={width - 50}
                height={width - 140}
                autoPlay={true}
                // data={[...new Array(6).keys()]}
                data={docList}
                scrollAnimationDuration={5000}
                // onSnapToItem={index => console.log('current index:', index)}
                renderItem={_renderItem}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        <Button
          labelStyle={{
            color: Color.white,
            fontSize: 18,
            fontFamily: Fonts.primarySemiBold,
          }}
          style={{
            backgroundColor: Color.black,
            width: Dimensions.get('window').width - 20,
            // borderRadius: 12,
            position: 'absolute',
            bottom: 10,
          }}
          contentStyle={{height: 55, alignItems: 'center'}}
          uppercase={false}
          dark
          // loading={loading}
          mode="contained"
          onPress={() =>
            navigation.navigate('CategoryDoctor', {
              appointmentDetails: {},
              reschedule: false,
              otherDoctorAppointment: false,
            })
          }>
          {t('My Appointments.Book an Appointment')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MyAppointments;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },

  top_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  address_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  address_style: {
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    paddingLeft: 5,
  },
  middle_container: {
    paddingHorizontal: 15,
  },
  heading_top_style: {
    fontFamily: Fonts.primaryBold,
    color: '#f5636d',

    paddingTop: 20,
    fontSize: 20,
  },
  apppointment_card_style: {
    marginLeft: 8,
    marginTop: 10,

    backgroundColor: '#fffcf3',
    paddingBottom: 12,
    paddingHorizontal: 10,
    //  width: Dimensions.get('window').width - 100,
    borderRadius: 30,
    elevation: 100,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    shadowColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctor_name_style: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    // borderBottomColor: Color.black,
    // borderBottomWidth: 0.5,
    fontSize: 18,

    textAlign: 'center',
  },
  appointment_date_style: {
    fontFamily: Fonts.primarySemiBold,
    color: '#f5636d',

    fontSize: 15,

    textAlign: 'center',
  },
  token_nmbr_container: {
    borderColor: Color.black,
    borderWidth: 1.5,
    alignItems: 'center',
    borderRadius: 20,
    // paddingHorizontal: 15,
    width: Dimensions.get('window').width / 2 - 30,
  },
  token_number_style: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,

    textAlign: 'center',

    fontSize: 15,
  },
  current_token_number_style: {
    fontFamily: Fonts.primaryRegular,

    textAlign: 'center',
    color: Color.black,
    fontSize: 17,
  },

  announcement_card_style: {
    marginLeft: 8,
    marginTop: 10,
    backgroundColor: '#fffcf3',
    padding: 15,
    // flex: 1,
    width: Dimensions.get('window').width / 2,
    // maxHeight: Dimensions.get('window').height/2-150,
    // minHeight:200,
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
    // alignItems:'center'
  },
  announcement_header_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  announcement_txt_style: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,

    // textAlign:'center',
    paddingVertical: 5,
    fontSize: 17,
    // paddingHorizontal: 10,
    flex: 1,
  },
  read_btn_style: {
    alignSelf: 'center',
    backgroundColor: Color.primary2,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    elevation: 10,
  },
  read_btn_style1: {
    alignSelf: 'center',
    backgroundColor: Color.primary2,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    elevation: 10,
  },
  read_txt_style: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.white,

    fontSize: 12,
  },
  date_style: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,

    fontSize: 12,
  },
  doc_name: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    fontSize: 12,
    paddingTop: 15,
  },
  specialization: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,

    fontSize: 8,
  },
});
