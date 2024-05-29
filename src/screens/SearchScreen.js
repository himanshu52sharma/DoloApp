import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  BackHandler
} from 'react-native';
import React from 'react';
import Color from '../assets/utilis/Color';
import {Searchbar} from 'react-native-paper';
import Fonts from '../theme/Fonts';
import Dimension from '../theme/Dimension';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData, postData } from '../API';
const {width, height} = Dimension.window;
const SearchScreen = ({navigation}) => {
  const [searchType, setSearchType] = React.useState('Name');
  const [docList, setDocList] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

  const searchDoctorsByName = async(txt) => {
  console.log('searchText==>>>',txt)
 
    let body={
      search_term:txt,
    }
  console.log('body>>>>>>>>>',body);

  const res = await postData(`search_doctor`,body)
  // console.log('res>>>>>>>>>',res);
  if (res.status == "success") {
    setDocList(res?.data)
  }
  else{
    setDocList([])
  }}
  const searchDoctorsByLocation = async(txt) => {
    console.log('searchText2==',txt)
    let body={
      search_term:txt,
    }
    const res = await postData(`search_by_location`,body)
    if (res.status == "success") {
     setDocList(res?.data)
    }
    else{
      setDocList(res?.data)
    }}



    React.useEffect(() => {
      
    setDocList([])
     
    }, [searchType])
    
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
        {/* <View style={{flexDirection: 'row', padding: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={32}
            color={Color.black}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Search Doctor</Text>
      </View> */}
      <View style={styles.middle_container}>
        <View style={{marginTop: 10}}>
          <View
            style={{
              borderBottomColor: '#557297',
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}>
            <Searchbar
              placeholder={'Search Doctor,Clinic'}
              onChangeText={(txt) => searchType == "Name" ? searchDoctorsByName(txt)   : searchDoctorsByLocation(txt)}
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: 5,
                borderColor: '#557297',
                borderWidth: 2,
                height: 45,
              }}
              placeholderTextColor={Color.black}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => setSearchType('Name') && setDocList([])}
            style={{
              ...styles.btn,
              backgroundColor: searchType === 'Name' ? Color.gray : null,
            }}>
            <Text
              style={{
                ...styles.btnText,
                color: searchType === 'Name' ? '#fff' : Color.black,
              }}>
              Name
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSearchType('Location') && setDocList([])}
            style={{
              ...styles.btn,
              backgroundColor: searchType === 'Location' ? Color.gray : null,
            }}>
            <Text
              style={{
                ...styles.btnText,
                color: searchType === 'Location' ? '#fff' : Color.black,
              }}>
              Location
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{paddingBottom:100}} showsVerticalScrollIndicator={false}>
       {docList && docList.map((item) =>{
      return(
      <TouchableOpacity style={styles.search_card} onPress={() =>
                          navigation.navigate('DoctorProfile', {
                            Id: item.doctor_id,
                            appointmentDetails:{},
                            reschedule:false,
                            otherDoctorAppointment:false,
                          })} >
          <View>
            <Image             
              source={{
                uri: item?.profileimage
                  ? `data:image/png;base64,${item?.profileimage}`
                  : 'https://www.w3schools.com/w3images/avatar6.png',
              }}
              style={{height: 40, width: 40, borderRadius: 20}}
            />
          </View>
          <View style={{paddingLeft:8}}>
            <Text style={styles.doctor_name_style}>Dr. {item.name}</Text>
            <Text style={styles.specialization_style}>{item.specialization}</Text>
          </View>
        </TouchableOpacity>
      


      )


       })}
      
      


      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

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
  middle_container: {
    paddingHorizontal: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.gray,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 15,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontFamily: Fonts.primarySemiBold,
    lineHeight: 16 * 1.4,
  },
  search_card: {
    width: width * 0.9,
    paddingHorizontal: 5,
    alignSelf: 'center',
    backgroundColor: Color.white,
    shadowOffset: {width: 10, height: 10},
    shadowColor: Color.black,
    shadowOpacity: 5,
    elevation: 20,
    shadowRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical:5
  },
  doctor_name_style: {
    color: Color.black,
    fontSize: 15,
    fontFamily: Fonts.primarySemiBold,
    lineHeight: 20,
  },
  specialization_style: {
    color: Color.black,
    fontSize: 10,
    fontFamily: Fonts.primarySemiBold,
    lineHeight: 17,
  },
});
