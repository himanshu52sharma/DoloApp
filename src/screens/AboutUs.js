import { StyleSheet, Text, View, SafeAreaView, ScrollView,BackHandler,Alert,TouchableOpacity,Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import Color from '../assets/utilis/Color'
import Fonts from '../theme/Fonts'
import { getData } from '../API'
import HTML from 'react-native-render-html'
import { CommonActions } from '@react-navigation/native';

const AboutUs = ({navigation}) => {

  const [about,setAbout] = React.useState([]);

const fetchAboutusContent = async()=>{ 

  const res = await getData('about_us');
     console.log('res',res);
  // if(res?.success){
    setAbout(res?.data?.aboutcontent)

  // }
}

 console.log('about',about);
// React.useEffect(() => {
//   fetchAboutusContent()
// }, [])

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    fetchAboutusContent()
  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [navigation]);

// const onBackPress = () => {
//   navigation.dispatch(
//     CommonActions.reset({
//        index: 0,
//        routes: [{name: 'SearchDoctor'}],
//     })
//   );
//   }

// React.useEffect(
//   React.useCallback(() => {
//     const onBackPress = () => {
//       navigation.navigate('Home1');
//       return true;
//     };

//     BackHandler.addEventListener('hardwareBackPress', onBackPress);

//     return () =>
//     BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//   }, []),
// );

const onBackPress = () => {
  navigation.goBack();
  return true;
};

React.useEffect(() => {
  
  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
  }
}, []);

return (
    <SafeAreaView style={styles.main_container}>
      {/* <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>About us</Text>
      </View> */}
        <ScrollView contentContainerStyle={{paddingBottom:30}} showsVerticalScrollIndicator={false}>
    <View style={{marginTop:20,paddingHorizontal:20}}>
   
{about &&
<HTML source={{html:about}} />
}
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default AboutUs

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
      main_heading:{
     fontSize:20,
     fontFamily:Fonts.primaryBold,
     color:Color.black
      },
      txt_style:{
        fontSize:15,
        fontFamily:Fonts.primarySemiBold,
        color:Color.black
      },
})