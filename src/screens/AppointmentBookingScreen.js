import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React from 'react';
import Color from '../assets/utilis/Color';
import {useSelector} from 'react-redux';
import Fonts from '../theme/Fonts';
import {Button, TextInput} from 'react-native-paper';
import Dimension from '../theme/Dimension';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {PRIMARY_COLOR} from '../constant/Colors';
import {errorToast, successToast} from '../components/toasts';
import {getData, postData} from '../API';
import PaymentModal from '../components/modals/PaymentModal';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch} from 'react-redux';
import {mobile} from 'is_js';
const {width, height} = Dimension;
const AppointmentBookingScreen = ({navigation, route}) => {
  const theme = {colors: {text: '#000', background: '#aaaaaa50'}}; // for text input
  const user = useSelector(state => state.user);
  console.log('user==>', user?.data);
  const appointmentType = useSelector(state => state.appointmentType);
  const dispatch = useDispatch();
  //  console.log('user==', user);
  console.log('appointmentType==>', appointmentType);
  const {doctor_details} = route?.params;
  const {morningSchedule} = route?.params;
  const {eveningSchedule} = route?.params;
  const {reschedule} = route?.params;
  const {otherDoctorAppointment} = route?.params;
  const {appointmentDetails} = route?.params;
  console.log('appointmentDetails==', appointmentDetails);
  console.log('reschedule==', reschedule);
  // console.log('morningSchedule==', morningSchedule);
  // console.log('eveningSchedule==', eveningSchedule);
  const [serviceCharge, setServiceCharge] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [ownAppointment, setOwnAppointment] = React.useState(true);
  const [otherAppointment, setOtherAppointment] = React.useState(false);
  const [bookingPerson, setBookingPerson] = React.useState('Yourself');

  const [category, setCategory] = React.useState(user?.data?.category || '');
  const [shiftName, setShiftName] = React.useState(
    user?.data?.shift_name || 'Morning',
  );
  const [name, setName] = React.useState(user?.data?.name || '');
  const [age, setAge] = React.useState(user?.data?.dob || '');
  // const [ageType, setAgeType] = React.useState(itemData?.ageType || 'Years');
  const [weight, setWeight] = React.useState(user?.data?.weight || '');
  const [weightType, setWeightType] = React.useState(
    user?.data?.weightType || 'Kg',
  );
  const [gender, setGender] = React.useState(
    user?.data?.gender || 'male',
  );
  const [mobileNo, setMobileNo] = React.useState(user?.data?.phonenumber || '');

  const [showModal, setShowModal] = React.useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [isCreateDatePickerVisible, setIsCreateDatePickerVisible] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [createTime, setCreateTime] = React.useState('');
  const [currentAge, setCurrentAge] = React.useState('');
  const [createDate, setCreateDate] = React.useState(
    user?.data?.create_date || '',
  );
  const [modalData, setModalData] = React.useState('');
  const [docorName, setDoctorName] = React.useState('');

  const _scrollRef = React.useRef(null);
  const _inputRef = React.useRef(null);

  FormatDate = async data => {
    let dateTimeString =
      data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();

    hideDatePicker();
    setAge(dateTimeString);

    return dateTimeString; // It will look something like this 3-5-2021 16:23
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  FormatCreateDate = async data => {
    if (data.getDate() < 10 && data.getMonth() + 1 < 10) {
      var dateTimeString1 =
        '0' +
        data.getDate() +
        '/' +
        '0' +
        (data.getMonth() + 1) +
        '/' +
        data.getFullYear();
    } else if (data.getDate() < 10) {
      var dateTimeString1 =
        '0' +
        data.getDate() +
        '/' +
        (data.getMonth() + 1) +
        '/' +
        data.getFullYear();
    } else if (data.getMonth() + 1 < 10) {
      var dateTimeString1 =
        data.getDate() +
        '/' +
        '0' +
        (data.getMonth() + 1) +
        '/' +
        data.getFullYear();
    } else {
      var dateTimeString1 =
        data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    }

    hideCreateDatePicker();
    setCreateDate(dateTimeString1);

    return dateTimeString1; // It will look something like this 3-5-2021 16:23
  };
  const showCreateDatePicker = () => {
    setIsCreateDatePickerVisible(true);
  };
  const hideCreateDatePicker = () => {
    setIsCreateDatePickerVisible(false);
  };

  const checkValidation = async () => {
    if (category == '') {
      errorToast('Please Select Purpose');
    } else if (name == '') {
      errorToast('Please enter patient name');
    } else if (age == '') {
      errorToast('Please select D.O.B');
    } else if (weight == '') {
      errorToast('Please enter weight');
    } else if (mobileNo == '') {
      errorToast('Please enter patient mobile number');
    } else if (createDate == '') {
      errorToast('Please Select appointment date');
    } else {
      //  await onSubmit();

      shiftName === 'Morning'
        ? await checkMorningAvailability()
        : await checkEveningAvailability();
    }
  };

  const bookOtherAppointment = () => {
    setOtherAppointment(true);
    setOwnAppointment(false);
    setCategory('');
    setName('');
    setAge('');
    //  setAgeType('Years');
    setWeight('');
    setWeightType('Kg');
    setGender('male');
    setMobileNo('');
    // setShowModal(false);
    setCreateDate('');

    setShiftName('Morning');
    _scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    _inputRef.current.blur();
  };

  const bookOwnAppointment = () => {
    setOwnAppointment(true);
    setOtherAppointment(false);
    setCategory('');
    setName(user?.data?.name);
    setAge(user?.data?.dob);
    //  setAgeType('Years');
    setWeight(user?.data?.weight);
    setWeightType('Kg');
    setGender(user?.data?.gender.toLowerCase() || 'male');
    setMobileNo(user?.data?.phonenumber);
    // setShowModal(false);
    setCreateDate('');
    setShiftName(user?.data?.shift_name || 'Morning');
    _scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    _inputRef.current.blur();
  };

  const getServiceCharge = async () => {
    const result = await getData('service_charge');
    if (result.success) {
      setServiceCharge(result.data[0].service);
      console.log('schrg==', result.data[0].service);
    }
  };

  React.useEffect(() => {
    getServiceCharge();
    console.log('p_id--->', user?.data?.id);
  }, []);

  const onSubmit = async () => {
    setShowModal(true);
  };

  const sendPaymentHistory = async () => {
    var body = {
      patient_id: user?.data?.id,
      doctor_id: doctor_details[0].doctor_id,
      //   amount: parseInt(doctor_details[0].fees),
      amount: parseInt(serviceCharge),
    };

    let result = await postData('patientpayment', body);
    if (result?.success) {
      console.log('payment--->', result);
      successToast('Payment Done');
    }
  };

  const makePayment = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_l9rWfaKjGexwH4', // Your api key
      amount:
        (parseInt(serviceCharge) + parseInt(doctor_details[0].fees)) * 100,
      name: user?.data?.name,
      prefill: {
        email: user?.data?.email,
        contact: user?.data?.phonenumber,
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success

        // sendPaymentHistory();
        alert(`Success: ${data.razorpay_payment_id}`);
        // bookAppointment(doctor_details[0].fees,servicecharge);
      })
      .catch(error => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        alert(`Payment Failed`);
      });
  };

  const payServiceCharge = () => {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_l9rWfaKjGexwH4', // Your api key
      amount: parseInt(serviceCharge) * 100,
      name: user?.data?.name,
      prefill: {
        email: user?.data?.email,
        contact: user?.data?.phonenumber,
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        sendPaymentHistory();
        // alert(`Success: ${data.razorpay_payment_id}`);
        alert('Appointment Successful');
        if (ownAppointment === true) {
          bookAppointment();
        }
        if (otherAppointment === true) {
          bookAppointmentForOther();
        }
      })
      .catch(error => {
        // handle failure
        alert(`Error: Payment failed`);
      });
  };

  const rescheduleAppointment = async () => {
    setLoading(true);
    let body = {
      id: appointmentDetails.id,
      name: name,
      patient_id: user?.data?.id,
      Shiftname: appointmentDetails.shift_name,
      age: age,
      weight: weight,
      weighttype: weightType,
      gender: gender,
      mobile: mobileNo,
      status: 0,

      create_date: createDate,
      doctor_id:
        otherDoctorAppointment === true
          ? doctor_details[0].doctor_id
          : appointmentDetails.doctor_id,
      payment:
        doctor_details[0].feeconsultation == 1
          ? doctor_details[0].fees
          : serviceCharge,
      service_charge: serviceCharge,
    };

    console.log('bor=', body);
    var result = await postData(`appintment_schedule_update`, body);
    if (result.success) {
      successToast(result.message);

      {
        otherDoctorAppointment === true
          ? navigation.navigate('PatientHistory')
          : navigation.goBack();
      }
    } else {
      errorToast(result.message);
    }
    setLoading(false);
  };

  const bookAppointment = async (payment, service_charge) => {
    setLoading(true);
    const body = {
      doctor_id: doctor_details[0]?.doctor_id,
      category: category,
      patient_name: name,
      age: age,
      weight: weight,
      weighttype: weightType,
      gender: gender,
      mobile: mobileNo,
      status: 0,
      create_date: createDate,
      shift_name: shiftName,
      payment:
        doctor_details[0].feeconsultation == 1
          ? doctor_details[0].fees
          : serviceCharge,
      service_charge: serviceCharge,
    };
    console.log('body==', body);
    const result = await postData('createappointment', body);
    console.log('res==', result);
    if (result.success) {
      successToast('Appointment Successfuly Created');

      navigation.navigate('Home1');
    } else {
      errorToast(result.message);
    }
    setLoading(false);
  };

  const bookAppointmentForOther = async (payment, service_charge) => {
    setLoading(true);
    const body = {
      p_id: user?.data?.id,
      doctor_id: doctor_details[0]?.doctor_id,
      category: category,
      patient_name: name,
      age: age,
      weight: weight,
      weighttype: weightType,
      gender: gender,
      mobile: mobileNo,
      status: 0,
      create_date: createDate,
      shift_name: shiftName,
      payment:
        doctor_details[0].feeconsultation == 1
          ? doctor_details[0].fees
          : serviceCharge,
      service_charge: serviceCharge,
    };

    const result = await postData('book_other_appointment', body);
    console.log('res==', result);
    if (result.success) {
      console.log('otherbodyy==', body);
      successToast('Appointment Successfuly Created');

      navigation.navigate('Home1');
    } else {
      errorToast(result.message);
    }
    setLoading(false);
  };

  const checkMorningAvailability = async () => {
    // onSubmit();
    setLoading(true);
    let body = {
      doctor_id: doctor_details[0]?.doctor_id,
      morningdate: createDate,
    };
     console.log('body>>>>>',body);
    const res = await postData('timesup_morning_appointment', body);
    console.log('res==', res);
    if (res.success) {
      reschedule === true ? rescheduleAppointment() : onSubmit();
     // checkDoctorAvailability();
    } else {
       errorToast(res?.message);
     // errorToast('Clinic has been closed now');
    }
    setLoading(false);
  };

  const checkEveningAvailability = async () => {
    // onSubmit();
    setLoading(true);
    let body = {
      doctor_id: doctor_details[0]?.doctor_id,
      eveningdate: createDate,
    };

    const res = await postData('timesup_evening_appointment', body);
    console.log('res==', res);
    if (res.success) {
      reschedule === true ? rescheduleAppointment() : onSubmit();
     // checkDoctorAvailability();
    } else {
       errorToast(res?.message);
     // errorToast('Clinic has been closed now');
    }
    setLoading(false);
  };

  const checkDoctorAvailability = async () => {
    let body = {
      id: doctor_details[0]?.doctor_id,
      date: createDate,
    };
    const respo = await postData('disabledate', body);
    if (respo.success) {
      reschedule === true ? rescheduleAppointment() : onSubmit();
    } else {
      errorToast('Appointment not booked because doctor absent');
    }
  };

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

      <View style={styles.top_container}>
        <Text style={styles.doctor_name_style}>
          Dr.{' '}
          <Text style={{color: Color.black}}>{doctor_details[0]?.name}</Text>
        </Text>
        <Text style={styles.specialization_style}>
          {doctor_details[0]?.specialization}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => bookOwnAppointment()}
          style={{
            ...styles.radioStyle,
            backgroundColor:
              //  shiftName == 'Morning' ? `${PRIMARY_COLOR}50` : '#aaaaaa50',
              ownAppointment == true ? Color.black : `${Color.red}50`,
          }}>
          <Text
            style={{
              //  color: '#000',
              color: Color.white,
              fontFamily: Fonts.primaryRegular,
              lineHeight: 14 * 1.5,
            }}>
            Book For Yourself
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => bookOtherAppointment()}
          style={{
            ...styles.radioStyle,
            backgroundColor:
              otherAppointment == true ? Color.black : `${Color.red}60`,
            marginLeft: 5,
          }}>
          <Text
            style={{
              color: Color.white,
              fontFamily: Fonts.primaryRegular,
              lineHeight: 14 * 1.5,
            }}>
            Book For Others
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.middle_container}>
        <Text style={styles.heading_style}>Enter Patient Details 📝</Text>
      </View>

      <ScrollView
        ref={_scrollRef}
        style={styles.form}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        {/* {route.params?.type == 'add' && */}
        <View>
          <Text style={styles.label}>Shift Name</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => setShiftName('Morning')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  shiftName == 'Morning' ? `${PRIMARY_COLOR}50` : '#aaaaaa50',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Morning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShiftName('Evening')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  shiftName == 'Evening' ? `${PRIMARY_COLOR}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Evening
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* } */}
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Purpose</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              marginTop: 5,
              backgroundColor: '#aaaaaa50',
              height: 45,
            }}>
            <Picker
              mode="dropdown"
              style={{
                color: '#000',
              }}
              dropdownIconColor={Color.black}
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item
                color={Color.grey}
                label="Select Category"
                value=""
              />
              <Picker.Item label="General" value="General" />
              <Picker.Item label="Vaccination" value="Vaccination" />
              <Picker.Item label="Revisit" value="Revisit" />
              <Picker.Item label="OtherCategory" value="OtherCategory" />
            </Picker>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            theme={theme}
            dense
            style={{height: 45}}
            onChangeText={text => setName(text)}
            value={name}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>
        {/* <View style={{marginTop: 15,flexDirection: 'row',flex:1,justifyContent:'space-between'}}>
          
         
          <View
            style={{
              
              marginTop: 5,
              width:'49%'
            }}>
              <Text style={styles.label}>Age (Years)</Text>
            <TextInput
              theme={theme}
              dense
              style={{height: 45,}}
              keyboardType="numeric"
              onChangeText={text => setAge(text)}
              value={age}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            /> */}
        {/* <View
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
                dropdownIconColor={Color.primary}
                selectedValue={ageType}
                onValueChange={(itemValue, itemIndex) => setAgeType(itemValue)}>
                <Picker.Item color={Color.grey} label="Y/M/D" value="" />
                <Picker.Item label="Year" value="Year" />
                <Picker.Item label="Month" value="Months" />
                <Picker.Item label="Days" value="Days" />
              </Picker>
            </View> */}
        {/* </View>
          <View
            style={{
              
              marginTop: 5,
              width:'49%'
            }}>
              <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              theme={theme}
              dense
              style={{height: 45,}}
              keyboardType="numeric"
              onChangeText={text => setWeight(text)}
              value={weight}
              mode="flat"
              underlineColor="#000"
              activeUnderlineColor={Color.primary}
            />
            </View>
        </View> */}
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>D.O.B</Text>

          <TextInput
            theme={theme}
            dense
            onChangeText={txt => setAge(txt)}
            value={age}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
            editable={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.black}
                onPress={() => showDatePicker()}
              />
            }
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={data => FormatDate(data)}
            onCancel={hideDatePicker}
          />
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
                height: 45,
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
        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Gender</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
              onPress={() => setGender('male')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'male' ? `${PRIMARY_COLOR}50` : '#aaaaaa50',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('female')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'female' ? `${PRIMARY_COLOR}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGender('others')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  gender == 'others' ? `${Color.primary}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Others
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            ref={_inputRef}
            theme={theme}
            maxLength={10}
            style={{height: 45}}
            keyboardType="numeric"
            dense
            onChangeText={text => setMobileNo(text)}
            value={mobileNo}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
          />
        </View>

        <View style={{marginTop: 15}}>
          <Text style={styles.label}>Appointment Date</Text>

          {/* <TouchableOpacity > */}
          <TextInput
            // ref={_inputRef}
            theme={theme}
            //keyboardType="numeric"
            dense
            onChangeText={val => setCreateDate(val)}
            value={createDate}
            mode="flat"
            underlineColor="#000"
            activeUnderlineColor={Color.primary}
            editable={false}
            right={
              <TextInput.Icon
                icon="calendar"
                color={Color.black}
                onPress={() => showCreateDatePicker()}
              />
            }
          />
          <DateTimePickerModal
            isVisible={isCreateDatePickerVisible}
            mode="date"
            onConfirm={e => FormatCreateDate(e)}
            onCancel={hideCreateDatePicker}
          />
        </View>

        {/* <View style={{marginTop:15}}>
          <Text style={styles.label}>Shift</Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              marginTop: 5,
              backgroundColor: '#aaaaaa50',
              //   height: 45,
            }}>
            <Picker
              mode="dropdown"
              style={{
                color: '#000',
              }}
              dropdownIconColor={Color.primary}
              selectedValue={shiftName}
              onValueChange={(itemValue, itemIndex) => setShiftName(itemValue)}>
              <Picker.Item
                color={Color.grey}
                label="Select Shift"
                value=""
              />
              <Picker.Item label="Morning" value="Morning" />
              <Picker.Item label="Evening" value="Evening" />
            
            </Picker>
          </View>
        </View> */}
        {route.params?.type === 'edit' && (
          <Text style={styles.sectionTitle}>Token No.{itemData?.token_no}</Text>
        )}

        <Button
          style={{
            backgroundColor: Color.black,
            marginTop: 25,
            marginBottom: 10,
          }}
          contentStyle={{height: 55, alignItems: 'center'}}
          dark
          loading={loading}
          mode="contained"
          //  onPress={reschedule === true ? rescheduleAppointment : checkValidation}
          onPress={() =>
            shiftName === 'Morning'
              ? checkMorningAvailability()
              : checkEveningAvailability()
            // checkValidation()
          }>
          Continue
        </Button>
        <PaymentModal
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          patient_name={name}
          patient_email={user?.data?.email}
          patient_address={user?.data?.address}
          doctor_name={doctor_details[0]?.name}
          doctor_specialization={doctor_details[0]?.specialization}
          dolo_id={doctor_details[0]?.do_lo_id}
          fees={serviceCharge}
          clinic_location={doctor_details[0]?.clinic_location}
          create_date={createDate}
          category={category}
          title={'Payment Details'}
          primaryBtnText={'Cancel'}
          // onPrimaryPress={() => onPrimaryPress()}
          onPrimaryPress={() => {
            setShowModal(false);
          }}
          onCancelPress={() => {
            setShowModal(false);
          }}
          secondaryBtnText="Pay Now"
          onSecondaryPress={() => {
            payServiceCharge();
            setShowModal(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentBookingScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  top_container: {
    marginTop: 15,
    alignItems: 'center',
  },
  doctor_name_style: {
    color: Color.red,
    fontFamily: Fonts.primaryBold,
    fontSize: 22,
    lineHeight: 30,
  },
  specialization_style: {
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    lineHeight: 20,
  },
  middle_container: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  heading_style: {
    color: Color.black,
    fontFamily: Fonts.primaryBold,
    fontSize: 22,
    lineHeight: 30,
  },
  form: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 15,
  },
  label: {
    fontFamily: Fonts.primaryRegular,
    color: '#000',
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // width: '49%',
    padding: 12,
    borderRadius: 5,
  },
});
