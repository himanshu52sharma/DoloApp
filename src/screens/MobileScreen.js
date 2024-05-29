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
import {useIsFocused} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

import {errorToast, successToast} from '../components/toasts';
import Validator from '../components/Validator';
import React, {useState, useEffect} from 'react';
import {Avatar, TextInput, Button, HelperText} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {postData} from '../API';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BannerSlider from '../components/BannerSlider';
import {getSyncData,storeDatasync} from '../storage/AsyncStorage';
import messaging from '@react-native-firebase/messaging';


import {
  BLACK,
  PRIMARY_COLOR,
  RED,
  WHITE,
  TBLUE,
  ORANGE,
  GRAY,
  SUCCESS,
  LIGHT_GRAY,
  GRAY2,
} from '../constant/Colors';
import Fonts from '../theme/Fonts';
import InputField from '../components/InputField';
import OTPTextView from 'react-native-otp-textinput';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {getLngType} from '../prefrences/Storage';
// import { HOME_SCREEN, REGISTER_SCREEN,OTP_SCREEN } from '../constant/Screens';
import {OTP_SCREEN, HOME_SCREEN} from '../constant/Screens';
import Color from '../assets/utilis/Color';
const {width, height} = Dimensions.get('window');
const MobileScreen = ({navigation, route}) => {
 
  const [mobile, setMobile] = React.useState(null);
  const [mobileError, setMobileError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const theme = {colors: {text: Color.black, background: '#fff'}};

  const [hasFocus, sethasFocus] = useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const animated = new Animated.Value(600);
  const duration = 400;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const onFocus = () => {
    sethasFocus(true);
  };

  const onBlur = () => {
    sethasFocus(false);
  };
  ////////////////////////////
  function onChangeMobile(text) {
    resetState();
    setLoading(false);
    setMobile(text.replace(/[^0-9]/g, ''));
  }

  ///////////////////
  const resetState = () => {
    setMobileError(false);
    setMobileErrorMessage('');
  };

  const showToast = message => {
    Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
  };

  const PHONE_RULE = {
    isRequired: true,
    maxLength: 10,
    minLength: 10,
    isPhone: true,
  };

  const DEFAULT_RULE = {
    isRequired: true,
  };
  ///////////////function//////////////
  function Submit() {
    if (!Validator(mobile, DEFAULT_RULE)) {
      setMobileError(true);
      setMobileErrorMessage('Please Enter correct mobile number');
      return;
    }
    if (!Validator(mobile, PHONE_RULE)) {
      setMobileError(true);
      setMobileErrorMessage('Please Enter correct mobile number');
      return;
    }

    setLoading(true);

    sendMobile();
  }
  /////////////////////////////////////////////////////
  React.useEffect(() => {
    setRefresh(true);
    setMobileErrorMessage('');
    setLoading(false);
  }, []);
 
  const getFcmToken = async () => {
    let fcmToken = await getSyncData('fcmToken');
    // console.log('the old token', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token
          console.log('the new token', fcmToken);
          await storeDatasync('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log('error getting token', error);
      }
    }
  };

  useEffect(() => {
    
    getFcmToken();
   
  }, [])
  


  const  sendMobile = async() =>{
    var fcmToken = await getSyncData('fcmToken');
    console.log('fcmToken==',fcmToken);
    let body = {
      mobile:mobile,
      device_token:fcmToken,
    };
    console.log('body==',body)
    const result = await postData(`otp/generate`, body);

    if (result !== undefined) {
      setRefresh(true);
      console.log('result',result);
      successToast(`Otp Send Succesfully ${result.message}`);
      navigation.navigate(OTP_SCREEN, {
        item: [result.message, mobile,fcmToken],
      });
      setLoading(false);
      // setMobile('');
    } 
    // else {
    //   console.log('error in scree go back');
    //   errorToast('Something went Wrong');
    // }
  }

  //   useEffect(() => {

  //     if(isFocused==true)
  // {    setRefresh(true)

  //     Animated.timing(animated, {
  //       toValue: 0,
  //       duration: duration,
  //       easing: Easing.inOut(Easing.ease),
  //       useNativeDriver: true,
  //     }).start();}

  //   }, [isFocused]);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          // backgroundColor: '#2f3542',
          height: height,
          alignItems: 'center',
        }}>
        <View style={{alignItems:'center',paddingBottom:10,marginTop:20}}>
      <Image source={require('../assets/images/doctor.jpg')} style={{height:Dimensions.get('window').height/2-100,width:Dimensions.get('window').width-40}} />
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
              fontSize: 28,
              fontWeight: '900',
              fontFamily: Fonts.primaryBold,
              color: Color.black,
              marginBottom: 30,
            }}>
           {t('mobile.Login')}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '900',
              fontFamily: Fonts.primaryBold,
              color: Color.black,
              marginBottom: 30,
            }}>
            {t('mobile.Enter Your Mobile Number')}
          </Text>

          {mobileErrorMessage ? (
            <Text style={styles.error}>{mobileErrorMessage}</Text>
          ) : null}

          {/* <InputField
          label={'Mobile Number'}
          value={mobile}
          onChangeText={text => onChangeMobile(text)}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
         
          keyboardType="email-address"
        /> */}

          <TextInput
            theme={theme}
            dense
            value={mobile}
            onChangeText={text => onChangeMobile(text)}
            mode="flat"
            underlineColor={Color.black}
            activeUnderlineColor={Color.black}
            style={{paddingVertical: 5, marginTop: 10,color:Color.white}}
            keyboardType="number-pad"
          />

          <View style={{marginTop: 30}}>
            <CustomButton loading={loading} label={t('mobile.Continue')} onPress={Submit} />
          </View>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default MobileScreen;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#000',
    width: width / 2 - 15,
    // height:35,
    paddingVertical: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    left: 40,
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
    position: 'absolute',
    top: height / 3 + 25,
  },
  label: {
    color: '#000',
  },
  card: {
    backgroundColor: PRIMARY_COLOR,
    width: '100%',
    height: '100%',
    // height: height / 2 + 100,
    alignItems: 'center',
    elevation: 45,
    shadowColor: '#000',
    // position: 'absolute',
    // top: 300,
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
    marginTop: 175,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textInputContainer: {
    marginTop: 35,
    // backgroundColor:'#fff',
  },
  roundedTextInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },
  borderText: {
    borderBottomColor: '#B1B1B1',
    borderBottomWidth: 1,
  },
  error: {
    fontSize: 17,
    color: Color.black,
    // borderBottomColor: '#ff0000',
    // borderBottomWidth: 1,
  },
});
