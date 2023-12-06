import React from 'react'
import MyTabBar from './MyTabBar';
import CodeTips from '../screens/CodeTips/CodeTips';
import FindTalent from '../screens/FindTalent/FindTalent';
import HomeDisplay from '../screens/Dashboard/HomeDisplay';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import OpportunityList from '../screens/OpportunityStack/OpportunityList/OpportunityList';

const Tabs = createMaterialTopTabNavigator();

const TabBar = () => {
  return (
    <Tabs.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        swipeEnabled: false,
      }}
    >
      <Tabs.Screen
        name='Deck'
        component={OpportunityList}
      />
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