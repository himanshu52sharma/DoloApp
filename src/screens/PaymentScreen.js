import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Color from '../assets/utilis/Color';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import Fonts from '../theme/Fonts';
import {errorToast, successToast} from '../components/toasts';
import { PRIMARY_COLOR } from '../constant/Colors';
import { getData, postData } from '../API';

const PaymentScreen = ({navigation, route}) => {
  const user = useSelector(state => state.user);

 
  const [paymentType, setPaymentType] = React.useState('Complete');
  const [loading, setLoading] = React.useState('false');
 


  
 
  
  
 
  

  const {doctor_details, create_date,doctor_id,category,shift_name,mobile,gender,status,weight,weighttype,age,patient_name,service_charge} = route?.params;
console.log('service_charge==>',service_charge)
  console.log(
    'body==',
    user?.data?.id,
    doctor_details[0].doctor_id,
    parseInt(service_charge) + parseInt(doctor_details[0].fees),
  );

  console.log('create_date==', create_date);

  console.log(
    'totalfees==',
    parseInt(service_charge) + parseInt(doctor_details[0].fees),
  );

  const sendPaymentHistory = async () => {
    var body = {
      patient_id: user?.data?.id,
      doctor_id: doctor_details[0].doctor_id,
      amount: parseInt(service_charge) + parseInt(doctor_details[0].fees),
    };
    console.log(
      'body==',
      user?.data?.id,
      doctor_details[0].doctor_id,
      parseInt(service_charge) + parseInt(doctor_details[0].fees),
    );
    let result = await postData('patientpayment', body);
    if (result?.success) {
      successToast('Payment Done');
    }
  };

  const makePayment = () => {
   
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_l9rWfaKjGexwH4', // Your api key
      amount: (parseInt(service_charge) + parseInt(doctor_details[0].fees)) * 100,
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
      amount: (parseInt(service_charge)) * 100,
      name: user?.data?.name,
      prefill: {
        email: user?.data?.email,
        contact: user?.data?.phonenumber,
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };

    RazorpayCheckout.open(options)
      .then(data =>{
        // handle success
       
       // sendPaymentHistory();
        alert(`Success: ${data.razorpay_payment_id}`);
       // bookAppointment(null,servicecharge);
      })
      .catch(error => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const bookAppointment = async (payment,service_charge) => {
  
   setLoading(true)
    const body = {
      doctor_id: doctor_id,

      category:category,
      patient_name: patient_name,
      age:age,

      weight:weight,
      weighttype: weighttype,
      gender:gender,
      mobile: mobile,
      status: status,
      create_date: create_date,
      shift_name: shift_name,
      payment:doctor_details[0].feeconsultation == 1 ? doctor_details[0].fees : service_charge,
      service_charge:service_charge,
    
    };
  console.log('body==',body)
    const result = await postData('createappointment', body);
    console.log('res==', result);
    if (result.success) {
      //  setShowModal(true);
      // setModalData(result.data);
      // getAge(result.data?.age);
      // setDoctorName(result?.doctorname);
      setLoading(false)
      successToast('Appointment Successfuly Created');
      {doctor_details[0].feeconsultation == 1 ?
      
      makePayment():
      payServiceCharge()
      
      }
      navigation.navigate('Home1')
    }
    else {
      errorToast(result.message);
    }
  }
  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text style={styles.heading_top}>
          Kindly Make the payment to book your appointment with
          <Text style={{fontFamily: Fonts.primaryBold}}>
            {' '}
            Dr. {doctor_details[0].name}
          </Text>{' '}
          ({doctor_details[0].specialization}) for the date{' '}
          <Text style={{fontFamily: Fonts.primaryBold}}>{create_date}.</Text>
        </Text>
        <Text style={styles.heading_details}>Payment Details :</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={styles.payment_details_sub_heading_style}>
            Service Charges :
          </Text>
          <Text style={styles.payment_details_sub_heading_style}>{service_charge} Rs.</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.payment_details_sub_heading_style}>
              Doctor's Fee :
            </Text>
          </View>
          <View style={{width: '40%'}}>
            <Text style={styles.payment_details_sub_heading_style}>
              {doctor_details[0].feeconsultation == 0 ? (
                <Text style={styles.offline_fees_style}>
                  This Doctor Doesn’t accept online payments. Pay{' '}
                  <Text style={{fontFamily: Fonts.primaryBold}}>FEE</Text> at
                  clinic
                </Text>
              ) : (
                <Text style={{}}>{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '} {doctor_details[0].fees} Rs. </Text>
              )}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 35,
          }}>
          <Text style={styles.payment_details_sub_heading_style}>Total :</Text>
          {doctor_details[0].feeconsultation == 1 ?
          <Text style={styles.payment_details_sub_heading_style}>
       {doctor_details[0].fees} + {parseInt(service_charge)}   ={' '}
            {parseInt(service_charge) + parseInt(doctor_details[0].fees)} Rs
          </Text> :
          <Text style={styles.payment_details_sub_heading_style}>
          {service_charge}  ={' '}
            {service_charge}
          </Text>
}
        </View>

        <Text
          style={{
            paddingTop: 50,
            fontFamily: Fonts.primaryBold,
            color: Color.black,
            fontSize: 12,
          }}>
          Service Charge is not refundable . You can only reschedule your
          appointment, for another session/day for a single time.
        </Text>
      </View>
     {/* {doctor_details[0].feeconsultation == 1 &&
      <View style={{paddingHorizontal:20,marginTop:20}}>
          <Text style={styles.label}>Choose Payment Type</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <TouchableOpacity
             onPress={() => setPaymentType('Complete')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  paymentType == 'Complete' ? `${PRIMARY_COLOR}50` : '#aaaaaa50',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
                Complete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaymentType('ServiceCharge')}
              style={{
                ...styles.radioStyle,
                backgroundColor:
                  paymentType == 'ServiceCharge' ? `${PRIMARY_COLOR}50` : '#aaaaaa50',
                marginLeft: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: Fonts.primaryRegular,
                  lineHeight: 14 * 1.5,
                }}>
               ServiceCharge
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      } */}
      <View
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        {doctor_details[0].feeconsultation == 1 ? (
          <Button
            uppercase={false}
            style={{
              backgroundColor: Color.black,
              marginTop: 25,
              marginBottom: 10,
            }}
            contentStyle={{
              height: 55,
              alignItems: 'center',
              paddingHorizontal: 50,
            }}
            dark
            // loading={loading}
            mode="contained"
          
          //  onPress={() => {paymentType == 'Complete' ? makePayment() : payServiceCharge()}} 

          onPress={() =>bookAppointment()} 
          
            >
            Make Payment
          </Button>
        ) : (
          <Button
            uppercase={false}
            style={{
              backgroundColor: Color.black,
              marginTop: 25,
              marginBottom: 10,
            }}
            contentStyle={{
              height: 55,
              alignItems: 'center',
              paddingHorizontal: 50,
            }}
            dark
            // loading={loading}
            mode="contained"
            onPress={() =>bookAppointment()} >
            PayServiceCharge
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  heading_top: {
    fontSize: 20,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
  },
  heading_details: {
    fontSize: 20,
    fontFamily: Fonts.primaryBold,
    color: Color.black,
    paddingTop: 15,
  },
  payment_details_sub_heading_style: {
    fontSize: 20,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
  },
  offline_fees_style: {
    fontSize: 12,
    fontFamily: Fonts.primaryRegular,
    color: Color.black,
    paddingTop: 20,
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
