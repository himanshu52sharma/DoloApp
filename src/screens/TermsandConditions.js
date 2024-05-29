import { SafeAreaView, ScrollView, StyleSheet, Text, View,BackHandler } from 'react-native'
import React from 'react'
import HTML from 'react-native-render-html'
import Color from '../assets/utilis/Color';
import { getData } from '../API';

const TermsandConditions = ({navigation}) => {
  const [terms,setTerms] = React.useState([]);
  const fetchTermsAndConditions = async()=>{
  
    const res = await getData('terms_condition');
  
    // if(res.success){
      setTerms(res?.data.contents)
 
    // }
  
  
  }
  
  React.useEffect(() => {
    fetchTermsAndConditions()
  }, [])


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
    <ScrollView contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
    <View style={{paddingHorizontal:20,marginTop:10}}>
    <HTML source={{html: terms}} />
    </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default TermsandConditions

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
})