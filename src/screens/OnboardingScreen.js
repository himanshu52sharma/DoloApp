import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
//import {Color} from '../theme';

import Onboarding from 'react-native-onboarding-swiper';
import { BLACK } from '../constant/Colors';
import { LOGIN_SCREEN,MOB_SCREEN,LANG_SCREEN } from '../constant/Screens';

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 20}} {...props}>
    <Text style={{fontSize: 16, color: BLACK}}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 20}} {...props}>
    <Text style={{fontSize: 16, color: BLACK}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 20}} {...props}>
    <Text style={{fontSize: 16, color: BLACK}}>Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace(LANG_SCREEN)}
      onDone={() => navigation.navigate(LANG_SCREEN)}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image source={require('../assets/images/onboard1.png')} style={{height:200,width:200}} />
          ),
          title: 'Connect to the World',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image source={require('../assets/images/onboard2.jpg')} style={{height:200,width:200}} />
          ),
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind of People',
        },
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image source={require('../assets/images/onboard3.jpg')}  style={{height:200,width:200}} />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
