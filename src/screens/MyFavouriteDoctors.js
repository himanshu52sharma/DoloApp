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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyFavouriteDoctors = ({navigation}) => {
  const [doctorList, setDoctorList] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const user = useSelector(state => state.user);
  const favouriteDoctorList = async () => {
    setLoading(true);

    let body = {
      patient_id: user?.data?.id,
    };

    const result = await getData(`favourite_doctor_list/${user?.data?.id}`);
    console.log('result>>>>>>>>>>',result);
    if (result.message == "Favorite doctors fetched successfully.") {
      setDoctorList(result?.data);
      // setSearchName(result?.data)
      setLoading(false);
      console.log('FDL-->', result?.data);
    }
  };

  useEffect(() => {
    favouriteDoctorList();
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
      <View style={{paddingHorizontal:15}}>
        <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}>
          <Searchbar
            placeholder={'Search Doctor,Clinic'}
             editable={false}
            onChangeText={txt => setSearchName(txt)}
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
                        //key={index}
                        // onPress={()=>navigation.navigate('DoctorList',{
                        //   doctor_id:item.id
                        // })}
                        // onPress={() =>
                        //   reschedule === true
                        //     ? navigation.navigate('DoctorProfile', {
                        //         Id: item.doctor_id,
                        //         reschedule: true,
                        //         appointmentDetails: appointmentDetails,
                        //         otherDoctorAppointment: true,
                        //       })
                        //     : navigation.navigate('DoctorProfile', {
                        //         Id: item.doctor_id,
                        //       })
                        // }

                        onPress={() =>
                          navigation.navigate('DoctorProfile', {
                            Id: item.doctor_id,
                            appointmentDetails:{},
                            reschedule:false,
                            otherDoctorAppointment:false,
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
                    No Doctor Found
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

export default MyFavouriteDoctors;

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
