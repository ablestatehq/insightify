import React from 'react'

import { Loader } from '../components';
import Home from '../screens/Dashboard/Home';
import { COLOR, FONTSIZE } from '../constants/contants';
import Contact from '../screens/Drawer/Contact/Contact';
import FindTalent from '../screens/FindTalent/FindTalent';
import { AppContext } from '../helper/context/AppContext';
import { TouchableOpacity, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CodeTips from '../screens/CodeTips/CodeTips';


const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  headerShown: false,
}

// Custom Tab Button Component
const CustomTabButton = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name); // Navigate to the selected route
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index} // Add a unique key for each TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Text style={{ fontFamily: 'RalewayBold', fontSize: FONTSIZE.TITLE_1 }}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })
      }
    </View>
  )
};


const BottomTabNavigator = () => {

  const { isLoading } = React.useContext(AppContext);
  
  return isLoading ? <Loader message='Loading articles' /> : (
    <Tab.Navigator
      screenOptions={{
        ...screenOptionStyle,
        tabBarLabelStyle: {
          fontFamily: 'RalewayBold',
          fontSize: FONTSIZE.TITLE_1,
          textAlign: 'center'
        },
        tabBarStyle: {
          marginBottom: 0,
        },
        tabBarInactiveTintColor: COLOR.B_300,
        tabBarActiveTintColor: COLOR.ORANGE_300,
        tabBarItemStyle: {
          borderRadius:20,
          paddingVertical: 10,
        }
      }}
    >
      <Tab.Screen
        name='Deck'
        component={Home}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: 'Home'
        }}

      />
      <Tab.Screen
        name='Sky'
        component={CodeTips}
        options={{
          tabBarLabel: 'Sky',
          tabBarIcon: () => null
        }}
      />
      <Tab.Screen
        name='Talent'
        component={FindTalent}
        options={{
          tabBarLabel: 'Talent',
          tabBarIcon: () => null
        }}
      />
      <Tab.Screen
        name='Contact'
        component={Contact}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: () => null
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator