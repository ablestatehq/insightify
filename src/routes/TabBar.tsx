import React from 'react'
import MyTabBar from './MyTabBar';
import CodeTips from '../screens/CodeTips/CodeTips';
import FindTalent from '../screens/FindTalent/FindTalent';
import HomeDisplay from '../screens/Dashboard/HomeDisplay';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tabs = createMaterialTopTabNavigator();

const TabBar = () => {
  return (
    <Tabs.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarGap: 10,
        swipeEnabled: false,
      }}
    >
      <Tabs.Screen
        name='News'
        component={HomeDisplay}
      />
      <Tabs.Screen
        name='Upskill'
        component={CodeTips}
      />
      <Tabs.Screen
        name='Talent'
        component={FindTalent}
      />
    </Tabs.Navigator>
  )
}

export default TabBar