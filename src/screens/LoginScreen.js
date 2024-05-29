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
  ToastAndroid
} from 'react-native';
import React, {useState} from 'react';
import {useEffect,useFocusEffect} from 'react';
import {SafeAreaView} from 'react-navigation';
import {BLACK, PRIMARY_COLOR, WHITE} from '../constant/Colors';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import RegisterScreen from './RegisterScreen';
import { HOME_SCREEN, REGISTER_SCREEN } from '../constant/Screens';
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

const LoginScreen = ({navigation}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isKBOpen, setIsKBOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [contentPadding, setContentPadding] = useState(50);
  const _sheetRef = React.useRef(null);




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

  const dispatch = useDispatch();

 
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

      console.log('Login Response--->',response.data)
      
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
        barStyle="light-content"
        hidden={false}
        backgroundColor={BLACK}
        style="light"
      />
    
      <BannerSlider />
      <Animated.View
        style={{
          paddingHorizontal: 25,
          paddingTop: 50,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: PRIMARY_COLOR,
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
            color: WHITE,
            marginBottom: 30,
          }}>
          {t('login.screenTitle')} !
        </Text>

        <InputField
          label={t('login.email')}
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
        />

        <InputField
          label={t('login.password')}
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
          fieldButtonLabel={t('login.forgot')}
          //fieldButtonFunction={() => _sheetRef.current.open()}
        />

        <CustomButton
          loading={loading}
          label={t('login.login')}
          onPress={signIn}
        />



    <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
              borderWidth: 1,
              padding: 15,
              borderRadius: 10,
              borderColor: WHITE,
            }}>
            <Text style={{color: '#fff'}}>{t('login.New to the app')}</Text>
            <Text
              style={{
                color: WHITE,
               fontFamily: Fonts.primaryBold
              }}>
              {' '}
              {t('login.Register')}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
});
