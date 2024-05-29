import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

import {errorToast, successToast} from '../components/toasts';

import React, {useState, useEffect} from 'react';
import {Avatar, TextInput, Button, HelperText} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {postData} from '../API';
import {
  BLACK,
  PRIMARY_COLOR,
  RED2,
  WHITE,
  TBLUE,
  ORANGE,
  GRAY,
  SUCCESS,
  LIGHT_GRAY,
  GRAY2,
  ERROR,
} from '../constant/Colors';
import OtpModal from '../Modals/OtpModal';
import Fonts from '../theme/Fonts';
import InputField from '../components/InputField';
import OTPTextView from 'react-native-otp-textinput';
import {MOB_SCREEN, REGISTER_SCREEN, HOME_SCREEN,UPDATE_PROFILE} from '../constant/Screens';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation, UseTranslationOptions} from 'react-i18next';
import CustomButton from '../components/CustomButton';
import BannerSlider from '../components/BannerSlider';
const {width, height} = Dimensions.get('window');
import Color from '../assets/utilis/Color';

const OtpScreen = ({navigation, route}) => {
  const [mobile, setMobile] = React.useState(route?.params?.item[1]);
  const [token, setToken] = React.useState(route?.params?.item[2]);
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}};
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = React.useState(route?.params?.item[0]);
  const [otpError, setOtpError] = React.useState(false);
  const [otpErrormsg, setOtpErrormsg] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const isFocused = useIsFocused();
  // const [modalVisible, setModalVisible] = useState(false);

  console.log('verification', otp, code);

  const dispatch = useDispatch();
  const userStatus = useSelector(state => state.user);

  const t = useSelector(state => state.lng);

  ///////////verifyotp/////////////////
  async function VerifyOtp() {
    let body = {otp: code};
    console.log('boda==>', body);
    setLoading(true);
    if (otp == code) {
      const result = await postData(`loginWithOtp/generate`, body);

      console.log('otpresult==', result);

      if (result.status) {
        successToast('OTP Verified Successfully');
        console.log('>>>>>responseotp', result);

        if(result?.message == 'alerady register profile')
       {
         dispatch({
          type: 'SET_USER',
          payload: result,
        });

        dispatch({
          type: 'USER_DETAIL',
          payload: result?.data,
        });
        successToast('USER already Registered!');

        navigation.navigate(HOME_SCREEN);
      }

         else if (result?.message == 'you can register profile')
         {
         navigation.navigate('UpdateProfileScreen', {
          item: mobile,
        });
            }
        else if (result.status == false) {
          navigation.navigate(REGISTER_SCREEN, {
            item: mobile,
          });
        } 
        else {
          successToast('USER already Registered!');
          navigation.navigate(HOME_SCREEN);
        }
      }

      console.log('>>>>>reduxdata', userStatus);
    } else {
      errorToast('OTP Wrong Entered!');
    }
  }
  ////////////////////////////////////////

  React.useEffect(() => {
    if (isFocused == true) {
      setCode('');

      setLoading(false);
      // setModalVisible(true)
    }
  }, [isFocused]);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          // backgroundColor: '#2f3542',
          height: height,
          alignItems: 'center',
        }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Color.primary}
          style="dark"
        />

        {/* <OtpModal
        // t={t}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        phone={mobile}
        otp={otp}
        t={t}
        // setPassword={setPassword}
        // handleRegister={pass => handleRegister(pass)}
      /> */}

        <View style={{alignItems: 'center', paddingBottom: 10, marginTop: 20}}>
          <Image
            source={require('../assets/images/doctor.jpg')}
            style={{
              height: Dimensions.get('window').height / 2 - 100,
              width: Dimensions.get('window').width - 40,
            }}
          />
        </View>

        <Animated.View
          style={{
            paddingHorizontal: 25,
            paddingTop: 50,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: Color.primary,
            flex: 1,
            // transform: [{translateY: animated}],
            // opacity: animated.interpolate({
            //   inputRange: [0, 600],
            //   outputRange: [1, 0],
            // }),
            // justifyContent: 'center',
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '900',
              fontFamily: Fonts.primaryBold,
              color: Color.black,
              marginBottom: 30,
            }}>
            Enter OTP !
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              fontFamily: Fonts.primaryBold,
              color: Color.black,
              marginBottom: 30,
            }}>
            +91{mobile}
          </Text>

          <OTPTextView
            autoFocus
            handleTextChange={text => {
              setCode(text), setOtpError(false);
            }}
            containerStyle={styles.textInputContainer}
            textInputStyle={{
              ...styles.roundedTextInput,
              borderColor: otpError ? RED2 : GRAY,
              color: BLACK,
            }}
            inputCount={4}
            offTintColor={otpError ? ERROR : LIGHT_GRAY}
            tintColor={otpError ? ERROR : PRIMARY_COLOR}
          />

          <View style={{marginTop: 15}}>
            <CustomButton
              loading={loading}
              label={'SUBMIT'}
              onPress={() => VerifyOtp()}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate(MOB_SCREEN)}>
            <Text
              style={{
                fontFamily: Fonts.primaryLight,
                color: WHITE,
                textAlign: 'right',
                fontSize: 15,
              }}>
              Resend OTP
            </Text>
          </TouchableOpacity>

          {/* <Otp/> */}
        </Animated.View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#000',
    width: width / 2 - 15,
    // height:35,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    left: 30,
    top: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 15,
    shadowColor: '#000',
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    color: '#000',
  },
  card: {
    backgroundColor: PRIMARY_COLOR,
    width: width,
    height: height / 2 + 100,
    alignItems: 'center',
    elevation: 45,
    shadowColor: '#000',
    position: 'absolute',
    top: 300,
    paddingTop: 35,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  imgstyle: {
    backgroundColor: '#000',
    width: '70%',
    height: '90%',
    // marginLeft:6
  },
  input: {
    color: '#fff',
    fontFamily: Fonts.primaryBold,
    fontWeight: '800',
    fontSize: 35,
    marginRight: 5,
    marginBottom: 15,
    height: 55,
  },
  Textitem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 140,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    marginTop: 10,
    // backgroundColor:'#fff',
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },
});
