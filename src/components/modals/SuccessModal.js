import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {Color, Dimension} from '../../theme';
// import {useTheme} from 'react-native-paper';

const {width, height} = Dimension.window;

export default function SuccessModal(props) {
  //   const {Color} = useTheme();

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
          <AnimatedLottieView
            source={require('../../assets/animations/success.json')}
            style={{width: 130, height: 130}}
            autoPlay
            loop={false}
          />
          <Pressable
            style={[styles.button, {backgroundColor: Color.primary}]}
            onPress={props.onPrimaryPress}>
            <Text style={[styles.textStyle]}>{props.primaryBtnText}</Text>
          </Pressable>
          <Pressable
            style={[styles.button, {backgroundColor: Color.gray}]}
            onPress={props.onSecondaryPress}>
            <Text style={[styles.textStyle]}>{props.secondaryBtnText}</Text>
          </Pressable>
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
    borderRadius: 25,
    padding: 10,
    marginVertical:5,
    elevation: 2,
    width: width * 0.7,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
});
