import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  BackHandler
} from 'react-native';
import React, {useEffect} from 'react';
//import {Dimension, Fonts} from '../theme';
import Fonts from '../theme/Fonts';
import Dimension from '../theme/Dimension';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, TextInput, Button} from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../API';
import ProfilePlaceholder from '../placeholders/ProfilePlaceholder';
import {BLACK, GRAY, PRIMARY_COLOR, WHITE} from '../constant/Colors';
import {useTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {errorToast, successToast} from '../components/toasts';
import {postData} from '../API';
import Color from '../assets/utilis/Color';
export default function ProfileScreen({navigation}) {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}};
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const user = useSelector(state => state.user);
  const [profileData, setProfileData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('Male');
  const [phone, setPhone] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [weightType, setWeightType] = React.useState('Kg');
  const [adhar, setAdhar] = React.useState('');
  const [age, setAge] = React.useState('');
  const [image, setImage] = React.useState('');
  const [dob, setDOB] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [currentAge, setCurrentAge] = React.useState('');

  const fetchProfileInfo = async () => {
    setLoading(true);

    console.log('>>userdata', user?.data?.phonenumber);

    let res = await getData(`patientprofile/${user?.data?.phonenumber}`);
    console.log('>????????????', res?.data?.address);

    if (res.success) {
      setProfileData(res?.data);
      setId(res?.data?.p_id);
      setImage(res?.data?.image);
      setName(res?.data?.name);
      setEmail(res?.data?.email);
      setWeight(res?.data?.weight)
      setWeightType(res?.data?.weight_type)
      setPhone(res?.data?.phonenumber);
      setAdhar(res?.data?.adhar_no);
      setAge(res?.data?.age);
      setDOB(res?.data?.dob);
      setAddress(res?.data?.address);
      getAge(res?.data?.dob)
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchProfileInfo();
  // }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      fetchProfileInfo();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const logOut = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      setImage(image.data);
      console.log('profilepi---', image);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
    }).then(image => {
      setImage(image.data);
      console.log('profilepi---', image);
    });
  };

  const selectProfilePic = () => {
    Alert.alert(
      'Select Profile Picture from',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Camera',
          onPress: () => takePhotoFromCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => choosePhotoFromLibrary(),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const updateProfile = async () => {
    setLoading(true);
    let body = {
      name: name,
      email: email,
      adhar_no: adhar,
      image: image,
      phonenumber: phone,
      age: age,
      gender: gender,
      dob: dob,
      address: address,
    };

    const response = await postData('patientprofileupdate', body);

    // console.log(">>>>>>>updatedata",response)

    if (response.success) {
      successToast('Profile Update Successful !');

      dispatch({
        type: 'USER_DETAIL',
        payload: response.data,
      });

      await fetchProfileInfo();
    } else {
      errorToast('Something Went Wrong !');
      setLoading(false);
    }
    // await fetchProfileInfo();
  };

    const getAge = (dateString) => {
    var dates = dateString.split("/");
    var d = new Date();

    var userday = dates[0];
    var usermonth = dates[1];
    var useryear = dates[2];

    var curday = d.getDate();
    var curmonth = d.getMonth()+1;
    var curyear = d.getFullYear();

    var age = curyear - useryear;

    if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday )){

        age--;

    }
    console.log('age1=',age);
    return setCurrentAge(age);
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
    <View style={styles.container}>
      <Menu renderer={renderers.SlideInMenu} style={styles.dots}>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={32}
            color={BLACK}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            // height: Dimension.window.height * 0.5,
            justifyContent: 'flex-end',
          }}
          customStyles={{
            optionText: {
              color: BLACK,
              fontSize: 15,
              fontFamily: Fonts.primaryBold,
            },
            optionWrapper: {
              padding: 20,
            },
          }}>
          <MenuOption
            customStyles={{
              optionText: {
                color: WHITE,
                fontSize: 15,
                fontFamily: Fonts.primaryBold,
              },
              optionWrapper: {
                padding: 20,
                backgroundColor: 'red',
              },
            }}
            onSelect={() => logOut()}
            text="Logout"
          />
        </MenuOptions>
      </Menu>
      <View style={styles.imageView}>
        {loading ? (
          <ProfilePlaceholder />
        ) : (
          <>
            <Text style={styles.welcome_user_style}>
            {t('profile.Welcome')},
              <Text style={{color: Color.black}}> {name} </Text>
            </Text>
            <Avatar.Image
              size={100}
              source={{
                uri: image
                  ? `data:image/png;base64,${image}`
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />
          </>
        )}
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            height: Dimension.window.height * 0.5,
          }}>
          <ActivityIndicator size="large" color="#25CCF7" />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.profileContainer}
          contentContainerStyle={{
            paddingBottom: 20,
          }}>
          <Text style={styles.imageText}>
            {t('profile.Personal Details')} 👨
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>{t('profile.Name')} </Text>

              <TextInput
                theme={theme}
                dense
                onChangeText={x => setName(x)}
                value={name}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={PRIMARY_COLOR}
                style={{paddingVertical: 5, marginTop: 10}}
              />
            </View>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>{t('profile.Email')} </Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setEmail(text)}
                value={email}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={PRIMARY_COLOR}
                style={{paddingVertical: 5, marginTop: 10}}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={styles.label}>{t('profile.Gender')}</Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  ...styles.card,
                  backgroundColor:
                    (gender || profileData?.gender) === 'Male'
                      ? `${PRIMARY_COLOR}50`
                      : '#aaaaaa50',
                  width: '48.5%',
                }}
                onPress={() => setGender('Male')}>
                <Text style={{...styles.cardTitle}}>{t('profile.Male')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.card,
                  backgroundColor:
                    (gender || profileData?.gender) === 'Female'
                      ? `${PRIMARY_COLOR}50`
                      : '#aaaaaa50',
                  width: '48.5%',
                }}
                onPress={() => setGender('Female')}>
                <Text style={{...styles.cardTitle}}>{t('profile.Female')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>{t('profile.Phone')}</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setPhone(text)}
                value={phone}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={PRIMARY_COLOR}
                style={{paddingVertical: 5, marginTop: 10}}
              />
            </View>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>{t('profile.Aadhar No.')}</Text>
              <TextInput
                theme={theme}
                maxLength={12}
                dense
                onChangeText={text => setAdhar(text)}
                value={adhar}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={PRIMARY_COLOR}
                style={{paddingVertical: 5, marginTop: 10}}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>{t('profile.Age')}</Text>
              <TextInput
                theme={theme}
                dense
                onChangeText={text => setAge(text)}
                value={age}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={PRIMARY_COLOR}
                style={{paddingVertical: 5, marginTop: 10}}
              />
            </View>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>{t('profile.Date of Birth')}</Text>
              <TextInput
                theme={theme}
                maxLength={12}
                dense
                onChangeText={text => setDOB(text)}
                value={dob}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={PRIMARY_COLOR}
                style={{paddingVertical: 5, marginTop: 10}}
              />
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text style={styles.label}>{t('profile.Address')}</Text>
            <TextInput
              theme={theme}
              dense
              onChangeText={text => setAddress(text)}
              value={address}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={PRIMARY_COLOR}
              style={{paddingVertical: 5, marginTop: 10}}
            />
          </View> */}

          {/* <Button
            style={{
              backgroundColor: PRIMARY_COLOR,
              marginTop: 60,
              marginBottom: 10,
            }}
            contentStyle={{height: 55, alignItems: 'center'}}
            dark
            loading={loading}
            mode="contained"
            onPress={() => updateProfile()}>
            {t('profile.Update Profile')}
          </Button> */}
          <View style={styles.proile_detail_container}>
            <View>
              <Text style={styles.profile_lable_style}>{t('profile.Name')} :</Text>  
            </View>
            <View style={{width: '60%'}}>
              <Text style={styles.proile_detail_txt_style}> {name}</Text>
            </View>
          </View>
          <View style={styles.proile_detail_container}>
            <View>
              <Text style={styles.profile_lable_style}>{t('profile.Gender')} :</Text>
            </View>
            <View style={{width: '60%'}}>
              <Text style={styles.proile_detail_txt_style}> {gender}</Text>
            </View>
          </View>
          <View style={styles.proile_detail_container}>
            <View>
              <Text style={styles.profile_lable_style}>{t('profile.Age')} :</Text>
            </View>
            <View style={{width: '60%'}}>
              <Text style={styles.proile_detail_txt_style}> {currentAge} Years</Text>
            </View>
          </View>
          <View style={styles.proile_detail_container}>
            <View>
              <Text style={styles.profile_lable_style}>{t('profile.Weight')} :</Text>
            </View>
            <View style={{width: '60%'}}>
              <Text style={styles.proile_detail_txt_style}> {weight} {weightType} </Text>
            </View>
          </View>
          <View style={styles.proile_detail_container}>
            <View>
              <Text style={styles.profile_lable_style}>{t('profile.Mob')} :</Text>
            </View>
            <View style={{width: '60%'}}>
              <Text style={styles.proile_detail_txt_style}> {phone}</Text>
            </View>
          </View>
          <View style={styles.proile_detail_container}>
            <View>
              <Text style={styles.profile_lable_style}>{t('profile.location')} :</Text>
            </View>
            <View style={{width: '70%'}}>
              <Text style={styles.proile_detail_txt_style}> {address}</Text>
            </View>
          </View>
          {/* <Text style={styles.imageText}>
            {t('profile.Appointment History')} 🧾
          </Text> */}
        </ScrollView>
      )}
      <Button
        style={{
          backgroundColor: Color.black,
          marginTop: 60,
          marginBottom: 10,
          width: Dimensions.get('window').width - 30,
          position: 'absolute',

          bottom: 0,
        }}
        contentStyle={{height: 55, alignItems: 'center'}}
        dark
        //  loading={loading}
        mode="contained"
        onPress={() => navigation.navigate('UpdateProfileScreen')}>
        {t('profile.Update Profile')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageView: {
    // height: '35%',
    width: '100%',
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 25,
    backgroundColor: '#fffcf3',
    elevation: 10,
  },
  image: {
    elevation: 8,
  },
  welcome_user_style: {
    fontSize: 20,
    color: Color.red,
    fontFamily: Fonts.primaryBold,
    // textShadowColor: Color.red,
    // textShadowOffset: {width: 0.5, height: 0.5},
    // textShadowRadius: 1,
  },
  imageText: {
    marginTop: 25,
    fontSize: 20,
    color: Color.red,
    fontFamily: Fonts.primaryBold,
    textShadowColor: Color.red,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
    textAlign: 'center',
  },
  profileContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: Color.primary,
  },
  card: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 5,
    backgroundColor: WHITE,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // shadowColor: '#00000050',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: BLACK,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingVertical: 5,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardText: {
    fontSize: 16,
    color: BLACK,
    fontFamily: 'Poppins-Medium',
  },
  dots: {
    position: 'absolute',
    right: 12,
    top: 20,
    zIndex: 10,
    color: WHITE,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
  proile_detail_container: {
    flexDirection: 'row',
   // alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile_lable_style: {
    fontFamily: Fonts.primarySemiBold,
    color: Color.red,
    fontSize: 20,
  },
  proile_detail_txt_style: {
    fontFamily: Fonts.primaryBold,
    color: Color.black,
    fontSize: 20,
  },
});
