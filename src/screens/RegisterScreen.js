// import {
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   StatusBar,
//   Dimensions,
//   ImageBackground,
//   Easing,
//   Keyboard,
//   alert,
//   ToastAndroid,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useEffect} from 'react';
// import {SafeAreaView} from 'react-navigation';
// import {BLACK, PRIMARY_COLOR, WHITE} from '../constant/Colors';
// import {SwiperFlatList} from 'react-native-swiper-flatlist';
// import InputField from '../components/InputField';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import CustomButton from '../components/CustomButton';
// import {LOGIN_SCREEN} from '../constant/Screens';
// import {showToast} from '../components/Toast';
// import OtpModal from '../components/modals/OtpModal';
// import BannerSlider from '../components/BannerSlider';
// import Fonts from '../theme/Fonts';
// import {postData} from '../API/index';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {RadioButton} from 'react-native-paper';
// import { errorToast, successToast} from '../components/toasts';
// import { CommonActions } from '@react-navigation/native';

// const RegisterScreen = ({navigation,route}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState(route?.params?.item);
//   const [password, setPassword] = useState('');
//   const [showPass, setShowPass] = useState(false);
//   const [adhar, setAdhar] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [dob, setDOB] = useState('');
//   const [address, setAddress] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isKBOpen, setIsKBOpen] = useState(false);
//   // const [otp, setOtp] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
//   const animated = new Animated.Value(600);
//   const duration = 300;
//   const [checked, setChecked] = React.useState('Male');

