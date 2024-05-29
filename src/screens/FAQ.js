import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  BackHandler,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React from 'react';
import Color from '../assets/utilis/Color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../theme/Fonts';
import HTML from 'react-native-render-html';
import {getData} from '../API';
const FAQ = ({navigation}) => {
  const [faq, setfaq] = React.useState('');

  const fetchFaqContent = async () => {
    const res = await getData('faqs');

    // if (res.success) {
      setfaq(res?.data);
    // }
  };

     console.log('faq',faq);
  React.useEffect(() => {
    fetchFaqContent();
  }, []);

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
       {/* <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>FAQ</Text>
      </View> */}
      <ScrollView
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <HTML source={{html: faq?.contents}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQ;

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
  main_heading: {
    fontSize: 20,
    fontFamily: Fonts.primaryBold,
    color: Color.black,
  },
  txt_style: {
    fontSize: 15,
    fontFamily: Fonts.primarySemiBold,
    color: Color.black,
    paddingTop: 10,
  },
});
