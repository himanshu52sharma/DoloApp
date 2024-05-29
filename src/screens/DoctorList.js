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
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import {PRIMARY_COLOR, WHITE, BLACK, GRAY2, RED} from '../constant/Colors';

import Fonts from '../theme/Fonts';

import Color from '../assets/utilis/Color';
import DoctorCard from '../components/DoctorCard';
import {getData, postData} from '../API';
import DoctorPlaceholder from '../placeholders/DoctorPlaceholder';
import {useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import {useTranslation} from 'react-i18next';

const DoctorList = ({navigation, route}) => {
  const {t} = useTranslation();
  const {specialization} = route?.params;
  console.log('Category-->', specialization);
  const {reschedule} = route?.params;
  const {appointmentDetails} = route?.params;
  const {otherDoctorAppointment} = route?.params;
  const [region, setRegion] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [userLocation, setUserLocation] = React.useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [searchName, setSearchName] = React.useState('');
  // const [userLatitude,setUserLatitude] = useState(0);
  // const [userLongitude,setUserLongitude] = useState(0);
  const [loading, setLoading] = useState(true);

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
        //  setRegion(region);
        console.log('region12345=', region);
        searchNearestDoctor(
          position.coords.latitude,
          position.coords.longitude,
        );
        //  setUserLatitude(region.latitude);
        // setUserLongitude(region.longitude);
        //  setLoading(false);
      },
      error => {
        console.log(error);
        //  setLoading(false);
      },
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 5000},
    );
  };

  // const getDoctorList = async() => {
  //     setLoading(true)
  //   let result = await getData('doctorlist');
  // //console.log('docList--',result)
  //   if (result.success) {

  //     const filteredList = result.data.filter(
  //       item => item.specialization === specialization,
  //     )
  //   //  console.log('filteredList',filteredList.rating)
  //   setDoctorList(filteredList)

  //   setLoading(false)
  //   }

  // }

  const searchNearestDoctor = async (latitude, longitude) => {
    console.log('my loca--',latitude, longitude)
    setLoading(true);

    let body = {
      latitude: latitude,
      longitude: longitude,
      category_wise: specialization,
    };
    console.log('body-->', body);
    const result = await postData('latitude_longitude_nearest', body);
    console.log('body-->', body);
    if (result.status) {
      setDoctorList(result?.data);
      console.log('dList--->', result?.data);
      setLoading(false);
    }
  };
  const sortedData = doctorList.sort((a, b) => a.distance - b.distance);

  // console.log('sortedData',sortedData);
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
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />

      <View style={{marginTop: 10, paddingHorizontal: 12}}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <Searchbar
            placeholder={t('Doctor List.Search Doctor,Clinic')}
            editable={false}
            style={{
              fontFamily: 'Poppins-Bold',
              borderColor: '#557297',
              borderWidth: 2,
            }}
            placeholderTextColor={Color.black}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.middle_container}>
          {loading ? (
            <>
              <DoctorPlaceholder />
              <DoctorPlaceholder />
              <DoctorPlaceholder />
              <DoctorPlaceholder />
              <DoctorPlaceholder />
            </>
          ) : (
            <>
              {doctorList && doctorList.length > 0 ? (
                <FlatList
                  keyExtractor={(item, index) => `key-${index}`}
                  nestedScrollEnabled={true}
                  data={doctorList}
                  renderItem={({item, index}) => (
                    <>
                      <DoctorCard
                        item={item}
                        key={index}
                        // onPress={()=>navigation.navigate('DoctorList',{
                        //   doctor_id:item.id
                        // })}
                        onPress={() =>
                          reschedule === true
                            ? navigation.navigate('DoctorProfile', {
                                Id: item.doctor_id,
                                reschedule: true,
                                appointmentDetails: appointmentDetails,
                                otherDoctorAppointment: true,
                              })
                            : navigation.navigate('DoctorProfile', {
                                Id: item.doctor_id,
                              })
                        }
                      />
                    </>
                  )}
                />
              ) : (
                <View
                  style={{
                    //flex: 1,
                    alignItems: 'center',

                    marginTop: Dimensions.get('window').height / 2 - 100,
                  }}>
                  <Text
                    style={{
                      color: Color.grey,
                      fontSize: 16,
                      fontFamily: Fonts.primarySemiBold,
                    }}>
                    {t('Doctor List.No Doctor Found')}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorList;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: Color.black,
    paddingHorizontal: 20,
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
    paddingLeft: 5,
  },
  middle_container: {
    paddingHorizontal: 15,
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
    flex: 1,
    paddingHorizontal: 10,
  },
  clinic_name_style: {
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
    color: GRAY2,
    paddingTop: 5,
  },
  doctor_experience_style: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Fonts.primaryRegular,
    color: PRIMARY_COLOR,
    paddingTop: 5,
  },
  callnow_btn_style: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 7,
    paddingVertical: 9,
    width: '70%',

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
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: WHITE,
    borderColor: PRIMARY_COLOR,
  },
});
