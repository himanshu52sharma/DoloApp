import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_SCREEN, ONBOARDING, REGISTER_SCREEN, SPLASH_SCREEN,OTP_SCREEN,MOB_SCREEN,LANG_SCREEN} from '../constant/Screens';
import SplashScreen from '../screens/SplashScreen';
import OtpScreen from '../screens/OtpScreen';
import MobileScreen from '../screens/MobileScreen';
import LangScreen from '../screens/LangScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = SPLASH_SCREEN;
  } else {
    // routeName = LOGIN_SCREEN;
    // routeName=MOB_SCREEN;
    routeName=LANG_SCREEN
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
         <Stack.Screen
        name={SPLASH_SCREEN}
        component={SplashScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={ONBOARDING}
        component={OnboardingScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={LOGIN_SCREEN}
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={REGISTER_SCREEN}
        component={RegisterScreen}
        options={{header: () => null}}
      />
         <Stack.Screen
        name={OTP_SCREEN}
        component={OtpScreen}
        options={{header: () => null}}
      />
          <Stack.Screen
        name={MOB_SCREEN}
        component={MobileScreen}
        options={{header: () => null}}
      />
           <Stack.Screen
        name={LANG_SCREEN}
        component={LangScreen}
        options={{header: () => null}}
      />
      <Stack.Screen
        name={'UpdateProfileScreen'}
        component={UpdateProfileScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
