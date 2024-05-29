import { StyleSheet, Text, View,ImageBackground,Dimensions } from 'react-native'
import React, {useState} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import { BLACK, PRIMARY_COLOR } from '../constant/Colors';

const BannerSlider = () => {
    const [images, setimages] = useState([
        {src: require('../assets/images/doctor1.png'), key: '1'},
        {src: require('../assets/images/doctor2.png'), key: '2'},
        {src: require('../assets/images/doctor3.png'), key: '3'},
      ]);

      const _renderItem = ({item}) => (
        <ImageBackground
          // imageStyle={{borderRadius: 13}}
          value={item}
          key={item}
          source={item.src}
          style={{
            height: 249,
            width: Dimensions.get('window').width - 18,
            borderRadius: 13,
          }}></ImageBackground>
      );



    return (
    <View style={styles.slider_container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={4}
          autoplayLoop
          index={0}
          showPagination
          paginationStyleItem={{width: 6, height: 6, marginTop: 9}}
          paginationDefaultColor={BLACK}
          paginationActiveColor={PRIMARY_COLOR}
          data={images}
          renderItem={_renderItem}
        />
      </View>
  )
}

export default BannerSlider

const styles = StyleSheet.create({
    slider_container: {
        height: 249,
    
        width: Dimensions.get('window').width - 18,
        alignSelf: 'center',
      },
})