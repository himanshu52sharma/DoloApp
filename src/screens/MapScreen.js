import React, {Component, useEffect,} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Button,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
 
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  TouchableOpacity,
  Image,
  BackHandler
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';
import Color from '../assets/utilis/Color';
import {FAB} from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';
import {useTheme} from '@react-navigation/native';
import Fonts from '../theme/Fonts';
import { postData } from '../API';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default MapScreen = ({navigation,props, route}) => {
  const theme = useTheme();
  console.log(
    'positionnn==',
    route?.params?.position.latitude,
    route?.params?.position.longitude,
  );
  const [doctorLocation, setDoctorLocation] = React.useState(
    route?.params?.position,
  );
  const [address, setAddress] = React.useState(
    route?.params?.location,
  );
  const [doctorLatitude, setDoctorLatitude] = React.useState(
    route?.params?.position.latitude,
  );
  const [doctorLongitude, setDoctorLongitude] = React.useState(
    route?.params?.position.longitude,
  );
  const [loading, setLoading] = React.useState(true);
  const [region, setRegion] = React.useState({
    latitude: 26.2417259,
    longitude: 78.1923,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [isMapReady, setIsMapReady] = React.useState(false);
  const [distance, setDistance] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [marginTop, setMarginTop] = React.useState(1);
  const [userLocation, setUserLocation] = React.useState('');
  const [regionChangeProgress, setRegionChangeProgress] = React.useState(false);
  const mapRef = React.useRef(null);

  console.log('doctorLocation',doctorLocation.latitude);
  console.log('doctorLocation',doctorLocation.longitude);

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
        setRegion(region);
        console.log('region=', region);
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
    fetchTime();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation();
      fetchTime();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const onMapReady = () => {
    setIsMapReady(true);
    setMarginTop(0);
  };

  // Fetch location details as a JOSN from google map API
  const fetchAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        region.latitude +
        ',' +
        region.longitude +
        '&key=' +
        // 'AIzaSyAlmvmgr042tQBiCVXD43bQfDWkZduGBGw',
        'AIzaSyCD6KcxnD-n0CfQniS1TD_MJIE0w_kmeUc',

    )
      .then(response => response.json())
      .then(responseJson => {
        const userLocation = responseJson.results[0].formatted_address;
        setUserLocation(userLocation);
        setRegionChangeProgress(false);
         // 'AIzaSyCF8BRYo9pIN3E-kPPG7mq-0oFhjnG59a0'
      })
      .catch(error => {
        console.error(error);
        setRegionChangeProgress(false);
      });
  };

  // Update state on region change
  const onRegionChange = region => {
    setRegion(region);
    setRegionChangeProgress(true);
    fetchAddress();
  };

  // Action to be taken after select location button click
  const onLocationSelect = () => {
    // alert(userLocation);
    props.setLocation(userLocation);
    props.setLatitude(region.latitude);
    props.setLongitude(region.longitude);
    props.onPress();
    // props.onPress ?  : null;
    // props.navigation.goBack();
  };

  //   if (loading) {
  //     return (
  //       <View style={styles.spinnerView}>
  //         <ActivityIndicator size="large" color="#0000ff" />
  //       </View>
  //     );
  //   } else {

  const fetchTime = (d, t) => {
    setTime(t);
    setDistance(d);
  };



const openMap= () => {
    console.log('open directions')
   let f = Platform.select({
        ios: () => {
            Linking.openURL(`http://maps.google.com/maps?daddr=${address}`);
        },
        android: () => {
            console.log('ANDROID')
            Linking.openURL(`http://maps.google.com/maps?daddr=${address}`).catch(err => console.error('An error occurred', err));;
        }
    });
  
    f();
  }


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
    // <View style={styles.container}>
    //   <ActivityIndicator
    //     animating={loading}
    //     size={'large'}
    //     color={Color.primary}
    //     style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
    //   />
    //   <View style={{flex: 1}}>
    //     {!!region.latitude && !!region.longitude && (
    //       <MapView
    //         ref={mapRef}
    //         showsBuildings
    //         // showsCompass={true}
    //         // showsMyLocationButton

    //         // loadingEnabled
    //         // style={{...styles.map, marginTop: marginTop}}
    //         style={StyleSheet.absoluteFill}
    //         initialRegion={region}
    //         // showsUserLocation={true}
    //         // onMapReady={onMapReady}
    //         // onRegionChangeComplete={onRegionChange}
    //       >
    //         {/* <Marker
    //           coordinate={{
    //             latitude: region.latitude,
    //             longitude: region.longitude,
    //           }}
    //           title={'Doctor Location'}
    //           draggable>
    //           <Image
    //             source={require('../assets/images/car.png')}
    //             style={{height: 30, width: 30}}
    //           />
    //         </Marker> */}

    //         <Marker
    //           coordinate={{
    //             latitude:
    //               route &&
    //               route.params &&
    //               route.params.position &&
    //               Number(route.params.position.latitude)
    //                 ? Number(route.params.position.latitude)
    //                 : 0,
    //             longitude:
    //               route &&
    //               route.params &&
    //               route.params.position &&
    //               Number(route.params.position.longitude)
    //                 ? Number(route.params.position.longitude)
    //                 : 0,
    //           }}
    //           title={'Doctor Location'}
    //           draggable>
    //           <Image
    //             source={require('../assets/images/map_marker.png')}
    //             style={{height: 30, width: 30}}
    //           />
    //         </Marker>

    //         <MapViewDirections
    //           origin={{latitude: region.latitude, longitude: region.longitude}}
    //           destination={{
    //             latitude: doctorLocation.latitude,
    //             longitude: doctorLocation.longitude,
    //           }}
    //           // apikey={'AIzaSyCF8BRYo9pIN3E-kPPG7mq-0oFhjnG59a0'}
    //           apikey={'AIzaSyCD6KcxnD-n0CfQniS1TD_MJIE0w_kmeUc'}
    //           strokeWidth={3}
    //           strokeColor={'hotpink'}
    //           // onStart={result => {
    //           //   console.log(
    //           //     `Started routing between "${result.origin}" and "${result.destination}"`,
    //           //   );
    //           // }}
    //           onReady={result => {
    //             // console.log(`Distance: ${result.distance} km`);
    //             // console.log(`Duration: ${result.duration} min.`);
    //             // fetchTime(result.distance, result.duration),
    //               mapRef.current.fitToCoordinates(result.coordinates, {
    //                 edgePadding: {
    //                   right: 30,
    //                   bottom: 300,
    //                   left: 30,
    //                   top: 100,
    //                 },
    //               });
    //           }}
    //         />
    //       </MapView>
    //       )} 
    //   </View>

    //   {/* <View style={styles.bottomCard}>
    //     <Text style={styles.bottom_txt_style}>
    //       Distance : {distance ? distance : '0'} km
    //     </Text>
    //     <Text style={styles.bottom_txt_style}>
    //       Time : {time ? time : '0'} minutes
    //     </Text>
    //   </View> */}

    //      <FAB
    //       icon="check"
    //       label='Show on Map'
    //       loading={loading}
    //       style={styles.btnContainer}
    //       disabled={regionChangeProgress}
    //       onPress={openMap}
    //     />

    // </View>
    <View style={styles.container1}>
      <MapView
        style={styles.map1}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={"Marker Title"}
          description={"Marker Description"}
        />
      </MapView>
    </View>
  );
  //   }
};

const styles = StyleSheet.create({
  container1: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map1: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    display: 'flex',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  map: {
    flex: 1,
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%',
  },
  mapMarker: {
    fontSize: 40,
    color: 'red',
  },
  deatilSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: Color.primary,
    position: 'absolute',
    bottom: 100,
    right: 30,
  },
 
  bottomCard: {
    backgroundColor: Color.black,
    width: Dimensions.get('window').width - 20,
    alignSelf: 'center',
    padding: 8,

    position: 'absolute',
    bottom: 50,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottom_txt_style: {
    color: Color.white,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    textAlign: 'center',
  },
});
