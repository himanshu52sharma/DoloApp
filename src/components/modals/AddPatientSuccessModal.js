import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {Color, Dimension, Fonts} from '../../theme';
// import {useTheme} from 'react-native-paper';

const {width, height} = Dimension.window;

export default function AddpatientSuccessModal(props) {
  //   const {Color} = useTheme();

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      transparent
      onRequestClose={props.onRequestClose}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor:'#fdf8db',borderColor:'#c8c5b0',borderWidth:2}]}>
          {/* <Text
            style={[
              styles.modalText,
              {
                color: Color.black,
              },
            ]}>
            {props.title}
          </Text> */}
          {/* <AnimatedLottieView
            source={require('../../assets/animations/success.json')}
            style={{width: 130, height: 130}}
            autoPlay
            loop={false}
          /> */}
          <Text style={{fontFamily:Fonts.primaryLight,color:Color.black,paddingBottom:10}}>Dr. {props.doctor_name}</Text>
          <View style={styles.card}>
            
         <Text style={styles.token_no}>{props.token_no}</Text>
         <Text style={styles.token_no_txt}>TOKEN NO.</Text>
          </View>
          <View style={styles.details_container}>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:8,justifyContent:'space-between',}}>
          <Text style={styles.title}>Category</Text>
          <Text style={styles.title2}>:</Text>
          <Text style={styles.descr}>{props.category}</Text>
          
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:8,justifyContent:'space-between',}}>
          <Text style={styles.title}>Name    </Text>
          <Text style={styles.title2}>:</Text>
          <Text style={styles.descr}>{props.patient_name}</Text>
          
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:8,justifyContent:'space-between',}}>
          <Text style={styles.title}>Age</Text>
          <Text style={styles.title2}>:</Text>
          <Text style={styles.descr}>{props.age} Years</Text>
          
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:8,justifyContent:'space-between',}}>
          <Text style={styles.title}>Weight</Text>
          <Text style={styles.title2}>:</Text>
          <Text style={styles.descr}>{props.weight} {props.weightType}</Text>
          
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:8,justifyContent:'space-between',}}>
          <Text style={styles.title}>Gender</Text>
          <Text style={styles.title2}>:</Text>
          <Text style={styles.descr}>{props.gender}</Text>
          
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:8,justifyContent:'space-between',}}>
          <Text style={styles.title}>Time</Text>
          <Text style={styles.title2}>:</Text>
          <Text style={styles.descr}>{props.time}</Text>
          
          </View>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',width:'85%',justifyContent:'space-between',alignSelf:'center'}}>
          <Pressable
            style={[styles.close_button, {backgroundColor: '#eda4a7'}]}
            onPress={props.onPrimaryPress}>
            <Text style={[styles.textStyle]}>CLOSE</Text>
          </Pressable>
          <Pressable
            style={[styles.print_button, {backgroundColor: '#9fe7ff'}]}
            onPress={props.onPrintPress}>
            <Text style={[styles.textStyle]}>PRINT</Text>
          </Pressable>
          </View>
          <Pressable
            style={[styles.button, {backgroundColor: Color.greenlight,borderWidth:1,borderColor:Color.black,marginTop:10}]}
            onPress={props.onSecondaryPress}>
            <Text style={[styles.textStyle]}>{props.primaryBtnText}</Text>
          </Pressable>
       
          {/* <Pressable
            style={[styles.button, {backgroundColor: Color.gray}]}
            onPress={props.onSecondaryPress}>
            <Text style={[styles.textStyle]}>{props.secondaryBtnText}</Text>
          </Pressable> */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 25,
    padding: 25,
   // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginVertical:5,
    elevation: 2,
    width: width * 0.7,
  },
  close_button:{
    borderRadius: 10,
    padding: 10,
    marginVertical:5,
    elevation: 2,
    width: width * 0.3,
    borderWidth:1,
    borderColor:Color.black
   
  },
  print_button:{
    borderRadius: 10,
    padding: 10,
    marginVertical:5,
    elevation: 2,
    width: width * 0.3,
    borderWidth:1,
    borderColor:Color.black
  },
  textStyle: {
    color: Color.black,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  card:{
    paddingTop:10,
   
   //paddingHorizontal:10,
    borderRadius:20,
    borderWidth:1,
    borderColor:Color.black,
    width:width*0.4,
    alignSelf:'center',
  },
  token_no:{
fontSize:45,
fontFamily:Fonts.primaryBold,
color:Color.black,
textAlign:'center'
  },
  token_no_txt:{
    fontSize:15,
    fontFamily:Fonts.primaryRegular,
    color:Color.black ,
    textAlign:'center'
  },
  title:{
    fontSize:15,
    fontFamily:Fonts.primaryRegular,
    color:Color.black,
   // textAlign:'center',
    width:'28%'
  },
  title2:{
    fontSize:15,
    fontFamily:Fonts.primaryRegular,
    color:Color.black,
    textAlign:'center',
    width:'28%'
  },
  descr:{
    fontSize:15,
    fontFamily:Fonts.primarySemiBold,
    color:Color.black ,
    textAlign:'auto',
    width:'50%'
  },
  details_container:{
 alignSelf:'center',
   width:width*0.7
  }
});
