import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
//import {Button, TextInput} from 'react-native-paper';
// import {Color, Dimension} from '../../theme';
// import {useTheme} from 'react-native-paper';
import Color from '../../assets/utilis/Color';
import Dimension from '../../assets/utilis/Dimension';
import Fonts from '../../theme/Fonts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const {width, height} = Dimension.window;

export default function RescheduleModal(props) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input
  //   const {Color} = useTheme();
  const [shiftName, setShiftName] = React.useState('Morning');
  const [createDate, setCreateDate] = React.useState('');
  const [isCreateDatePickerVisible, setIsCreateDatePickerVisible] =
    React.useState(false);
    const [morningSchedule, setMorningSchedule] = React.useState([]);
    const [eveningSchedule, setEveningSchedule] = React.useState([]);
    const [doctorData,setDoctorData] = React.useState([]);
    const [doctorType,setDoctorType] = React.useState('Same');
  const FormatCreateDate = async data => {
    
    if (data.getDate() < 10 && data.getMonth() + 1 < 10) {
      var dateTimeString1 =
        '0' +
        data.getDate() +
        '/' +
        '0' +
        (data.getMonth() + 1) +
        '/' +
        data.getFullYear();
    } else if (data.getDate() < 10) {
      var dateTimeString1 =
        '0' +
        data.getDate() +
        '/' +
        (data.getMonth() + 1) +
        '/' +
        data.getFullYear();
    } else if (data.getMonth() + 1 < 10) {
      var dateTimeString1 =
        data.getDate() +
        '/' +
        '0' +
        (data.getMonth() + 1) +
        '/' +
        data.getFullYear();
    } else {
      var dateTimeString1 =
        data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    }
   
    hideCreateDatePicker();
    setCreateDate(dateTimeString1);

    return dateTimeString1; // It will look something like this 3-5-2021 16:23
  };
  const showCreateDatePicker = () => {
    setIsCreateDatePickerVisible(true);
  };
  const hideCreateDatePicker = () => {
    setIsCreateDatePickerVisible(false);
  };

  const getDoctorProfile = async (Id) => {
    setLoading(true);
    let result = await getData('doctorlist');
    if (result.success) {
      const filteredData = result.data.filter(item => item.doctor_id === Id);
   
      setDoctorData(filteredData);
      console.log('filteredData====',filteredData)
    
      setMorningSchedule(filteredData[0].schedule_morning);
      setEveningSchedule(filteredData[0].schedule_evening);
    
      setLoading(false);
    }
  };

  const sameDoctorAppointment = async() =>{
   await getDoctorProfile(Id)
    navigation.navigate('AppointmentBookingScreen', {
      doctor_details: doctorData,
      morningSchedule: morningSchedule,
      eveningSchedule: eveningSchedule,
    })
    

  }

  const otherDoctorAppointment = () =>{
  navigation.navigate('CategoryDoctor');
    
  }

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: Color.white}]}>
          <Text
            style={[
              styles.modalText,
              {
                color: Color.black,
              },
            ]}>
            {props.title}
          </Text>
          <Text
            style={{...styles.label, alignSelf: 'flex-start', marginTop: 10}}>
            Reschedule Appointment For
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Pressable
              onPress={() => setDoctorType('Same') && sameDoctorAppointment()}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  doctorType == 'Same' ? `${Color.primary2}50` : '#aaaaaa50',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Same Doctor
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setDoctorType('Other') && otherDoctorAppointment()}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  doctorType == 'Other' ? `${Color.primary2}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
               Other Doctor
              </Text>
            </Pressable>
          </View>
          {/* <Text style={{...styles.label,alignSelf:'flex-start',marginTop:15}}>Appointment Date</Text> */}
       
            

            {/* <View style={{flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'}}>
            
              <View>
              <Text style={{...styles.label,textDecorationLine:'underline',fontSize:15}}>{createDate}</Text>
              </View>
              <Pressable onPress={() => showCreateDatePicker()}>
                <Image
                  source={require('../../assets/images/calender.png')}
                  style={{height: 30, width: 30,marginLeft:50}}
                />
              </Pressable>
            </View>
          
            <DateTimePickerModal
              isVisible={isCreateDatePickerVisible}
              mode="date"
              onConfirm={e => FormatCreateDate(e)}
              onCancel={hideCreateDatePicker}
            /> */}
      
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Pressable
              style={[styles.button, {backgroundColor: Color.black}]}
              onPress={props.onSecondaryPress}>
              <Text style={[styles.textStyle]}>{props.secondaryBtnText}</Text>
            </Pressable>
           
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 2,
    width: width * 0.3,
  },
  textStyle: {
    color: Color.white,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // width: '49%',
    padding: 12,
    borderRadius: 5,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
});
