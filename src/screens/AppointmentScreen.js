import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch,useSelector } from 'react-redux'

import {Button} from 'react-native-paper';
import React, {useState,useEffect} from 'react';
import {
  BLACK,
  GRAY,
  GRAY2,
  LIGHT_GRAY,
  PRIMARY_COLOR,
  WHITE,
} from '../constant/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../theme/Fonts';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import AppointmnetCard from '../components/AppointmnetCard';




const {width,height}=Dimensions.get('window');

const AppointmentScreen = ({navigation,route}) => {
  const [markedDates, setMarkedDates] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  var vaar;

  const Bookdata=useSelector(state=>state.book)
  // const result=Bookdata.filter(item=>item.selected==true)
  const [nseat,setNSeat]=useState()
const [daly,setDaly]=useState(vaar)

  var price=0;

  const [refresh,setRefresh]=useState(false)
  const [slotprice,setSlotPrice]=useState(price.toString())
  // const [uxdata,setUxdata]=useState(result)
  
var item=null;
if (route.params !== undefined) {
  item = route?.params?.item;
}

const [drdata,setDrdata]=useState(item);

const handlePrice=(value)=>{
  setNSeat(value)
  price=parseInt(nseat)*(500)
setSlotPrice(price)
// console.log(">>>slotprice",slotprice,price)

}



useEffect(()=>{
 

// fetchRedux()
handlePrice()
setRefresh(!refresh)




},[])







  //let startDate = moment(); // today

  // Create a week's worth of custom date styles and marked dates.
  //let customDatesStyles = [];
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  // let markedDates = [];
  for (let i = 0; i < 7; i++) {
    let date = startDate.clone().add(i, 'days');

    customDatesStyles.push({
      startDate: date, // Single date since no endDate provided
      dateNameStyle: {color: 'blue'},
      dateNumberStyle: {color: 'purple'},
      highlightDateNameStyle: {color: 'pink'},
      highlightDateNumberStyle: {color: 'yellow'},
      // Random color...
      dateContainerStyle: {
        backgroundColor: `#${`#00000${(
          (Math.random() * (1 << 24)) |
          0
        ).toString(16)}`.slice(-6)}`,
      },
    });

    let dots = [];
    let lines = [];

    if (i % 2) {
      lines.push({
        color: 'cyan',
        selectedColor: 'orange',
      });
    } else {
      dots.push({
        color: 'red',
        selectedColor: 'yellow',
      });
    }
    markedDates.push({
      date,
      dots,
      lines,
    });
  }

  //  state = {

  //     selectedDate: undefined,
  //     customDatesStyles,
  //     markedDates,
  //     startDate,
  //   };
  const [selectedDate, setSelectedDate] = useState( new Date().toLocaleDateString('en-CA'),);

  const [formattedDate, setFormattedDate] = useState('');

  // const datesBlacklistFunc = date => {
  //   return date.isoWeekday() === 6; // disable Saturdays
  // }

  const onDateSelected =( selectedDate) => {


    setSelectedDate(selectedDate);


    const formattedDate = selectedDate.format('YYYY-MM-DD');
    setFormattedDate(formattedDate);



    const dayOfWeek = new Date(formattedDate).getDay();
    
   dayWeek(dayOfWeek)
  

  

// console.log('hello')
    
  

  };


function dayWeek(dayOfWeek){
  // alert(dayOfWeek)
let Weekday= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// if(dayOfWeek!==null){
// return Weekday[dayOfWeek] }

if(dayOfWeek==null){
  const defaultday = new Date().getDay();
 vaar=Weekday[defaultday]

  setDaly(Weekday[defaultday])
  console.log("defaultday???",vaar)
}
else{
  vaar=Weekday[dayOfWeek]
  setDaly(Weekday[dayOfWeek])
  console.log("selectday???",vaar)

}

// alert(vaar)



}



  const setSelectedDateNextWeek = date => {
    const selectedDate = moment(selectedDate).add(1, 'week');
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    setSelectedDate(selectedDate);
    setFormattedDate(formattedDate);

  };

  const setSelectedDatePrevWeek = date => {
    const selectedDate = moment(selectedDate).subtract(1, 'week');
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    setSelectedDate(selectedDate);
    setFormattedDate(formattedDate);
  };

  const datesBlacklistFunc = date => {
    return date.isoWeekday() === 7; // disable Sundays
  };




