import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  Dimensions,
  ImageBackground,
  Easing,
  Keyboard,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  I18nManager,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {useEffect,useFocusEffect} from 'react';
import {SafeAreaView} from 'react-navigation';
import {BLACK, PRIMARY_COLOR, WHITE} from '../constant/Colors';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import RegisterScreen from './RegisterScreen';
import { HOME_SCREEN, MOB_SCREEN, REGISTER_SCREEN } from '../constant/Screens';
import {showToast} from '../components/Toast';
import BannerSlider from '../components/BannerSlider';
import Fonts from '../theme/Fonts';
import { postData } from '../API/index';
import { CommonActions } from '@react-navigation/native';
import validator from '../components/validation';
import { showError } from '../components/helperFunction';
import { useTranslation } from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import { errorToast, successToast} from '../components/toasts';
import {RadioButton} from 'react-native-paper';
import Color from '../assets/utilis/Color';

const LangScreen = ({navigation}) => {

  const {t,i18n} = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKBOpen, setIsKBOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [contentPadding, setContentPadding] = useState(50);
  const _sheetRef = React.useRef(null);
  const animated = new Animated.Value(600);
  const duration = 400;
  const dispatch = useDispatch();
  const lang_ = useSelector(state => state.language) ;

  const [language,setLanguage] = React.useState(lang_ || 'en')
  

  


 

  const handleLangChange = lang => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        dispatch({
          type: 'SET_LANGUAGE',
          payload: lang,
        });
        successToast('Language changed successfully');
        setLanguage(lang)
      })
      .catch(err => console.log(err));
    
  };



  useEffect(() => {
    Animated.timing(animated, {
      toValue: 0,
      duration: duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

 

 
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       BackHandler.exitApp();
  //       return true;
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );

  const signIn = async () => {
    setLoading(true);
    let body = {
      email,
      password,
    };
    const response = await postData('agent/login', body);
    if (response.success) {

      successToast('Login Successfull');
      
      setLoading(false);
      dispatch({
        type: 'SET_USER',
        payload: response.data,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'HomeScreen'}],
        }),
      );
    } else {
      errorToast('Invalid Credentials', 'or User not found!');
      setLoading(false);
      
      errorToast('Invalid Credentials');
    }
  };


 

  const _renderItem = ({item}) => (
    <ImageBackground
      // imageStyle={{borderRadius: 13}}
      value={item}
      key={item}
      source={item.src}
      style={{
        height: 249,
        width: Dimensions.get('window').width - 18,
        borderRadius: 13,
      }}></ImageBackground>
  );

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // or some other action
        setIsKBOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKBOpen(false);
        // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

 
 


  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
    
      {/* <BannerSlider /> */}
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
          transform: [{translateY: animated}],
          opacity: animated.interpolate({
            inputRange: [0, 600],
            outputRange: [1, 0],
          }),
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
         {t('languagepage.Welcome!')}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
           fontFamily: Fonts.primaryBold,
           color: Color.black,
            marginBottom: 30,
          }}>
        {t('languagepage.Choose your Language')}
        </Text>
        <View
        style={{
         // paddingVertical: 20,
          paddingHorizontal: 20,
          width: '100%',
        }}>
       
        <RadioButton.Group onValueChange={lang => handleLangChange(lang)} value={language}>
          <TouchableOpacity
            onPress={() => handleLangChange('en')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 20,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 16,
                fontFamily: Fonts.primaryRegular,
                lineHeight: 16 * 1.4,
              }}>
              {t('settings.english')}
            </Text>
            <RadioButton.IOS value="en" color={Color.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLangChange('hi')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: Color.black,
                fontSize: 16,
                fontFamily: Fonts.primaryRegular,
                lineHeight: 16 * 1.4,
              }}>
              {t('settings.hindi')}
            </Text>
            <RadioButton.IOS value="hi" color={Color.black}/>
          </TouchableOpacity>
        </RadioButton.Group>
      </View>
        {/* <InputField
          label={'Email ID'}
          value={email}
          onChangeText={setEmail}
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

        {/* <InputField
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#fff"
              style={{marginRight: 5}}
            />
          }
          secure={!showPass}
          setSecure={setShowPass}
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          //fieldButtonFunction={() => _sheetRef.current.open()}
        /> */}
        <View style={{marginTop:30}}>
        <CustomButton
         // loading={loading}
          label={t('languagepage.NEXT')}
          onPress={() => navigation.navigate(MOB_SCREEN)}
        />
       </View>


   
      </Animated.View>
    </SafeAreaView>
  );
};

export default LangScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  slider_container: {
    height: 249,

    width: Dimensions.get('window').width - 18,
    alignSelf: 'center',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    elevation: 2,
  },
  buttonLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 16 * 1.4,
    textAlign: 'center',
    color: WHITE,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  buttonContent: {
    padding: 5,
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
});
