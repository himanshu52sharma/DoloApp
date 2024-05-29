import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import React from 'react';
import HistoryCard from '../components/HistoryCard';
import Color from '../assets/utilis/Color';
import {useSelector} from 'react-redux';
import {getData, postData} from '../API';
import {useEffect} from 'react';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import HistoryPlaceholder from '../placeholders/HistoryPlaceholder';
import Fonts from '../theme/Fonts';
import RescheduleModal from '../components/modals/RescheduleModal';
import {transformFileSync} from '@babel/core';
import {errorToast, successToast} from '../components/toasts';
import {useDispatch} from 'react-redux';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
const PatientHistory = ({navigation}) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [appointmentHistory, setAppointmentHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [morningSchedule, setMorningSchedule] = React.useState([]);
  const [eveningSchedule, setEveningSchedule] = React.useState([]);
  const [doctorData, setDoctorData] = React.useState([]);
  const [doctorType, setDoctorType] = React.useState('Same');
  const [appointmentType, setAppointmentType] = React.useState('Reschedule');

  const getPatientHistory = async () => {
    setLoading(true);
    var result = await getData(
      `patient_appointment_previous_history/${user?.data?.id}`,
    );
    if (result.status) {
      console.log('history==', result.data);
      setAppointmentHistory(result.data);

      setLoading(false);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPatientHistory();
    });
    return unsubscribe;
  }, [navigation]);

  const getDoctorProfile = async Id => {
    console.log('idddd==', Id);
    setLoading(true);
    let result = await getData('doctorlist');
    if (result.success) {
      const filteredData = result.data.filter(item => item.doctor_id === Id);

      setDoctorData(filteredData);
      // console.log('filteredData====',filteredData)

      setMorningSchedule(filteredData[0].schedule_morning);
      setEveningSchedule(filteredData[0].schedule_evening);

      setLoading(false);
    }
  };

  const sameDoctorAppointment = async appointment => {
    // setAppointmentType("Reschedule")
    setLoading(true);
    console.log('hfhhfhf=====', appointment);
    // await getDoctorProfile(Id);

    let result = await getData('doctorlist');
    if (result.success) {
      const filteredData = result.data.filter(
        item => item.doctor_id === appointment.doctor_id,
      );

      setDoctorData(filteredData);
      // console.log('filteredData====',filteredData)

      setMorningSchedule(filteredData[0].schedule_morning);
      setEveningSchedule(filteredData[0].schedule_evening);

      await navigation.navigate('AppointmentBookingScreen', {
        doctor_details: filteredData,
        morningSchedule: filteredData[0].schedule_morning,
        eveningSchedule: filteredData[0].schedule_evening,

        appointmentDetails: appointment,
        reschedule: true,
      });

      // dispatch({
      //   type: 'SET_APPOINTMENT_TYPE',
      //   payload: appointmentType,
      // });

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [
      //       {
      //         name: 'AppointmentBookingScreen',
      //         params: {
      //           doctor_details: filteredData,
      //           morningSchedule: filteredData[0].schedule_morning,
      //           eveningSchedule: filteredData[0].schedule_evening,
      //           appointmentDetails: appointment,
      //         },
      //       },
      //     ],
      //   }),
      // );
    }

    setLoading(false);
  };

  const otherDoctorAppointment = async appointment => {
    //  setAppointmentType("Reschedule")
    // dispatch({
    //   type: 'SET_APPOINTMENT_TYPE',
    //   payload: appointmentType,
    // });

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [{name: 'CategoryDoctor',params: {

    //       appointmentDetails: appointment,
    //     },}],
    //   }),
    // );
    await navigation.navigate('CategoryDoctor', {
      appointmentDetails: appointment,
      reschedule: true,
      otherDoctorAppointment: true,
    });
  };

  const selectRescheduleType = item => {
    console.log('item=====', item);
    Alert.alert(
      'Reschedule Appointment',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Same Doctor',
          onPress: () => sameDoctorAppointment(item),
        },
        {
          text: 'Other Doctor',
          onPress: () => otherDoctorAppointment(item),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  React.useEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <SafeAreaView style={styles.main_container}>
      {/* <>
       <RescheduleModal
        visible={showModal}
      
        onRequestClose={() => setShowModal(false)}
        title={'Reschedule Appointment' }
        sameDoctorAppointment={(item) =>sameDoctorAppointment(item)}
        otherDoctorAppointment={otherDoctorAppointment()}
        // primaryBtnText={
        //  'Submit'
        // }
        // // onPrimaryPress={() => onPrimaryPress()}
        // onPrimaryPress={() => {
        //   setShowModal(false);
        
        // }}
         secondaryBtnText="Close"
        onSecondaryPress={() => {

          setShowModal(false);
       
        }}
      
     
      />
    </> */}
      <View style={{}}>
        {loading ? (
          <>
            <HistoryPlaceholder />
            <HistoryPlaceholder />
            <HistoryPlaceholder />
            <HistoryPlaceholder />
          </>
        ) : (
          <>
            {appointmentHistory && appointmentHistory.length > 0 ? (
              <>
                <FlatList
                  keyExtractor={(item, index) => `key-${index}`}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  data={appointmentHistory}
                  renderItem={({item, index}) => (
                    <>
                      <HistoryCard
                        item={item}
                        bgColor={
                          item.status == 0 && item.status !== 3
                            ? Color.graylight
                            : item.status == 2
                            ? '#006400'
                            : Color.red
                        }
                        onPress={() =>
                          navigation.navigate('AppointmentDetails', {
                            appointmentId: item.id,
                            createDate: item?.create_date,
                          })
                        }
                        showModal={() => selectRescheduleType(item)}
                        // showModal={() => setShowModal(true)}
                        // loading={loading}
                      />
                    </>
                  )}
                />
              </>
            ) : (
              <View
                style={{
                  //flex: 1,
                  alignItems: 'center',

                  marginTop: Dimensions.get('window').height / 2 - 100,
                }}>
                <Text
                  style={{
                    color: Color.grey,
                    fontSize: 16,
                    fontFamily: Fonts.primarySemiBold,
                  }}>
                  No History Found
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PatientHistory;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  resolved: {
    backgroundColor: '#006400',
  },
  absent: {
    backgroundColor: Color.red,
  },
  current: {
    backgroundColor: '#ff8c00',
  },
});
