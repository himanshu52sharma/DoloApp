import React from 'react';
import Fonts from '../theme/Fonts';

import {TouchableOpacity, StyleSheet, Modal,Dimensions,View,Text} from 'react-native';
import { useTranslation } from 'react-i18next';
// import {Color, Dimension} from '../../theme';
// import SetPassword from '../bottomsheets/SetPassword';
const {width, height} = Dimensions.get('window');

export default function OtpModal({visible,otp,onRequestClose}) {
  // const {t} = props;
  console.log("?????otp",otp)
const {t}=useTranslation()
  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={onRequestClose}
      >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onRequestClose}
        style={styles.centeredView}
        >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.modalView}>

<View style={styles.content}>
<Text style={styles.heading}>Your OTP is:
</Text>
<Text style={{...styles.heading,fontSize:95,fontFamily:'Poppins-Bold',padding:15}}>{otp}</Text>
</View>

          {/* <SetPassword
            // t={t}
            // onRequestClose={props.onRequestClose}
            // phone={props.phone}
            // realOtp={props.otp}
            // handleRegister={props.handleRegister}
            // setPassword={props.setPassword}
          /> */}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent:'center',

    // backgroundColor: '#fff',
    // height: Dimension.window.height * 0.7,
  },
  modalView: {
    // margin: 20,
    borderRadius:25,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    width: width-95,
    height: height/3,
    padding: 25,
    backgroundColor:'#ced6e0',
    
    // alignItems: 'center',
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
  location: {
    color: 'white',
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
    // marginTop: 2,
    borderBottomColor: 'white',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color:"#000",
    // margin: 10,
  },
  content:{width:width,
    height:height/3,
    paddingLeft:22,
    paddingTop:12
    // backgroundColor:'#353b48'
  },
  heading:{
    fontFamily: 'Poppins-Regular',
    fontSize:24,
    color:"#fff",

    textShadowColor:'#000',
    textShadowOffset:{width:1,height:2},
    textShadowRadius:3.87
  }

});
