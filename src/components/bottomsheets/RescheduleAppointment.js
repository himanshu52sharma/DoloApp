import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Avatar, Button, TextInput} from 'react-native-paper';

import Dimension from '../../theme/Dimension';
import Color from '../../assets/utilis/Color';
import Fonts from '../../theme/Fonts';
import {useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

export default EditAssistant = React.forwardRef((props, ref) => {
  const {item, sameDoctorAppointment, otherDoctorAppointment,loading} = props;

  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input

  const _sheetRef = React.useRef(null);
  const [doctorType,setDoctorType] = React.useState('Same');
 




 

  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          // backgroundColor: textColor,
        },
        container: {
          backgroundColor: Color.white,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
      }}
      height={Dimension.window.height * 0.8}>
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
            <TouchableOpacity
              onPress={() => setDoctorType('Same') && sameDoctorAppointment(item.doctor_id)}
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
            </TouchableOpacity>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
         
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: Color.black}]}
              onPress={() => _sheetRef.current.close}>
              <Text style={[styles.textStyle]}>Close</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
    </RBSheet>
  );
});

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
