import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  BackHandler
} from 'react-native';
import {Avatar, TextInput, Button, } from 'react-native-paper';
import {DOCTOR_PROFILE} from '../constant/Screens';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import React, {useEffect, useState} from 'react';
import {PRIMARY_COLOR, WHITE, BLACK, GRAY2} from '../constant/Colors';
import SearchBox from '../components/SearchBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Fonts from '../theme/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../assets/utilis/Color';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import GetLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';

const {width, height} = Dimensions.get('window');

const SearchDoctor =({navigation, route}) => {

  const [doctorList,setDoctorList] = useState([]);
  const [loading,setLoading] = useState(false);
  const [latitude, setLatitude] = React.useState('');
  const [longitude, setLongitude] = React.useState('');
  const [region, setRegion] = React.useState({
    latitude: 26.2411132,
    longitude: 78.2442326,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  
  
  const getDoctorList = async() => {
      setLoading(true)
    let result = await getData('doctorlist');
    if (result.success) {
     
      const filteredList = result.data.filter(
        item => item.latitude === latitude && item.longitude === longitude ,
      )
      console.log('filteredList',filteredList)
    setDoctorList(filteredList)
  
    setLoading(false)
    }

}

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Location permission denied by user.',
      ToastAndroid.LONG,
    );
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

const getLocation = async () => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      };
      console.log('region==',region)
      //setRegion(region);
     
      setLoading(false);
     // mapRef.current.animateToRegion(region, 2 * 1000);
    },
    error => {
      console.log(error);
      setLoading(false);
    },
    {enableHighAccuracy: true, timeout: 200000, maximumAge: 5000},
  );
};







        useEffect(() => {
         
          getLocation();
      
      }, []);

      React.useEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            navigation.goBack();
            return true;
          };
      
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
      );
      

  return (

<SafeAreaView style={styles.main_container}>
<Text style={styles.heading_top_style}>Search Near by Doctors</Text>
<ScrollView contentContainerStyle={{paddingBottom: 30}} showsVerticalScrollIndicator={false}>
      <View style={styles.middle_container}>
       {/* {loading ? 
                <View style={{marginTop:20}}>
                  <DoctorPlaceholder/>
                  <DoctorPlaceholder/>
                  <DoctorPlaceholder/>
                  <DoctorPlaceholder/>
                  <DoctorPlaceholder/>
                  <DoctorPlaceholder/>
                  <DoctorPlaceholder/>
                  </View>
        :
        
       <View style={{marginTop: 20}}>
          <FlatList
              keyExtractor={(item, index) => `key-${index}`}
           nestedScrollEnabled={true}
           // data={doctorList}
            renderItem={({item,index}) => (
             <>
              <DoctorCard 
              item={item}
              //key={index}
              // onPress={()=>navigation.navigate('DoctorList',{
              //   doctor_id:item.id
              // })}
              onPress={()=>navigation.navigate('DoctorProfile',{
                Id : item.id
              })}
              />
              </>
            )}
          />
        </View>
        } */}
        </View>
     
  </ScrollView>   
</SafeAreaView>


   
  )
}

export default SearchDoctor

const styles = StyleSheet.create({
 main_container:{
  flex:1,
  backgroundColor:Color.primary
 },
  
 heading_top_style: {
  fontFamily: Fonts.primaryBold,
  color: Color.black,

  fontSize: 20,
  paddingTop:20,
  paddingHorizontal:20
},
 top_container: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  //justifyContent: 'space-around',
},
address_container: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
address_style: {
  color: Color.black,
  fontFamily: Fonts.primarySemiBold,
  fontSize: 15,
  paddingLeft:5
},
middle_container:{
paddingHorizontal:15,
},
clinic_card_style: {
  width: Dimensions.get('window').width - 20,
  borderRadius: 10,
  backgroundColor: WHITE,
  // alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
 // paddingHorizontal: 25,

  margin: 10,

  //paddingVertical:15,
  flexDirection: 'row',
  alignItems: 'center',
},
clinic_heading_container: {
  paddingVertical: 20,
  flex:1,
  paddingHorizontal:10
},
clinic_name_style:{
  color: BLACK,
  fontSize: 14,
  
  fontFamily: Fonts.primaryBold,
  //textAlign: 'center',
//  paddingHorizontal:5
},
clinic_address_style: {
  //flex: 1,
 // textAlign: 'center',
  fontSize: 14,
  fontWeight: '500',
  fontFamily: Fonts.primaryRegular,
  color:GRAY2,
  paddingTop:5
},
doctor_experience_style:{
  fontSize: 14,
  fontWeight: '500',
  fontFamily: Fonts.primaryRegular,
  color:PRIMARY_COLOR,
  paddingTop:5
},
callnow_btn_style: {
  borderColor: PRIMARY_COLOR,
  borderWidth: 2,
  alignItems: 'center',
  borderRadius: 7,
  paddingVertical: 9,
  width:'70%',

  //alignSelf: 'center',
  marginTop: 20,
  paddingHorizontal: 5,
},
callnow_txt_style: {
  color: PRIMARY_COLOR,
  fontSize: 14,

  fontFamily: Fonts.primaryBold,
},
clinic_img_style: {
  height: 100,
  width: 100,
  borderRadius:50,
  borderWidth:1,
  backgroundColor:WHITE,
  borderColor:PRIMARY_COLOR,
 

},
})