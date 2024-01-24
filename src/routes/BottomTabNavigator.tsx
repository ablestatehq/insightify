import React from 'react'
import { View, Text } from 'react-native';

// components 
import { Loader } from '../components';

// helper 
import { fontsLoading } from '../assets/fonts/fonts';
import { COLOR, FONTSIZE } from '../constants/contants';
import { AppContext } from '../helper/context/AppContext';

// screens 
import Home from '../screens/Dashboard/Home';
import CodeTips from '../screens/CodeTips/CodeTips';
import FindTalent from '../screens/FindTalent/FindTalent';

import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MoreDrawerScreen from '../screens/MoreDrawerScreen/MoreDrawerScreen';
import Icon from '../assets/icons';

const Tab = createBottomTabNavigator();

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
      backgroundColor: focused ? COLOR.ORANGE_50 : '',
      paddingHorizontal: 15,
      paddingBottom: 5,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems:'center'
    }}
  >
    <Icon name={text} isActive={focused} />
    <Text
      style={{
        color: focused ? COLOR.ORANGE_300 : COLOR.B_300,
        fontFamily: 'RalewayBold',
        fontSize:FONTSIZE.BODY
      }}
    >{text}</Text>
  </View>
)
const BottomTabNavigator = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { fontsLoaded, fontError } = fontsLoading();

  const { isLoading, isLoggedIn } = React.useContext(AppContext);

  return isLoading || (!fontsLoaded && !fontError) ? <Loader message='Loading...' /> : (
    <Tab.Navigator
      screenOptions={{
        ...screenOptionStyle,
        tabBarLabelStyle: {
          fontFamily: 'RalewayBold',
          fontSize: FONTSIZE.TITLE_1,
          textAlign: 'center'
        },
        tabBarInactiveTintColor: COLOR.B_300,
        tabBarActiveTintColor: COLOR.ORANGE_300,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name='Deck'
        component={Home}
        options={{
          tabBarLabel: 'Deck',
          tabBarIcon: ({ focused }) => <CustomItemTab text='Deck' focused={focused} />
        }}

      />
      <Tab.Screen
        name='Sky'
        component={CodeTips}
        options={{
          tabBarLabel: 'Sky',
          tabBarIcon: ({ focused }) => <CustomItemTab text='Sky' focused={focused} />
        }}
      />
      <Tab.Screen
        name='Talent'
        component={FindTalent}
        options={{
          tabBarLabel: 'Talent',
          tabBarIcon: ({ focused }) => <CustomItemTab text='Talent' focused={focused} />,
        }}
      />
      <Tab.Screen
        name='More'
        component={MoreDrawerScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ focused }) => <CustomItemTab text='More' focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator