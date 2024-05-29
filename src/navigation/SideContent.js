import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Switch} from 'react-native';
import {
  useTheme,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Avatar,
  Colors,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {getData, ServerURL} from '../API';
import i18n from '../assets/i18n/i18n';
import Color from '../assets/utilis/Color';
import {CommonActions} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {changeLanguage} from 'i18next';
import {Share} from 'react-native';

const SideContent = props => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [chLng, setChgLng] = useState(false);
  const {t} = useTranslation();
  const {colors} = useTheme();

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.info);

  const shareAppLink = async () => {
    try {
      const result = await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLanguage = () => {
    setChgLng(previousState => !previousState);

    i18n.changeLanguage('hi');

    if (chLng == true) {
      i18n.changeLanguage('en');
    }
    //
  };

  

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
    setIsDarkTheme(previousState => !previousState);
  };

  useEffect(() => {
    dispatch({
      type: 'SET_DARK_THEME',
      payload: isDarkTheme,
    });
  }, [isDarkTheme, chLng]);
  // console.log(">>>>",userInfo)

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'column', marginTop: 15}}>
              <Avatar.Image
                // title={user?.name.substr(0, 1)}
                // rounded

                source={{
                  uri: userInfo?.image
                    ? userInfo?.image.length > 20
                      ? `data:image/png;base64,${userInfo?.image}`
                      : `https://rapidhealth.me/assets/doctor/${userInfo?.image}`
                    : 'https://www.w3schools.com/w3images/avatar6.png',
                }}
                size={80}
              />
              <View
                style={{marginTop: 10, marginLeft: 5, flexDirection: 'column'}}>
                <Title style={{...styles.title, color: colors.text}}>
                  {userInfo?.name}
                </Title>
                <Caption style={styles.caption}>{userInfo?.email}</Caption>
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
                <Icon name="tooltip-text-outline" size={size} color={color} />
              )}
              label={t('About us.screenTitle')}
              onPress={() => {
                props.navigation.navigate('AboutUs');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon
                  name="message-question-outline"
                  size={size}
                  color={color}
                />
              )}
              label={'FAQ'}
              onPress={() => {
                props.navigation.navigate('FAQ');
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="account" size={size} color={color} />
              )}
              label={t('profile.Patient Profile')}
              onPress={() => {
                props.navigation.navigate('ProfileScreen');
              }}
            />

            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="briefcase-search" size={size} color={color} />
              )}
              label={t('Category.SELECT CATEGORY')}
              onPress={() => {
                props.navigation.navigate('CategoryDoctor', {
                  appointmentDetails: {},
                  reschedule: false,
                  otherDoctorAppointment: false,
                });
              }}
            />
            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="history" size={size} color={color} />
              )}
              label={t('PatientHistory.Patient History')}
              onPress={() => {
                props.navigation.navigate('PatientHistory');
              }}
            />

            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon name="heart" size={size} color={color} />
              )}
              label={t('MyFavouriteDoctors.screenTitle')}
              onPress={() => {
                props.navigation.navigate('MyFavouriteDoctors');
              }}
            />

            <DrawerItem
              labelStyle={{fontFamily: 'Poppins-Medium'}}
              icon={({color, size}) => (
                <Icon
                  name="text-box-multiple-outline"
                  size={size}
                  color={color}
                />
              )}
              label={t('TermsandConditions.TermsandConditions')}
              onPress={() => {
                props.navigation.navigate('TermsandConditions');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section title="Preferences">
        {/* <TouchableOpacity onPress={() => toggleTheme()}>
          <View style={styles.preference}>
            <Text
              style={{
                color: '#7f8c8d',
                fontFamily: 'Poppins-Medium',
              }}>
              {t('Category.Dark Theme')}
            </Text>

            <View pointerEvents="none">
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isDarkTheme ? Color.primary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleTheme}
                value={isDarkTheme}
              />
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => handleLanguage()}>
          <View style={styles.preference}>
            <Text
              style={{
                color: '#7f8c8d',
                fontFamily: 'Poppins-Medium',
              }}>
              <Ionicons
                name="language"
                size={25}
                color="#b2bec3"
                style={{marginRight: 5}}
              />
              {t('Category.Change Language')}{' '}
            </Text>

            <View pointerEvents="none">
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isDarkTheme ? Color.primary : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleTheme}
                value={chLng}
              />
            </View>
          </View>
        </TouchableOpacity>

        <DrawerItem
          labelStyle={{fontFamily: 'Poppins-Medium'}}
          icon={({color, size}) => (
            <Icon name="share-variant-outline" color={color} size={size} />
          )}
          //  label={t('doctorHome.signOut')}
          label={t('About us.Share App')}
          onPress={() => {
            shareAppLink();
          }}
        />
      </Drawer.Section>

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
};

export default SideContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: 35,
    // backgroundColor:'#000'
  },
  title: {
    fontSize: 16,
    // color:colors.text,
    marginTop: 3,
    fontWeight: '800',
    fontFamily: 'Poppins-SemiBold',
  },
  caption: {
    fontSize: 14,
    color: Color.gray,
    fontFamily: 'Poppins-Regular',
  },
  bottomDrawerSection: {
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  drawerSection: {
    // marginTop:-44,
    // backgroundColor:'#000'
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
