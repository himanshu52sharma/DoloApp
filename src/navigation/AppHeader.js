import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Color from '../assets/utilis/Color';
import {useDispatch, useSelector} from 'react-redux';
import {IconButton} from 'react-native-paper';
import Fonts from '../theme/Fonts';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../API';

const AppHeader = ({navigation}) => {info
  const [notificationCount, setNotificationCount] = React.useState(0);
  const user = useSelector(state => state.user);
  console.log('USER=',user)
  const info = useSelector(state => state.info);

  useEffect(() => {
    setInterval(() => {
    getNotificationCount();
   }, 10000);
}, []);



  const getNotificationCount = async() =>{
    const res = await getData(`notificationpatientcount/${user?.data?.id}`);
    console.log('Count--->',res)
    if(res?.success){
      setNotificationCount(res?.Patient);
    }
  }


  return (
    <View style={styles.top_container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
      <View>
        <IconButton
          icon="menu"
          onPress={() => navigation.openDrawer()}
          size={30}
          color={Color.black}
          style={styles.menuIcon}
        />
      </View>
      <View style={styles.address_container}>
        <Fontisto name="map-marker-alt" size={20} color={Color.red} />
        <Text style={styles.address_style} numberOfLines={1}>
          {info?.address}
        </Text>
      </View>
      <TouchableOpacity
     
        onPress={() => navigation.navigate('NotificationScreen')}>
            {
        notificationCount > 0 &&
        <View
            style={{
              width: 8,
              height: 8,
              backgroundColor: 'red',
              borderRadius: 15 / 2,
              position: 'absolute',
              bottom: 20,
              right: 13,
            }}></View>
      }
        <Fontisto name="bell" size={25} color={Color.black} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() =>navigation.navigate('MyFavouriteDoctors')}>
      <Fontisto name="heart" size={20} color={Color.red} />
      </TouchableOpacity> */}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  top_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Color.primary,
    justifyContent: 'space-between',
  },
  address_container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 1,
  },
  address_style: {
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    paddingLeft: 5,
  },
});
