import React from 'react';
import { useFonts } from 'expo-font';
import { View, Text } from 'react-native';

// components 
import { Loader } from '../components';

// helper 
// import {fontsLoading} from '@fonts';
import { COLOR, DIMEN, FONTSIZE } from '../constants/constants';
import { AppContext } from '../context/AppContext';

// screens 
import Home from '../screens/Dashboard/Home';
import CodeTips from '../screens/CodeTips/CodeTips';
import Offers from '../screens/Offers';

import Icon from '../assets/icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import { FONT_FILES, FONT_NAMES } from '@fonts';

const { Screen, Navigator } = createBottomTabNavigator();

const screenOptionStyle = {
  headerShown: false,
}

interface CustomItemTabProp {
  focused: any
  text: string
}
const CustomItemTab: React.FC<CustomItemTabProp> = ({ focused, text }) => (
  <View
    style={{
      // paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      // paddingVertical: DIMEN.PADDING.ME,
    }}
  >
    <Icon name={text.toLowerCase()} isActive={focused} />
    <Text
      style={{
        color: focused ? COLOR.PRIMARY_300 : COLOR.SECONDARY_500,
        fontFamily: FONT_NAMES.Title,
        fontSize: FONTSIZE.SMALL
      }}
    >{text}</Text>
  </View>
)

const BottomTabNavigator = () => {

  const [fontsLoaded] = useFonts(FONT_FILES);
  // const { fontsLoaded, fontError } = fontsLoading();

  const { isLoading } = React.useContext(AppContext);
  // || (!fontsLoaded && !fontError) 

  return isLoading || !fontsLoaded ? <Loader message='Loading...' /> : (
    <Navigator
      screenOptions={{
        ...screenOptionStyle,
        tabBarLabelStyle: {
          fontFamily: FONT_NAMES.Title,
          fontSize: FONTSIZE.TITLE_1,
          textAlign: 'center',
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: 1,
          elevation: 0,
          position: 'absolute',
        },
        // tabBarItemStyle: {
        //   // height: 60,
        // }
      }}
    >
      <Screen
        name='Dashboard'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <CustomItemTab text='Home' focused={focused} />
        }}

      />
      <Screen
        name='Offers'
        component={Offers}
        initialParams={{}}
        options={{
          tabBarLabel: 'Offers',
          tabBarIcon: ({ focused }) => <CustomItemTab text='Offers' focused={focused} />
        }}
      />
      <Screen
        name='LevelUp'
        component={CodeTips}
        options={{
          tabBarLabel: 'LevelUp',
          tabBarIcon: ({ focused }) => <CustomItemTab text='Career' focused={focused} />
        }}
      />
      <Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => <CustomItemTab text='Settings' focused={focused} />,
        }}
      />
    </Navigator>
  )
}

export default BottomTabNavigator