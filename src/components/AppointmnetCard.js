import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {postData} from '../API/index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import React from 'react';
import {BLACK, PRIMARY_COLOR} from '../constant/Colors';
import Fonts from '../theme/Fonts';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {object} from 'is_js';

const {width, height} = Dimensions.get('window');
const AppointmnetCard = ({data, img_source, booking, onPress, daily}) => {
  const [refresh, setRefresh] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const [current, setCurrent] = useState(
    new Date().toLocaleDateString('en-CA'),
  );

  const dispatch = useDispatch();
  const [count, SetCount] = useState(0);
  const Bookdata = useSelector(state => state.book);

  const user = useSelector(state => state.user);
  const [ind, setInd] = useState(0);

  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(false);
  var Selectedseat = [];
  var slot = [];

  const onSelectRow = (item, index) => {
    // Selectedseat = Bookdata;
    // setInd(index);

    if (item.status) {
      item.status = false;
      CancelSchedule(item?.slot_time);
    } else {
      item.status = true;
      SubmitSchedule(item?.slot_time);
    }
    setRefresh(!refresh);

    // if(item?.status==false)
    // { SubmitSchedule(item?.slot_time)}
    // else if(item?.status==true){
    //  CancelSchedule(item?.slot_time)
    // }

    // Bookdata?.map((item,ind) => {
    //   if (index === ind) {
    //     If(item.status==false)
    //     {item.status=true}

    //   }
    // });

    // let Seatbooked = [];
    // Bookdata?.map(item => {
    //   Seatbooked?.push(item);
    // });

    // setSchedule(Seatbooked);

    //    else if(item.status==true){
    //     setStatus(!status)

    // setSchedule([...Selectedseat,{status:status}])
    // console.log("false",status)

    //}
  };

  //////////////////useeffect//////////////

  useEffect(() => {
    console.log(
      'currentdate',
      current,
      booking,
      data?.doctor_id,
      daily,
      data?.name,
    );
    fetchSchedule();
  }, [booking, daily]);

  ///////////////api integration///////////////////////
  async function fetchSchedule() {
    // const resp = await fetch(`http://rapidhealth.me/api/dolo/profile/${item.id}`);

    //http://rapidhealth.me/api/doctorslot?current_date=2022-11-11 & doctor_id=119

    const resp = await fetch(
      `http://rapidhealth.me/api/doctorslot?current_date=${
        booking ? booking : current
      }&doctor_id=${data.doctor_id}`,
    );
    // console.log(">>>>>>>>>>>datadoctorlist",item.id,resp)

    const response = await resp.json();

    // console.log('>>>>>response?', response);
    var final = null;
    if (resp.status == 200) {
      final = response;
      Selected(final);
    }
  }

  //////////////////nextselected/////////////////////
  function Selected(final) {
    var slotDays = final
      ?.filter(item => item.days == daily)
      .map(item2 => item2);
    // console.log("firs",slotDays[0])

    var Mon = slotDays[0][daily];
    console.log('monn', slotDays[0].checked);
    setRefresh(!refresh);

    setSchedule([...Mon]);

    if (slotDays[0].checked == false) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    dispatch({
      type: 'BOOK',
      payload: Mon,
    });
  }
  /////////////////////postslotbooking///////////////////////
  async function SubmitSchedule(value) {
    let body = {
      user_id: user.userid,
      doctor_id: data.doctor_id,
      booking_date: booking ? booking : current,
      booking_day: daily,
      slot_time: value,
    };

    const resp = await fetch(`https://rapidhealth.me/api/slotbooking`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const response = await resp.json();

    //  console.log('>>>>response',resp);
    if (resp.status == 200) {
      console.log('booked', response);
      SetCount(p => p + 1);
    } else {
      console.log('??>??>???ERROR');
    }
  }

  /////////////////////cancelslotbooking///////////////////////
  async function CancelSchedule(value) {
    let body = {
      user_id: user.userid,
      doctor_id: data.doctor_id,
      booking_date: booking ? booking : current,
      booking_day: daily,
      slot_time: value,
    };

    const resp = await fetch(`https://rapidhealth.me/api/slotcancel`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('first');

    //  const response = await resp.json()

    //  console.log('>>>>response',resp);
    if (resp.status == 200) {
      console.log('cancelled', resp);

      SetCount(p => p - 1);
    } else {
      console.log('??>??>???ERROR');
    }
  }

  // console.log('schh', schedule);

  /////////////slot booking/////////////////
  function Slot() {
    return (
      <View>
        <FlatList
          key={'#'}
          //  keyExtractor={item => index + item.id}
          keyExtractor={(item, index) => `key-${index}`}
          nestedScrollEnabled={true}
          numColumns={3}
          data={schedule}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity onPress={() => onSelectRow(item, index)}>
                  {item.status == true ? (
                    <View
                      style={[
                        styles.appointment_style,
                        {backgroundColor: '#2f3640', alignItems: 'center'},
                      ]}>
                      <Text style={{color: '#fff', fontWeight: '800'}}>
                        {item.slot_time}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.appointment_style,
                        {backgroundColor: '#fff', alignItems: 'center'},
                      ]}>
                      <Text style={{color: '#000', fontWeight: '800'}}>
                        {item.slot_time}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }

  /////////////////////doctornotofound///////////
  function NotFound() {
    return (
      <View style={styles.logo}>
        <Image
          source={require('../assets/images/notfound.png')}
          style={{width: 380, height: 350, resizeMode: 'contain'}}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: '800',
            color: '#000',
            marginTop: 2,
            position: 'absolute',
            top: 265,
          }}>
          Doctor Not Available....
        </Text>
      </View>
    );
  }

  /////////////////////skeleton loader//////////////////////
  function ActivityLoader() {
    return (
      <View
        style={{
          width: width - 40,
          display: 'flex',
          flexDirection: 'row-reverse',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          height: height - 180,
        }}>
        {Array.from({length: 24}).map(item => {
          return (
            <SkeletonPlaceholder
              borderRadius={4}
              enabled={true}
              highlightColor={PRIMARY_COLOR}>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                {/* <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} /> */}
                <SkeletonPlaceholder.Item marginLeft={15} marginTop={15}>
                  <SkeletonPlaceholder.Item width={100} height={50} />
                  {/* <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} /> */}
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          );
        })}
      </View>
    );
  }

  // const Mon=schedule.filter(item=>item.days==='Monday')

  // useEffect(() => {

  // if (Bookdata == undefined) {
  //   Seatbooked = {};
  // } else {
  //   Seatbooked = Bookdata;
  // setSchedule(Bookdata)

  //   setRefresh(!refresh);
  // }
  // }, []);

  return (
    <View style={styles.slot_container}>
      <View style={styles.no_of_slots}>
        <Image
          source={img_source}
          style={{width: 30, height: 30, marginLeft: 12, mariginTop: 5}}
        />
        <Text style={styles.slot_txt_style}>{daily} Slots</Text>
      </View>
      {/* schedule ? <Slot/>: */}
      {checked ? <NotFound /> : schedule ? <Slot /> : <ActivityLoader />}
    </View>
  );
};

export default AppointmnetCard;

styles = StyleSheet.create({
  slot_container: {
    marginTop: 0,
    paddingHorizontal: 15,
    backgroundColor: '#f5f6fa',
    height: height,
  },
  no_of_slots: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 8,
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
    paddingVertical: 12,
    // borderColor: PRIMARY_COLOR,
    // borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginLeft: 14,
    marginTop: 15,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#b2bec3',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  appointment_txt_style: {
    color: BLACK,
    fontSize: 15,
    textAlign: 'center',

    fontFamily: Fonts.primaryRegular,
  },
  logo: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 45,
    height: height / 2,
  },
  logo: {
    // flexDirection: 'row',
    // flex:1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
