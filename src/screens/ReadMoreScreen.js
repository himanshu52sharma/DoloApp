import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  Image,
  Dimensions,
  
} from 'react-native';
import React from 'react';
import Color from '../assets/utilis/Color';
import {getData} from '../API';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../theme/Fonts';
import ImageModal from 'react-native-image-modal';
import { Modal } from 'react-native';
import { useState } from 'react';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';

const ReadMoreScreen = ({navigation, route}) => {
  const [details, setDetails] = React.useState([]);
  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const {announcementId} = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };
  const getAnnouncementDetail = async () => {
    const res = await getData('annoucemnetlist');
    console.log('annoucemnetlist---->', res?.data);
    if (res.success) {
      const filterData = res.data.filter(item => item.id == announcementId);

      setDetails(filterData);
    }
  };

  React.useEffect(() => {
    getAnnouncementDetail();
  }, [announcementId]);

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
  const scale = useSharedValue(1);
  const panX = useSharedValue(0);
  const panY = useSharedValue(0);

  const pinchGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
      panX.value = event.translationX;
      panY.value = event.translationY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
      panX.value = withTiming(0);
      panY.value = withTiming(0);
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: panX.value },
        { translateY: panY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Announcement Details</Text>
      </View>
      <View style={styles.details_container}>
        <FlatList
          keyExtractor={(item, index) => `key-${index}`}
          nestedScrollEnabled={true}
          data={details}
          renderItem={({item, index}) => (
            <View style={{marginVertical: 10, alignSelf: 'center',alignItems:'center',justifyContent:'center'}}>
              {/* <ImageModal
                modalImageResizeMode="contain"
                resizeMode="contain"
                modalImageStyle={{
                  height: 200,
                  width: 317,
                  borderRadius: 12,
                 // resizeMode: 'contain',
                }}
                source={{
                  uri: `https://rapidhealth.me/public/assets/adminannoucementimage/${item.annoucement_image}`,
                }}
                style={{
                  height: 180,
                  width: 300,
                  borderRadius: 12,
                  alignSelf:'center',
                  // marginLeft:width*0.08
                 // resizeMode: 'contain',
                }}
              /> */}
              <View style={styles.container}>
      <TouchableOpacity onPress={handleModalToggle}>
        <Image 
        source={{
                  uri: `https://rapidhealth.me/public/assets/adminannoucementimage/${item.annoucement_image}`,
                }}
        style={styles.thumbnail} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} onRequestClose={handleModalToggle}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => handleModalToggle()}>
          <MaterialCommunityIcons
            name="close"
            size={32}
            color={Color.white}
          />
        </TouchableOpacity>
        <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
          <Animated.View style={[styles.imageContainer, imageStyle]}>
            <Image 
            source={{
                  uri: `https://rapidhealth.me/public/assets/adminannoucementimage/${item.annoucement_image}`,
                }} 
            style={styles.image} />
          </Animated.View>
        </PinchGestureHandler>
      </View>
    </Modal>
    </View>
              <Text style={styles.announcement_txt_style}>{item.message}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReadMoreScreen;
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#111'
    // 'rgba(0, 0, 0, 0.7)',
  },
  thumbnail: {
    width:width*0.85,
    height: 180,
  },
  imageContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

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
  details_container: {
    marginTop: 10,
  },
  announcement_txt_style: {
    fontFamily: Fonts.primaryRegular,
    color: Color.black,

    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 17,
    paddingHorizontal: 10,
    flex: 1,
  },
});
