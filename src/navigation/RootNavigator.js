import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { DRAWER_NAVIGATOR, SPLASH_SCREEN } from '../constant/Screens';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthStack from './AuthStack';
import SideContent from './SideContent';

import { HomeStack } from './HomeStack';
import TabNavigator from './TabNavigator';
import AppHeader from './AppHeader';
import { ProfileStack } from './ProfileStack';


import {NavigationContainer ,DarkTheme as NavigationDarkTheme,DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';

import {Provider as PaperProvider,DarkTheme as PaperDarkTheme,DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export const RootNavigator = () => {
 const isLoggedIn = useSelector(state => state.isLoggedIn);
const userStatus = useSelector(state=>state.user)
const isDarkTheme =useSelector(state=>state.isDarkTheme)
const [loading, setLoading] = useState(true);

console.log(">>?>>?>",userStatus.status)


useEffect(() => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      setLoading(false);
    });
}, []);

if (loading) {
  return null;
}


const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors:{ ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background:'#fff',
    text:'#333',
    category: '#f1f2f6',
top:"#fff"
  }
}


const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors:{ ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background:'#333',
    text:'#fff',
    category:'#57606f',
    top:'#2C3A47'


  }
}
const theme=isDarkTheme?CustomDarkTheme:CustomDefaultTheme;


  function DrawerNavigator() {
    return (
      <Drawer.Navigator drawerContent={props => <SideContent {...props} />}>
        <Drawer.Screen
          name="DrawerNavigator"
          component={HomeStack}
          options={{
          header: props => <AppHeader {...props} />,
         //  headerShown:false
          }}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
           initialRouteName={isLoggedIn ? 'HomeScreen' : 'Auth'}
          // initialRouteName={SPLASH_SCREEN}
         // intitialRouteName={'Auth'}
          >
          <Stack.Screen name="Auth" component={AuthStack}  options={{headerShown: false,}}/>
         
          <Stack.Screen name={'HomeScreen'} component={DrawerNavigator} options={{headerShown: false,}}/>

         </Stack.Navigator>



      </NavigationContainer>
    </PaperProvider>
  );
};
