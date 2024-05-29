import React from 'react';
import {TouchableOpacity, StyleSheet, Modal,Dimensions,} from 'react-native';
import { GRAY, WHITE } from '../../constant/Colors';
//import {Color, Dimension} from '../../theme';
import Dimension from '../../theme/Dimension';

import SetPassword from '../bottomsheets/SetPassword';
import Fonts from '../../theme/Fonts';

export default function OtpModal(props) {
  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.onRequestClose}
        style={styles.centeredView}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.modalView}>
          <SetPassword
            onRequestClose={props.onRequestClose}
            phone={props.phone}
            realOtp={props.otp}
            handleRegister={props.handleRegister}
            setPassword={props.setPassword}
          />
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
    // backgroundColor: '#fff',
    // height: Dimension.window.height * 0.7,
  },
  modalView: {
    // margin: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: Dimension.window.width,
    height: Dimension.window.height * 0.55,
    padding: 25,
    backgroundColor: WHITE,
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
    color: GRAY,
    // margin: 10,
  },
});
