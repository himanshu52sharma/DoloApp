import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import {
  useTheme,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Avatar,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData, ServerURL} from '../API';
import {Color} from '../theme';
import {CommonActions} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import TodayAppointments from '../screens/TodayAppointments';
import DisableAppointments from '../screens/DisableAppointments';

export function DrawerContent(props) {
  //   const paperTheme = useTheme();

  const {t} = useTranslation();

  console.log('td--->',t)

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [profileData, setProfileData] = React.useState();

  const signOut = () => {
    dispatch({type: 'LOGOUT'});

    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  const toggleTheme = () => {
    dispatch({
      type: 'SET_DARK_THEME',
      payload: !paperTheme.dark,
    });
  };

  const fetchProfileInfo = async () => {
    let res = await getData(`dolo/profile/${user?.userid}`);
    if (res.status) {
      // console.log(res);
      setProfileData(res.data);
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} >
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'column', marginTop: 15}}>
              <Avatar.Image
                // title={user?.name.substr(0, 1)}
                // rounded
                source={{
                  uri: profileData?.profileimage
                    ? profileData?.profileimage.length > 20
                      ? `data:image/png;base64,${profileData?.profileimage}`
                      : `https://rapidhealth.me/assets/doctor/${profileData?.profileimage}`
                    : 'https://www.w3schools.com/w3images/avatar6.png',
                }}
                size={80}
              />
              <View
                style={{marginTop: 10, marginLeft: 5, flexDirection: 'column'}}>
                <Title style={styles.title}>{user?.username}</Title>
                <Caption style={styles.caption}>{user?.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="home" size={size} color={color} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home1');
              }}
            /> */}
              <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="home" size={size} color={color} />
              )}
              label={t('doctorHome.screenTitle')}
              onPress={() => {
                props.navigation.navigate('Home1');
              }}
            />
               <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="text-box-search" size={size} color={color} />
              )}
              label={t('searchPatient.screenTitle')}
              onPress={() => {
                props.navigation.navigate('SearchPatient');
              }}
            />
             <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="stethoscope" size={size} color={color} />
              )}
              label={t('todayAppointment.screenTitle')}
              onPress={() => {
                props.navigation.navigate('Today');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="book-open" size={size} color={color} />
              )}
              label={t('doctorHome.schedule')}
              onPress={() => {
                props.navigation.navigate('Schedule');
              }}
            />
             <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="calendar-month" size={size} color={color} />
              )}
              // label={t('doctorHome.schedule')}
              label={t('disableAppointments.screenTitle')}
              onPress={() => {
                props.navigation.navigate('DisableAppointments');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons
                  name="ios-volume-high-sharp"
                  size={size}
                  color={color}
                />
              )}
              label={t('doctorHome.announcements')}
              onPress={() => {
                props.navigation.navigate('Flash');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons name="receipt" color={color} size={size} />
              )}
              label={t('doctorHome.manageAssistant')}
              onPress={() => {
                props.navigation.navigate('AssistantDashboard');
              }}
            />
            {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="briefcase-search" size={size} />
              )}
              label="Search Jobs"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            /> */}
            {/* <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => <Icon name="wallet" size={size} />}
              label="My Wallet"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            /> */}
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="account" color={color} size={size} />
              )}
              label={t('doctorHome.feedback')}
              onPress={() => {
                props.navigation.navigate('Feedback');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Ionicons name="notifications" color={color} size={size} />
              )}
              label={t('doctorHome.payment')}
              onPress={() => {
                props.navigation.navigate('PaymentHistory');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text
                  style={{
                    color: Color.black,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch value={'s'} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          labelStyle={{fontFamily: 'Poppins-Medium'}}
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label={t('doctorHome.signOut')}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginTop: 3,
    fontFamily: 'Poppins-SemiBold',
  },
  caption: {
    fontSize: 14,
    color: Color.gray,
    fontFamily: 'Poppins-Regular',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