//   useEffect(() => {
//     Animated.timing(animated, {
//       toValue: 0,
//       duration: duration,
//       easing: Easing.inOut(Easing.ease),
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const _renderItem = ({item}) => (
//     <ImageBackground
//       // imageStyle={{borderRadius: 13}}
//       value={item}
//       key={item}
//       source={item.src}
//       style={{
//         height: 249,
//         width: Dimensions.get('window').width - 18,
//         borderRadius: 13,
//       }}></ImageBackground>
//   );

//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         // or some other action
//         setIsKBOpen(true);
//         showMessage = () => {
//           alert('keyboardup');
//         };
//       },
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setIsKBOpen(false);
//         // or some other action
//       },
//     );

//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//   }, []);

//   const handleOTP = async () => {
//     setLoading(true);
//     // const response = await postData('api/getCheckemail', {
//     //   email,
//     //   mobile: phone,
//     // });
//     // if (response.success) {
//     //   ToastAndroid.show(
//     //     'User Already Exist ! Please Login',
//     //     ToastAndroid.SHORT,
//     //   );
//     //   setLoading(false);
//     //   navigation.goBack();
//     // } else {
//     let otp = Math.floor(1000 + Math.random() * 9000);
//     setOtp(otp);
//     console.log(otp);
//     ToastAndroid.show('OTP Sent Successfully!', ToastAndroid.SHORT);
//     //showToast({text: 'OTP Sent Successfully!', navBar: false});
//     setLoading(false);
//     setModalVisible(true);
//     // }
//   };

//   const showDatePicker = () => {
//     setIsDatePickerVisible(true);
//   };

//   FormatDate = async data => {
//     let dateTimeString =
//       data.getFullYear() +
//       '-' +
//       (data.getMonth() + 1) +
//       '-' +
//       data.getDate() +
//       ' ';

//     await hideDatePicker();
//     await setDOB(dateTimeString);
//     console.log('dob--', dob);

//     return dateTimeString; // It will look something like this 3-5-2021 16:23
//   };

//   const hideDatePicker = () => {
//     setIsDatePickerVisible(false);
//   };

//   const handleCardNumber = text => {
//     let formattedText = text.split(' ').join('');
//     if (formattedText.length > 0) {
//       formattedText = formattedText.match(new RegExp('.{1,4}', 'g')).join(' ');
//     }
//     setAdhar(formattedText);
//     console.log('adhr', adhar);
//     return formattedText;
//   };


//   const handleRegister = async pass => {
//     setLoading(true);
//     let body = {
//       name: name,
//       email: email,
//       adhar_no: adhar,
//       phonenumber: phone,
//       age: age,
//       gender: checked,
//       dob: dob,
//       address: address,
//     };




//     console.log(">>>>>REGISTRATION",body)


//     const response = await postData('patient/register', body);
//     console.log(">>>>>REGISTRATION",response)



//     if (response.status==true) {
//       successToast('Register Successful !', ToastAndroid.SHORT);



//       navigation.dispatch(
//         CommonActions.reset({
//           index: 1,
//           routes: [{name: 'HomeScreen'}],
//         }),)



//     } else {
//       errorToast('Something Went Wrong !', ToastAndroid.SHORT);
//     }
//   };

//   validateAdhar = adhar => {
//     var re = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
//     return re.test(adhar);
//   };

//   const validateEmail = email => {
//     var re =
//       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
//   };

//   const _validateSignup = () => {
//     if (name == '' || name == null) {
//       errorToast("Please enter your name");
//     } else if (email == '' || email == null) {
//       errorToast("Please enter your email");
//     } else if (!validateEmail(email)) {
//       errorToast("Please enter your valid email");
//     } else if (adhar == '') {
//       errorToast("Please enter your adhar number");
//     }

//     // else if (!this.validateAdhar(adhar)) {
//     //   showToast({text: 'Please enter valid Adharcard number', navBar: false});
//     // }
//     else if (phone == '' || phone == null) {
//       errorToast("Please enter your phone number");
//     } else if (phone.length < 10) {
      
//       errorToast("Please enter minimum 10 digit mobile number");
//     } 
//     else if(phone!==route?.params?.item){
//       errorToast("Please enter registered mobile number");

//     }
//     else if (age == '' || age == null) {
      
//       errorToast("Please enter your age");
//     } 
    
//     else if (dob == '' || dob == null) {
      
//       errorToast("Please enter your birth date");
//     } 
    
//     else if (address == '' || address == null) {
      
//       errorToast("Please enter your address");
//     } 
//     else {
//       handleRegister();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.main_container}>
//       <StatusBar
//         barStyle="light-content"
//         hidden={false}
//         backgroundColor={BLACK}
//         style="light"
//       />
//       {/* <OtpModal
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//         phone={phone}
//         otp={otp}
//         setPassword={setPassword}
//         handleRegister={pass => handleRegister(pass)}
//       /> */}

//       {!isKBOpen && <BannerSlider />}

//       <Animated.View
//         style={{
//           paddingHorizontal: 25,
//           paddingTop: 50,
//           width: Dimensions.get('window').width,
//           height: Dimensions.get('window').height,
//           borderTopLeftRadius: 30,
//           borderTopRightRadius: 30,
//           backgroundColor: PRIMARY_COLOR,
//           flex: 1,
//           transform: [{translateY: animated}],
//           opacity: animated.interpolate({
//             inputRange: [0, 600],
//             outputRange: [1, 0],
//           }),
//           // justifyContent: 'center',
//           elevation: 10,
//           shadowColor: '#000',
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           },
//           shadowOpacity: 0.25,
//           shadowRadius: 3.84,
//         }}>
//         <ScrollView
//           contentContainerStyle={{paddingBottom: 30}}
//           showsVerticalScrollIndicator={false}>
//           <Text
//             style={{
//               fontSize: 28,
//               fontWeight: '900',
//               fontFamily: Fonts.primaryRegular,
//               color: WHITE,
//             }}>
//             Join Us !
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '600',
//               fontFamily: Fonts.primaryRegular,
//               color: WHITE,
//               marginBottom: 30,
//             }}>
//             Open a free account now
//           </Text>

//           <InputField
//             label={'Name'}
//             value={name}
//             onChangeText={setName}
//             icon={
//               <MaterialIcons
//                 name="account-circle"
//                 size={20}
//                 color="#fff"
//                 style={{marginRight: 5}}
//               />
//             }
//           />

