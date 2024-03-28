import React from 'react'
import {View, Text} from 'react-native';

// components 
import {Loader} from '../components';

// helper 
import {fontsLoading} from '../assets/fonts/fonts';
import {COLOR, FONTSIZE} from '../constants/contants';
import {AppContext} from '../helper/context/AppContext';

// screens 
import Home from '../screens/Dashboard/Home';
import CodeTips from '../screens/CodeTips/CodeTips';
import FindTalent from '../screens/FindTalent/FindTalent';

import Icon from '../assets/icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MoreDrawerScreen from '../screens/MoreDrawerScreen/MoreDrawerScreen';

const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerShown: false,
}

interface CustomItemTabProp {
  focused: any
  text: string
}
const CustomItemTab: React.FC<CustomItemTabProp> = ({focused, text}) => (
  <View
    style={{
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: focused ? 2 : 0,
      borderBottomWidth: focused ? 2 : 0,
      borderBottomColor: COLOR.WHITE,
      borderTopColor: focused ? COLOR.SECONDARY_300 : COLOR.WHITE,
      marginBottom: 2,
      paddingVertical:10
    }}
  >
    <Icon name={text} isActive={false} />
    <Text
      style={{
        color: focused ? COLOR.PRIMARY_300 : COLOR.SECONDARY_300,
        fontFamily: 'RalewayBold',
        fontSize: FONTSIZE.BODY
      }}
    >{text}</Text>
  </View>
)
const BottomTabNavigator = () => {

  const { fontsLoaded, fontError } = fontsLoading();

  const {isLoading, isLoggedIn } = React.useContext(AppContext);

  return isLoading || (!fontsLoaded && !fontError) ? <Loader message='Loading...' /> : (
    <Tab.Navigator
      screenOptions={{
        ...screenOptionStyle,
        tabBarLabelStyle: {
          fontFamily: 'RalewayBold',
          fontSize: FONTSIZE.TITLE_1,
          textAlign: 'center',
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          borderWidth: 0,
          borderColor:COLOR.WHITE,
          paddingVertical: 1,
          height:60
        },
        tabBarItemStyle: {
          height:60,
        }
      }}
    >
      <Tab.Screen
        name='Explore'
        component={Home}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({focused}) => <CustomItemTab text='Explore' focused={focused} />
        }}

      />
      <Tab.Screen
        name='LevelUp'
        component={CodeTips}
        options={{
          tabBarLabel: 'LevelUp',
          tabBarIcon: ({focused}) => <CustomItemTab text='Level up' focused={focused} />
        }}
      />
      <Tab.Screen
        name='Talent'
        component={FindTalent}
        options={{
          tabBarLabel: 'Talent',
          tabBarIcon: ({focused}) => <CustomItemTab text='Talent' focused={focused} />,
        }}
      />
      <Tab.Screen
        name='More'
        component={MoreDrawerScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({focused}) => <CustomItemTab text='More' focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator