import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContent } from './DrawerContent';
import SideContent from './SideContent';
import HomeStack from './HomeStack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';


const Drawer = createDrawerNavigator();


const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator 
    drawerContent={props => <SideContent {...props} />}
    initialRouteName='Navigator'
    // initialRouteName={SPLASH_SCREEN}
    // intitialRouteName={'Auth'}
    screenOptions={{
      headerShown: false,
      animation:'slide_from_right',
      animationTypeForReplace:'pop'
    }}
    >
        
          <Drawer.Screen
          name="Navigator"
          component={TabNavigator}
        //   options={{
        //     header: props => <AppHeader {...props} />,
        //   }}
        />
        
      </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})