//           <InputField
//             label={'Email'}
//             value={email}
//             onChangeText={setEmail}
//             icon={
//               <MaterialIcons
//                 name="mail"
//                 size={20}
//                 color="#fff"
//                 style={{marginRight: 5}}
//               />
//             }
//           />

//           {/* <InputField
//             label={'Password'}
//             value={password}
//             onChangeText={setPassword}
//             icon={
//               <Ionicons
//                 name="ios-lock-closed-outline"
//                 size={20}
//                 color="#fff"
//                 style={{marginRight: 5}}
//               />
//             }
//             secure={!showPass}
//             setSecure={setShowPass}
//             inputType="password"
//             //fieldButtonLabel={'Forgot?'}
//             //fieldButtonFunction={() => _sheetRef.current.open()}
//           /> */}

//           <InputField
//             label={'Adhar No.'}
//             value={adhar}
//             onChangeText={setAdhar}
//             keyboardType="number-pad"
//             maxLength={12}
//             icon={
//               <AntDesign
//                 name="idcard"
//                 size={20}
//                 color="#fff"
//                 style={{marginRight: 5}}
//               />
//             }
//           />

//           <InputField
//             label={'Mobile No.'}
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="number-pad"
//             maxLength={10}
//             icon={
//               <Ionicons
//                 name="call-outline"
//                 size={20}
//                 color="#fff"
//                 style={{marginRight: 5}}
//               />
//             }
//           />

//           <InputField
//             label={'Age'}
//             value={age}
//             onChangeText={setAge}
//             keyboardType="number-pad"
//             icon={
//               <AntDesign
//                 name="calendar"
//                 size={20}
//                 color="#fff"
//                 style={{marginRight: 5}}
//               />
//             }
//           />

          
//           <View style={styles.gender_container}>
//             <MaterialIcons
//               name="account-circle"
//               size={20}
//               color="#fff"
//               style={{marginRight: 5}}
//             />
//             <Text style={{color: '#e0e0e0'}}>Gender</Text>

//             <View style={{flexDirection: 'row', alignItems: 'center'}}>
//               <View style={styles.row}>
//                 <Text style={{color: '#e0e0e0'}}>Male</Text>
//                 <RadioButton
//                   uncheckedColor={WHITE}
//                   label={'Male'}
//                   color={WHITE}
//                   value="Male"
//                   status={checked === 'Male' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked('Male')}
//                 />
//               </View>
//               <View style={styles.row}>
//                 <Text style={{color: '#e0e0e0'}}>Female</Text>
//                 <RadioButton
//                   uncheckedColor={WHITE}
//                   label={'FeMale'}
//                   color={WHITE}
//                   value="Female"
//                   status={checked === 'Female' ? 'checked' : 'unchecked'}
//                   onPress={() => setChecked('Female')}
//                 />
//               </View>
//             </View>
//           </View>

//           <View
//             style={{
//               borderBottomColor: WHITE,
//               borderBottomWidth: 1,
//               marginBottom: 20,
//             }}></View>
//           <TouchableOpacity onPress={() => showDatePicker()}>
//             <InputField
//               label={'D.O.B'}
//               value={dob}
//               editable={false}
//               onChangeText={setDOB}
//               keyboardType="number-pad"
//               icon={
//                 <AntDesign
//                   name="calendar"
//                   size={20}
//                   color="#fff"
//                   style={{marginRight: 5}}
//                 />
//               }
//             />
//           </TouchableOpacity>

//           <DateTimePickerModal
//             isVisible={isDatePickerVisible}
//             mode="date"
//             onConfirm={FormatDate}
//             onCancel={hideDatePicker}
//           />

//           <InputField
//             label={'Address'}
//             value={address}
//             onChangeText={setAddress}
//             icon={
//               <AntDesign
//                 name="idcard"
//                 size={20}
//                 color="#fff"
//                 style={{marginRight: 5}}
//               />
//             }
//           />

