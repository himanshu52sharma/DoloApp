import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import {
    BLACK,
    GRAY,
    GRAY2,
    LIGHT_GRAY,
    LIGHT_GRAY2,
    PRIMARY_COLOR,
    WHITE,
  } from '../constant/Colors';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Fonts from '../theme/Fonts';
  import {TouchableOpacity} from 'react-native-gesture-handler';
  import Fontisto from 'react-native-vector-icons/Fontisto';

const SearchBox = ({onChangeText,value,placeholder}) => {
  return (
    <View style={styles.search_container}>
    <View style={styles.search_box_style}>
      
      <TextInput
        placeholder={placeholder}
        style={styles.search_input_style}
        placeholderTextColor={GRAY2}
         onChangeText={onChangeText}
         value={value}
      />
      <Ionicons
        name={'ios-search'}
        color={PRIMARY_COLOR}
        size={30}
        style={
          {
            // paddingHorizontal: 15,
          }
        }
      />
    </View>
  </View>
  )
}

export default SearchBox

const styles = StyleSheet.create({
    search_container: {marginTop: 10, paddingHorizontal: 20},
    search_box_style: {
      paddingHorizontal: 20,
      paddingVertical:5,
      borderRadius: 5,
      borderColor: PRIMARY_COLOR,
      borderWidth: 1.5,
      alignSelf: 'center',
      paddingLeft: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:`#e6e6fa60`
    },
    search_icon_style: {height: 15, width: 15},
    search_input_style: {
      width: '95%',
      paddingVertical:3,
      marginLeft: 10,
      alignSelf: 'flex-end',
      color: BLACK,
      fontSize: 20,
      fontWeight: '500',
      fontFamily: Fonts.primaryRegular,
      
    },



})