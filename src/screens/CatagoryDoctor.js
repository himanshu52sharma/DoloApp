import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {SafeAreaView} from 'react-navigation';
import {useSelector} from 'react-redux';

import {ActivityIndicator, useTheme} from 'react-native-paper';
import CategoryPlaceholder from '../placeholders/CategoryPlaceholder';
import Color from '../assets/utilis/Color';
import {getData, postData} from '../API';
import {Searchbar} from 'react-native-paper';
import DropShadow from 'react-native-drop-shadow';
import SearchBox from '../components/SearchBox';
import Fonts from '../theme/Fonts';

import {useTranslation} from 'react-i18next';

const {width, height} = Dimensions.get('window');

const CatagoryDoctor = ({navigation, route}) => {
  const {reschedule} = route?.params;
  const {appointmentDetails} = route?.params;
  const {otherDoctorAppointment} = route?.params && route?.params;
  console.log('catappointmentDetails==', appointmentDetails);
  const [loading, setLoading] = useState(false);
  const [catagoryList, setCatagoryList] = useState([]);

  const Info = useSelector(state => state.info);
  const user = useSelector(state => state.user);
  // console.log('user==',user);
  const {t} = useTranslation();

  // console.log("info",Info)

  const Theme = useTheme();
  const {colors} = useTheme();

  const fetchCategoryList = async () => {
    setLoading(true);
    let result = await getData('doctorspeacialist');
    if (result?.success) {
      setCatagoryList(result.data);
      //  console.log('clist==',result.data)
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);
  // console.log('catagoryList',catagoryList);

  React.useEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home1');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.middle_container}>
        {/* <View style={{marginTop: 10}}>
          <Searchbar
            placeholder={'Search Doctor,Clinic'}
            // onChangeText={(txt) => searchPatient(txt)}
            // value={searchQuery}
            keyboardType="number-pad"
            style={{
              fontFamily: 'Poppins-Bold',
              borderColor: Color.primary,
              borderWidth: 2,
            }}
            placeholderTextColor={Color.black}
          />
        </View> */}
        <Text style={styles.heading_top_style}>Select a Category</Text>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <CategoryPlaceholder
            animating={true}
            color={'#000'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              paddingTop: 36,
              width: width,
              height: height,
            }}
          />
        ) : (
          <View
            style={{
              width: width,
              paddingHorizontal: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `key-${index}`}
              nestedScrollEnabled={true}
              data={catagoryList}
              numColumns={2}
              horizontal={false}
              renderItem={({item, index}) => (
                <View style={styles.category_container}>
                  <TouchableOpacity
                    style={styles.specialization_card_style}
                    // onPress={() =>
                    //   navigation.navigate(DOCTOR_LIST, {
                    //     specialization: item.specialist,
                    //   })}
                    onPress={() =>
                      reschedule === true
                        ? navigation.navigate('DoctorList', {
                            specialization: item.specialist,
                            reschedule: true,
                            appointmentDetails: appointmentDetails,
                            otherDoctorAppointment: true,
                          })
                        : navigation.navigate('DoctorList', {
                            specialization: item.specialist,
                          })
                    }>
                    <DropShadow
                      style={{
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 5,
                      }}>
                      <>
                        <Image
                          //source={{uri:item.src}}
                          source={{uri: `data:image/png;base64,${item?.image}`}}
                          // source={require('../assets/images/kids.png')}
                          style={styles.specialization_img_style}
                        />
                      </>
                    </DropShadow>
                    <Text style={styles.specialization_name_style}>
                      {item.specialist}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CatagoryDoctor;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },

  top_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    //justifyContent: 'space-between',
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
    paddingLeft: 10,
  },
  middle_container: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  heading_top_style: {
    fontFamily: Fonts.primaryBold,
    color: Color.black,

    fontSize: 20,
    paddingTop: 20,
  },
  doc_add_style: {
    fontSize: 14,
    // color: BLACK,
    fontFamily: Fonts.primaryRegular,
    textTransform: 'uppercase',
  },
  category_container: {
    alignSelf: 'center',
    overflow: 'hidden',
    shadowOffset: {width: 10, height: 10},
    shadowColor: '#000',
    shadowOpacity: 5,
    elevation: 20,
    shadowRadius: 5,
  },

  specialization_card_style: {
    width: width / 2 - 30,
    borderRadius: 10,
    // backgroundColor: Color.white,
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    // paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 12,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  specialization_img_style: {
    height: 120,
    width: 120,
  },
  specialization_name_style: {
    color: Color.black,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primaryBold,
    textAlign: 'center',
    marginTop: 15,
    textShadowColor: Color.black,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 3,
    elevation: 10,
  },
});
