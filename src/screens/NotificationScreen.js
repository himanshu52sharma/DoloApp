import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  BackHandler
} from 'react-native';
import React, {useEffect} from 'react';
import AntIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../assets/utilis/Color';
import { getData, postData } from '../API';
import { useSelector } from 'react-redux';

const NotificationScreen = ({navigation}) => {
  const [notificationList, setNotificationList] = React.useState([]);

  const user = useSelector(state => state.user);

  const getNotificationList = async () => {
    const res = await getData('notificationlist/6');

    if (res.success) {
      setNotificationList(res?.data);
      console.log('notificationlist---->',res?.data);
     }
  };

  useEffect(() => {
    getNotificationList();
    updateNotificationCount();
  }, []);

 const updateNotificationCount = async() =>{
    let body={
      user_id: user?.data?.id,
     }
    const res = await postData('notificationupdate',body)
    console.log('RES=',res)
     }


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
    <ScrollView style={{backgroundColor: Color.primary}}>
      <View style={{paddingHorizontal:8}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <Text style={{color: '#000', fontSize: 25, fontWeight: '600'}}>
            Notifications({notificationList.length})
          </Text>
          {/* <Text
            style={{
              color: '#1e90ff',
              fontSize: 15,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            Marks all read
          </Text> */}
        </View>

        <FlatList
          keyExtractor={(item, index) => `key-${index}`}
          nestedScrollEnabled={true}
          data={notificationList}
          renderItem={({item, index}) => (
            <View style={styles.noti_container}>
              <View style={{padding:10, flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <Text style={{color: '#000', fontSize: 15}}>
                  {item.message}
                  </Text>
                  <Text style={{color: Color.red, fontSize: 12,alignSelf:'flex-end'}}>
                   {item.created_at}
                  </Text>
                </View>
              </View>
            </View>
            
          )}
        />
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;
const styles = StyleSheet.create({
  InputField: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500',
    padding: 2,
  },
  Rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: {
    backgroundColor: 'white',
    padding: 6,
    borderWidth: 1,
    marginTop: 10,
  },
  noti_container:{
    borderRadius:5,
    marginTop: 7,
    backgroundColor:Color.white,
    elevation: 20,

    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5.84,
    //backgroundColor: '#25CCF7',
    shadowColor: Color.white,

  }
});
