
import React,{ useEffect } from 'react';
import { View, Text,Image,StyleSheet,StatusBar,Dimensions } from 'react-native';

import { BLUE, LIGHT_YELLOW, MAGENTA, WHITE,PRIMARY_COLOR, BLACK } from '../constant/Colors';
import { LOGIN_SCREEN, ONBOARDING, REGISTER_SCREEN } from '../constant/Screens';


const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout( () => {
          navigation.replace(ONBOARDING); 
        }, 3000);
    },[]);
    return (
        <View style={styles.main__container}>
         <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={BLACK}
          style="light"
        />
            <Image source={require('../assets/images/splash.png')} style={styles.img_styles}/>
        </View>
    );
};

export default SplashScreen;
const styles= StyleSheet.create({
main__container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:WHITE
},
img_styles: {
height: Dimensions.get('window').height/2 ,
width: Dimensions.get('window').width,
resizeMode: 'cover',
}
});
