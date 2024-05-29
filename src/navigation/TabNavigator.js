import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import DoctorHistory from '../screens/DoctorHistory';

import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import {Color} from '../theme';
//import ClinicHistory from '../screens/ClinicHistory';
import {HomeStack} from './HomeStack';

import { PRIMARY_COLOR } from '../constant/Colors';
import { useTranslation } from 'react-i18next';
import I18n from '../assets/i18n/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { getLngType } from '../prefrences/Storage';
import { useEffect } from 'react';
const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  const dispatch=useDispatch()
   var {t}=useTranslation()
  // const {t}=useSelector(state=>state.lng)


// console.log(">>>>",t)
//   useEffect(()=>{
// if(t !==undefined){

// }else{
//   dispatch({
//     type: 'CHANGE_LANGUAGE',
//     payload:t,
//   });
// }



  // },[])




  return (
    <Tab.Navigator
      activeColor="#000"
      inactiveColor="#f0edf6"
      //   sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: PRIMARY_COLOR,
      }}
      shifting={true}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel:t("Tab.Home"),
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="DoctorHistory"
        component={HistoryStack}
        options={{
          tabBarLabel:t("Tab.Doctors"),
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="stethoscope"
              color={color}
              size={26}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel:t("Tab.Profile"),
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

export default TabNavigator;
