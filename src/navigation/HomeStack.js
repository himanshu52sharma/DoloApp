import {createNativeStackNavigator} from '@react-navigation/native-stack';


import DoctorScreen from '../screens/DoctorScreen';
import DoctorProfile from '../screens/DoctorProfile';
import DoctorList from '../screens/DoctorList';
import AppointmentScreen from '../screens/AppointmentScreen';
import MobileScreen from '../screens/MobileScreen';
import CatagoryDoctor from '../screens/CatagoryDoctor';
import SearchDoctor from '../screens/SearchDoctor';
import ProfileScreen from '../screens/ProfileScreen';
import MyAppointments from '../screens/MyAppointments';
import PaymentScreen from '../screens/PaymentScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import AppointmentBookingScreen from '../screens/AppointmentBookingScreen';
import RatingScreen from '../screens/RatingScreen';
import AppHeader from './AppHeader';
import MapScreen from '../screens/MapScreen';
import PatientHistory from '../screens/PatientHistory';
import AppointmentDetails from '../screens/AppointmentDetails';
import SearchScreen from '../screens/SearchScreen';
import MyFavouriteDoctors from '../screens/MyFavouriteDoctors';
import NotificationScreen from '../screens/NotificationScreen';
import AboutUs from '../screens/AboutUs';
import FAQ from '../screens/FAQ';
import TermsandConditions from '../screens/TermsandConditions';
import ReadMoreScreen from '../screens/ReadMoreScreen';


const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home1'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationTypeForReplace: 'pop',
      }}>
     
      <Stack.Screen name={'Home1'} component={MyAppointments} />
      <Stack.Screen name={'CategoryDoctor'} component={CatagoryDoctor} options={{headerShown: false}}/>
      <Stack.Screen name={'DoctorList'} component={DoctorList} />
      <Stack.Screen name={'AppointmentScreen'} component={AppointmentScreen} />
      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
      <Stack.Screen name={'PaymentScreen'} component={PaymentScreen} />
      <Stack.Screen name={'DoctorProfile'} component={DoctorProfile} />
      <Stack.Screen name={'UpdateProfileScreen'} component={UpdateProfileScreen}/>
      <Stack.Screen name={'AppointmentBookingScreen'} component={AppointmentBookingScreen}/>
      <Stack.Screen name={'RatingScreen'} component={RatingScreen} />
      <Stack.Screen name={'SearchDoctor'} component={SearchDoctor} />
      <Stack.Screen name={'MapScreen'} component={MapScreen} />
      <Stack.Screen name={'PatientHistory'} component={PatientHistory} />
      <Stack.Screen name={'AppointmentDetails'} component={AppointmentDetails} />
      <Stack.Screen name={'DoctorScreen'} component={DoctorScreen} />
      <Stack.Screen name={'SearchScreen'} component={SearchScreen} />
      <Stack.Screen name={'MyFavouriteDoctors'} component={MyFavouriteDoctors} />
      <Stack.Screen name={'NotificationScreen'} component={NotificationScreen} />
      <Stack.Screen name={'AboutUs'} component={AboutUs} />
      <Stack.Screen name={'FAQ'} component={FAQ} />
      <Stack.Screen name={'TermsandConditions'} component={TermsandConditions} />
      <Stack.Screen name={'ReadMore'} component={ReadMoreScreen} />
    </Stack.Navigator>
  );
};
