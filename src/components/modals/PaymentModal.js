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

export default function PaymentModal(props) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input
  //   const {Color} = useTheme();
 

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
      <View style={styles.listItem}>
        <View style={styles.info_container}>
          <Pressable
            style={{
              alignSelf: 'flex-end',
              paddingHorizontal: 10,
              paddingTop: 5,
            }}
            onPress={props.onCancelPress}>
            <Image
              source={require('../../assets/images/close.png')}
              style={{height: 20, width: 20}}
            />
          </Pressable>
          <View style={styles.doctor_container}>
            <Text style={styles.paient_name_style}>{props.patient_name}</Text>
            <Text style={styles.doctor_specialization_style}>
              Patient Email : {props.patient_email}
            </Text>
            <Text style={styles.doctor_specialization_style}>
              Address : {props.patient_address}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Color.black,
            }}></View>
          <View style={styles.doctor_container}>
            <Text style={styles.doc_name_style}>{props.clinic_location}</Text>

            <Text style={styles.doctor_specialization_style}>
              Appointment Date : {props.create_date}
            </Text>
          
            <Text style={styles.doctor_specialization_style}>
              Appointment Type : {props.category}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Color.black,
            }}></View>
          <View style={styles.doctor_container}>
            <Text style={styles.doc_name_style}>Dr. {props.doctor_name}</Text>
            <Text style={styles.doctor_specialization_style}>{props.doctor_specialization}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Color.black,
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            paddingHorizontal: 20,
            paddingBottom: 10,
            borderBottomColor: Color.black,
            borderBottomWidth: 1,
          }}>
          <Text style={styles.doc_name_style}>DOLO_ID</Text>
          <Text style={styles.doctor_specialization_style}>{props.dolo_id}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            paddingHorizontal: 20,
          }}>
          <Text style={styles.doc_name_style}>Service Charge</Text>
          <Text
            style={[
              styles.doctor_specialization_style,
              {
                backgroundColor: Color.red,
                paddingHorizontal: 5,
                paddingVertical: 2,
                color: Color.white,
              },
            ]}>
            Rs. {props.fees}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            // paddingHorizontal:20,
            paddingBottom: 10,
            alignSelf: 'center',
          }}>
          <Pressable
            style={[styles.button, {backgroundColor: Color.red}]}
            onPress={props.onPrimaryPress}>
            <Text style={[styles.textStyle]}>{props.primaryBtnText}</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {backgroundColor: `#1e90ff`, marginLeft: 10},
            ]}
            onPress={props.onSecondaryPress}>
            <Text style={[styles.textStyle]}>{props.secondaryBtnText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: Dimensions.get('window').width - 60,
    alignSelf: 'center',
    // padding: 15,
    marginVertical: 10,
    elevation: 20,
    backgroundColor: Color.white,
    borderRadius: 12,
    // overflow: 'hidden',
    // shadowOffset: {width: 10, height: 10},
    // shadowColor: '#000',
    // shadowOpacity: 5,
    // shadowRadius: 5,
  },
  info_container: {
    //   flexDirection:'row',
    //   justifyContent:'space-between'
    // alignItems:'center'
  },
  status_txt_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 12,
    color: Color.white,
  },
  doctor_container: {
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  doc_name_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    color: Color.black,
  },
  paient_name_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    color: Color.red,
  },
  doctor_specialization_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 10,
    color: Color.black,
  },
  Buttons_container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 15,
    padding: 2,
    marginVertical: 5,
    elevation: 2,
    width: width * 0.3,
  },
  textStyle: {
    color: Color.white,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 12,
  },
});