//           <CustomButton
//             loading={loading}
//             label={'Proceed'}
//             // onPress={() => handleOTP()}
//             onPress={() => _validateSignup()}
//           />
//         </ScrollView>
//       </Animated.View>
//     </SafeAreaView>
//   );
// };

// export default RegisterScreen;

// const styles = StyleSheet.create({
//   main_container: {
//     flex: 1,
//     backgroundColor: WHITE,
//   },
//   slider_container: {
//     height: 249,

//     width: Dimensions.get('window').width - 18,
//     alignSelf: 'center',
//   },
//   gender_container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: -15,
//   },

//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//   },
// });



import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StatusBar
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
import {Picker} from '@react-native-picker/picker';
import {BLACK, GRAY, PRIMARY_COLOR, WHITE} from '../constant/Colors';
import { useTranslation } from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {errorToast, successToast} from '../components/toasts';
import {postData} from '../API';
import Color from '../assets/utilis/Color';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { HOME_SCREEN } from '../constant/Screens';
export default function RegisterScreen({navigation,route}) {
  
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}};
  const dispatch = useDispatch();
  const {t} = useTranslation()

  const user = useSelector(state => state.user);

  const [profileData, setProfileData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gender, setGender] = React.useState('Male');
  const [weight,setWeight] = React.useState('');
  const [weightType,setWeightType] = React.useState('Kg');
  const [phone, setPhone] = React.useState(route?.params?.item);
    const [modalVisible, setModalVisible] = React.useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);

  const [adhar, setAdhar] = React.useState('');
  const [image, setImage] = React.useState('');
  const [dob, setDOB] = React.useState('');
  const [address, setAddress] = React.useState('');

  const fetchProfileInfo = async () => {
    setLoading(true);

console.log(">>userdata",user?.data?.phonenumber)

    let res = await getData(`patientprofile/${user?.data?.phonenumber}`);
    console.log(">????????????",res);

    if (res.success) {
      setProfileData(res?.data);
      setId(res?.data?.p_id);
      setImage(res?.data?.image);
      setName(res?.data?.name);
      setEmail(res?.data?.email);
      setPhone(res?.data?.phonenumber);
      setAdhar(res?.data?.adhar_no);
     // setAge(res?.data?.age);
      setDOB(res?.data?.dob);
      setAddress(res?.data?.address);
      setWeight(res?.data?.weight);
      setWeightType(res?.data?.weight_type)

 
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

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
    //  age: age,
      gender: gender,
      dob: dob,
      address: address,
      weight:weight,
      weight_type:weightType
    };



    const response = await postData('patientprofileupdate', body);

    console.log(">>>>>>>updatedata",response.data)

    if (response.success) {
      successToast('Profile Update Successful !');

      dispatch({
        type: 'SET_USER',
        payload:response,
      });

      dispatch({
        type: 'USER_DETAIL',
        payload:response.data,
      });


      await fetchProfileInfo();
      navigation.navigate(HOME_SCREEN);
    } else {
      errorToast('Something Went Wrong !');
      setLoading(false);
    }
    // await fetchProfileInfo();
  };

    const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  FormatDate = async data => {
    let dateTimeString =
    
    data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

    await hideDatePicker();
    await setDOB(dateTimeString);
    console.log('dob--', dob);

    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  return (
    <View style={styles.container}>
     <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
      <View style={styles.imageView}>
        {loading ? (
          <ProfilePlaceholder />
        ) : (
          <>
            <Avatar.Image
              size={150}
              source={{
                uri: image
                ? `data:image/png;base64,${image}`
                :'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={styles.image}
            />

            <TouchableOpacity
              style={{
                //backgroundColor: GRAY,

                position: 'absolute',
                left: '58%',
                top: '50%',
                elevation: 10,
              }}
              onPress={() => selectProfilePic()}>
              <Avatar.Icon size={40} icon="pencil"/>
             
            </TouchableOpacity>
            <Text style={{...styles.imageText, color: Color.black}}>
              {(name)}
            </Text>
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
          showsVerticalScrollIndicator={false}
          style={styles.profileContainer}
          contentContainerStyle={{
            paddingBottom: 20,
          }}>
          <Text style={styles.imageText}>
          Enter Personal Details 📝</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>
              {t("profile.Name")} </Text>

              <TextInput
                theme={theme}
                dense
                onChangeText={(x) => setName(x)}
                value={name}
                mode="flat"
                underlineColor="#000"
                activeUnderlineColor={PRIMARY_COLOR}
                style={{paddingVertical: 5, marginTop: 10}}
              />
            </View>
            <View style={{width: '48.5%'}}>
              <Text style={styles.label}>
              {t("profile.Email")} </Text>
              <TextInput
                theme={theme}
                keyboardType='email-address'
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
            <Text style={styles.label}>
            {t("profile.Gender")}</Text>
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
                <Text style={{...styles.cardTitle}}>
                {t("profile.Male")}</Text>
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
                <Text style={{...styles.cardTitle}}>
                {t("profile.Female")}
                </Text>
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
              <Text style={styles.label}>
              {t("profile.Phone")}
              </Text>
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
            {/* <View style={{width: '48.5%'}}>
              <Text style={styles.label}>
              {t("profile.Aadhar No.")}
              </Text>
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
            </View> */}
             <View style={{width: '48.5%'}}>
              <Text style={styles.label}>
              {t("profile.Date of Birth")}</Text>
              <TextInput
         
         theme={theme}
         dense
         onChangeText={text => setDOB(text)}
         value={dob}
         mode="flat"
         underlineColor="#000"
         activeUnderlineColor={PRIMARY_COLOR}
         style={{paddingVertical: 5, marginTop: 10}}
            editable={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.black}
                onPress={() => showDatePicker()}
                style={{marginTop:15}}
              />
            }
          />
          {/* </TouchableOpacity> */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={FormatDate}
            onCancel={hideDatePicker}
          />
            </View>
          </View>

          <View style={{marginTop: 15}}>
          <Text style={styles.label}>Weight (kg)</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TextInput
              theme={theme}
              dense
              style={{flex: 3, height: 45}}
              keyboardType="numeric"
              onChangeText={text => setWeight(text)}
              value={weight}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
            <View
              style={{
                borderBottomWidth: 1,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginLeft: 5,
                flex: 2,
                backgroundColor: '#aaaaaa50',
                //   height: 45,
              }}>
              <Picker
                mode="dropdown"
                style={{
                  color: '#000',
                }}
                dropdownIconColor={Color.black}
                selectedValue={weightType}
                onValueChange={(itemValue, itemIndex) =>
                  setWeightType(itemValue)
                }>
                <Picker.Item color={Color.grey} label="Kg/Grm" value="" />
                <Picker.Item label="Kg" value="Kg" />
                <Picker.Item label="Gram" value="Gram" />
              </Picker>
            </View>
          </View>
        </View>

          <View style={{marginTop: 10}}>
            <Text style={styles.label}>
              
            {t("profile.Address")}</Text>
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
          </View>

          <Button
            style={{
              backgroundColor: Color.black,
              marginTop: 60,
              marginBottom: 10,
            }}
            contentStyle={{height: 55, alignItems: 'center'}}
            dark
            loading={loading}
            mode="contained"
            onPress={()=>updateProfile()}>
           Submit
          </Button>
        </ScrollView>
      )}
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
    paddingVertical: 5,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 25,
    backgroundColor:'#fffcf3' ,
    elevation: 10,
  },
  image: {
    elevation: 8,
  },
  imageText: {
    marginTop: 25,
    fontSize: 20,
    color: '#000',
    fontFamily: Fonts.primaryBold,
    textShadowColor: GRAY,
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  profileContainer: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor:Color.primary
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
});

