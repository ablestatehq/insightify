import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

// screens 
import CodeTips from '../screens/CodeTips/CodeTips';
import Login from '../screens/AuthScreens/Login/Login';
import SignUp from '../screens/AuthScreens/SignUp/SignUp';
import Share from '../screens/OpportunityStack/ShareOpportunity/Share';

// bottom tab 
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerShown: false
}
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
    >
      <Stack.Screen name='Home' component={BottomTabNavigator} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Share' component={Share} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

const CodingTips = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
    >
      <Stack.Screen name='CodingTips' component={CodeTips} />
    </Stack.Navigator>
  )
}

const OpportunityStack = () => {
  <Stack.Navigator
    screenOptions={screenOptionStyle}
  >
    <Stack.Screen name='Share' component={Share} />
    <Stack.Screen name='Login' component={Login} />
  </Stack.Navigator>
}



export { MainStackNavigator, CodingTips, OpportunityStack }