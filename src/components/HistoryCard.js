import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Color from '../assets/utilis/Color';
import Fonts from '../theme/Fonts';
import {Button} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HistoryCard({item, onPress,showModal,loading,bgColor}) {
 
 
  return (
    <View
      style={{
        width: Dimensions.get('window').width - 40,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 20,
        borderRadius: 12,
        backgroundColor:bgColor
      }}>
      <View style={styles.info_container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingTop: 15,
          }}>
          <View style={styles.status_container}>
            <Text style={styles.status_txt_style}>
              {item?.status == '2' ? 'COMPLETED' : 'ABSENT'}
            </Text>
          </View>
          <View style={styles.date_time_container}>
            <Text style={styles.status_txt_style}>{item?.create_date}</Text>
          </View>
        </View>
        <View
          style={{borderBottomWidth: 1, borderBottomColor: Color.white}}></View>
        <View style={styles.doctor_container}>
          <Text style={styles.doc_name_style}>Dr. {item?.doctorname}</Text>
          <Text style={styles.doctor_specialization_style}>{item?.specialization}</Text>
        </View>
        <View
          style={{borderBottomWidth: 1, borderBottomColor: Color.white}}></View>
        <View style={styles.doctor_container}>
          <Text style={styles.doc_name_style}>
            <Text style={{fontSize: 10}}>Patient Name{'   '}</Text>
            {item?.patientname}
          </Text>
          {item.status !== 2 && item.status !== 0 &&  item.reschedule_status !== 1 && (
            <Text style={styles.doctor_specialization_style}>
              You can reschedule your appointment
            </Text>
          )}
        </View>
        <View
          style={{borderBottomWidth: 1, borderBottomColor: Color.white}}></View>
      </View>

      <View style={styles.Buttons_container}>
        <Button
          labelStyle={{fontSize: 12}}
          style={{
            backgroundColor: Color.black,
            marginTop: 25,
            marginBottom: 10,
            borderRadius: 10,
          }}
          contentStyle={{height: 35, alignItems: 'center'}}
          dark
          mode="contained"
          onPress={onPress}>
          View Details
        </Button>
        {(item.status !== 2 && item.status !== 0 && item.reschedule_status !== 1) ? (
          <Button
           loading={loading}
            labelStyle={{fontSize: 12}}
            style={{
              backgroundColor: Color.black,
              marginTop: 25,
              marginBottom: 10,
              borderRadius: 10,
            }}
            contentStyle={{height: 35, alignItems: 'center'}}
            dark
            mode="contained"
            onPress={showModal}
           >
            Reschedule
          </Button>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 20,
    borderRadius: 12,
},
  info_container: {
    //   flexDirection:'row',
    //   justifyContent:'space-between'
    // alignItems:'center'
  },
  status_txt_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 12,
    color: Color.white,
  },
  doctor_container: {
    paddingTop: 5,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  doc_name_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 15,
    color: Color.white,
  },
  doctor_specialization_style: {
    fontFamily: Fonts.primarySemiBold,
    fontSize: 10,
    color: Color.white,
  },
  Buttons_container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
 
});
