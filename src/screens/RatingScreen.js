import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Color from '../assets/utilis/Color';
import React from 'react';
import Fonts from '../theme/Fonts';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {postData} from '../API';
import {useSelector} from 'react-redux';
import {errorToast, successToast} from '../components/toasts';
const RatingScreen = ({navigation, route}) => {
  const {doctor_data} = route?.params;
  const user = useSelector(state => state.user);

  const [defaultRating, setDefaultRating] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const rateDoctor = async() => {
    setLoading(true);
    let body = {
      patient_id: user?.data?.id,
      doctor_id: doctor_data[0]?.doctor_id,
      rating: defaultRating,
    };

    const result = await  postData('patient_doctor_rating', body);
    console.log('body==', body);
    if (result.Success) {
      console.log('result==', result);
      successToast('Successfully Rated');
      navigation.goBack();
    } else {
      console.log('body==', body);
      errorToast('Book appointment to rate the doctor');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={false}
        backgroundColor={Color.primary}
        style="dark"
      />
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Rate Doctor</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Image
          style={styles.doctorImage}
          source={{
            uri: doctor_data[0]?.profileimage
              ? `data:image/png;base64,${doctor_data[0]?.profileimage}`
              : 'https://www.w3schools.com/w3images/avatar6.png',
          }}
        />

        <Text style={styles.doctor_name_style}>
          Dr. <Text style={{color: Color.black}}>{doctor_data[0]?.name}</Text>
        </Text>
        <Text style={styles.specialization_style}>
          {doctor_data[0]?.specialization}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {[1, 2, 3, 4, 5].map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}>
                <MaterialCommunityIcons
                  name="star"
                  size={28}
                  color={item <= defaultRating ? 'orange' : 'grey'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          uppercase={false}
          style={{
            backgroundColor: Color.black,
            marginTop: 50,
            marginBottom: 10,
            width: Dimensions.get('window').width - 50,
          }}
          labelStyle={{fontSize: 20}}
          contentStyle={{height: 55, alignItems: 'center'}}
          dark
          loading={loading}
          mode="contained"
          onPress={rateDoctor}>
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default RatingScreen;

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
  doctorImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  doctor_name_style: {
    color: Color.red,
    fontFamily: Fonts.primaryBold,
    fontSize: 22,
    lineHeight: 30,
    paddingTop: 15,
  },
  specialization_style: {
    color: Color.black,
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    lineHeight: 15,
  },
});
