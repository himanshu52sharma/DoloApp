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
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DoctorCard({item, onPress}) {
  console.log('carddata-->', item);
  return (
    <View style={styles.listItem}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>
          <Image
            style={styles.listImage}
            source={{
              uri: item.profileimage
                ? `data:image/png;base64,${item.profileimage}`
                : 'https://www.w3schools.com/w3images/avatar6.png',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            {[1, 2, 3, 4, 5].map(count => {
              return (
                <MaterialCommunityIcons
                  name="star"
                  size={20}
                  color={count <= item.avg_rating ? 'orange' : 'grey'}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.listItemText}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
             
            <Text style={styles.listItemTitle}>Dr. {item.name}</Text>
        
            {item?.doctor_available == 1 ? (
              <Octicons
                name="dot-fill"
                color={Color.green}
                size={20}
                style={{marginLeft: 5}}
              />
            ) : null}
          </View>
          {item?.specialization && (
          <Text style={styles.listItemSubTitle}>{item.specialization}</Text>
          )}
          {/* <Text style={styles.listItemSubTitle}>10 years experience</Text> */}
          {item?.distance  && (
            // <Text style={styles.listItemSubTitle}>{item?.distance.toString().slice(0,-12)} Km away</Text>
            <Text style={styles.listItemSubTitle}>
              {item?.distance} Km away
            </Text>
          )}

          {/* <View style={{flexDirection:'row',marginLeft:-8}}>
          <MaterialCommunityIcons
            name="map-marker"
            size={25}
            color={Color.red}/>
                        
          <Text style={styles.location_style}>{item.location}</Text>
          </View> */}
          <View style={{alignItems: 'center', marginTop: 5}}>
            {/* {item.status == '0' && (
          <Text
            style={{
              color: Color.red,
              fontFamily: Fonts.primarySemiBold,
            }}>
            Pending
          </Text>
        )} */}

            <Button
              style={{
                backgroundColor: Color.black,
                // marginTop: 5,
                marginBottom: 10,
                //  borderRadius:10,
                //  width:Dimensions.get('window').width-120,
              }}
              contentStyle={{
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{fontSize: 15, fontFamily: Fonts.primarySemiBold}}
              uppercase={false}
              dark
              // loading={loading}
              mode="contained"
              onPress={onPress}>
              Book Appointment
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 10,
    elevation: 8,
  },
  listImage: {
    height: 100,
    width: 100,
    borderRadius: 15,
    marginRight: 15,
  },
  listItemText: {
    // justifyContent: 'space-evenly',

    alignItems: 'flex-start',
  },
  listItemTitle: {
    fontSize: 16,
    color: Color.black,
    // fontWeight: '700',
    fontFamily: Fonts.primaryBold,
  },
  listItemSubTitle: {
    fontSize: 14,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
  },
  location_style: {
    fontSize: 14,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    flex: 1,
  },
});
