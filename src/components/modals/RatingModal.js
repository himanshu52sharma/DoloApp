import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {Color, Dimension, Fonts} from '../../theme';
// import {useTheme} from 'react-native-paper';

const {width, height} = Dimension.window;

export default function AddpatientSuccessModal(props) {
  //   const {Color} = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
     <View >

     </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

});