useEffect(()=>{
  dayWeek()


},[])







  return (
    <SafeAreaView style={styles.main_container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={PRIMARY_COLOR}
        style="light"
      />
      <View style={styles.header_style}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name="arrowleft"
            size={30}
            color={BLACK}
            style={{marginRight: 5}}
          />
        </TouchableOpacity>
        <Text style={styles.heading_style}>Time Slots</Text>
      </View>

      <View style={styles.profile_container}>
        <View style={styles.profile_img_container}>
          <Image
            source={{
              uri: 'https://www.w3schools.com/w3images/avatar6.png',
            }}
            style={styles.profile_img_style}
          />
        </View>
        <View>
          <Text style={styles.name_style}> Aman Mishra</Text>
          <Text style={styles.symptom_style}>Heart</Text>
          <Text style={styles.exp_style}> 5 Year Experience</Text>
          <Text style={styles.fees_style}> 500</Text>
        </View>
      </View>




      {/* datepicker */}
      <View style={{borderBottomColor: LIGHT_GRAY, borderBottomWidth: 1}}>
        <CalendarStrip
           calendarAnimation={{type: 'sequence', duration: 30}}
          // daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
          style={{height: 100, paddingTop: 10, paddingBottom: 10}}
          calendarHeaderStyle={{color: BLACK,fontSize:18,fontFamily: Fonts.primaryRegular}}
          // calendarColor={'#3343CE'}
          calendarColor={WHITE}
          dateNumberStyle={{color: BLACK,fontFamily: Fonts.primaryRegular}}
          dateNameStyle={{color: BLACK,fontFamily: Fonts.primaryBold}}
          iconContainer={{flex: 0.1}}
          // customDatesStyles={customDatesStyles}
          highlightDateNameStyle={{color: 'white'}}
          highlightDateNumberStyle={{color: 'yellow'}}
          highlightDateContainerStyle={{backgroundColor: PRIMARY_COLOR}}
          // markedDates={markedDates}
          // datesBlacklist={datesBlacklistFunc}
          selectedDate={selectedDate}
          onDateSelected={onDateSelected}
          useIsoWeekday={false}
          scrollable={true}
          key={'#'}
          minDate={new Date()}
        />
      </View>
     {/* datepicker */}







      {/* <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}> */}
        <AppointmnetCard
          data={drdata}
          img_source={{uri:'https://cdn-icons-png.flaticon.com/512/833/833593.png'}}
          // no_of_slots={8}
          onPress={(value)=>handlePrice(value)}
          daily={daly}
          booking={formattedDate}
        />

        
             {/* </ScrollView> */}


      {/* <View style={styles.bottomtab}>
          <View style={styles.lefttab}>

            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <MaterialCommunityIcons name="car-seat" color={'#dfe6e9'} size={26} />
            <Text style={[styles.tabtext,{color:'#b2bec3',paddingLeft:2}]}>No. of Seat:</Text>
            <Text style={[styles.tabtext,{fontSize:23}]}>
          
            {nseat}
            </Text>

            </View>
          


<View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
<MaterialCommunityIcons name="cash-multiple" color={'#dfe6e9'} size={26} />
<Text style={[styles.tabtext,{color:'#b2bec3',paddingLeft:5}]}>Price:</Text>
<Text style={[styles.tabtext,{fontSize:23}]}>
&#x20b9;{slotprice}            
            </Text>

</View>
          </View>

          <View style={styles.righttab}>
          <Button
            style={{
              backgroundColor: '#fc5c65',
              marginTop:12,
              marginBottom: 10,
              width:135,
              borderRadius:12,
              justifyContent:'center',
              alignItems:'center',
              
              marginLeft:39
            }}
            contentStyle={{height: 55, alignItems:'center',justifyContent:'center',marginLeft:0,fontWeight:'800'}}
            dark
            // loading={loading}
            mode="contained"
            >
Book</Button></View>

        </View> */}
    </SafeAreaView>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header_style: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 20,
    marginTop: 20,
  },
  heading_style: {
    color: BLACK,
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: Fonts.primaryBold,
  },
  profile_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  profile_img_container: {},
  profile_img_style: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: WHITE,
    borderColor: PRIMARY_COLOR,
  },
  name_style: {
    color: BLACK,
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: Fonts.primaryBold,
    lineHeight: 21,
  },
  symptom_style: {
    color: BLACK,
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: Fonts.primaryRegular,
    // lineHeight:21,
    paddingTop: 3,
  },
  exp_style: {
    color: PRIMARY_COLOR,
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: Fonts.primaryRegular,
    lineHeight: 21,
    paddingTop: 3,
  },
  fees_style: {
    color: BLACK,
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: Fonts.primaryRegular,
    // lineHeight:21,
    paddingTop: 3,
  },
  slot_container: {
    marginTop: 5,
    paddingHorizontal: 15,
  },
  no_of_slots: {
    width: Dimensions.get('window').width / 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slot_txt_style: {
    color: BLACK,
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: Fonts.primaryRegular,
    paddingTop: 5,
  },
  appointment_style: {
    width: 100,
    paddingVertical: 10,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginTop: 15,
  },
  appointment_txt_style: {
    color: BLACK,
    fontSize: 15,
    textAlign: 'center',

    fontFamily: Fonts.primaryRegular,
  },
  bottomtab:{
    // backgroundColor:'#000',
    height:height/12,
    position:'absolute',
    width:width,
    top:670,
    display:'flex',
    flexDirection:'row',
    borderTopColor:'#ecf0f1',
    borderTopWidth:1
             },


             lefttab:{
width:width/2
,alignItems:'center',
justifyContent:'center'
             },
             righttab:{
              width:width/2
              ,alignItems:'center',
justifyContent:'center'

             },
             tabtext:{
              fontSize:20,
              color:'#636e72'
              ,alignItems:'center',
              // marginTop:10
              color:'#000'

              
              // fontFamily:
             }
});
