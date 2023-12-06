import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens 
import CodeTips from '../screens/CodeTips/CodeTips';
import Login from '../screens/AuthScreens/Login/Login';
import SignUp from '../screens/AuthScreens/SignUp/SignUp';
import Share from '../screens/OpportunityStack/ShareOpportunity/Share';

// bottom tab 
import { useFonts } from 'expo-font';;
import { Loader } from '../components';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerShown: false
}
const MainStackNavigator = () => {

  let [fontsLoaded, fontError] = useFonts({
    "ComfortaaLight": require('../assets/fonts/Comfortaa/static/Comfortaa-Light.ttf'),
    "Comfortaa_Regular": require('../assets/fonts/Comfortaa/static/Comfortaa-Regular.ttf'),
    "ComfortaaMedium": require('../assets/fonts/Comfortaa/static/Comfortaa-Medium.ttf'),
    "ComfortaaSemiBold": require('../assets/fonts/Comfortaa/static/Comfortaa-SemiBold.ttf'),
    "ComfortaaBold": require('../assets/fonts/Comfortaa/static/Comfortaa-Bold.ttf'),
    "RalewayThin": require('../assets/fonts/Raleway/static/Raleway-Thin.ttf'),
    "RalewayExtraLight": require('../assets/fonts/Raleway/static/Raleway-ExtraLight.ttf'),
    "RalewayLight": require('../assets/fonts/Raleway/static/Raleway-Light.ttf'),
    "RalewayRegular": require('../assets/fonts/Raleway/static/Raleway-Regular.ttf'),
    "RalewayMedium": require('../assets/fonts/Raleway/static/Raleway-Medium.ttf'),
    "RalewaySemiBold": require('../assets/fonts/Raleway/static/Raleway-SemiBold.ttf'),
    "RalewayBold": require('../assets/fonts/Raleway/static/Raleway-Bold.ttf'),
    "RalewayExtraBold": require('../assets/fonts/Raleway/static/Raleway-ExtraBold.ttf'),
    "RalewayBlack": require('../assets/fonts/Raleway/static/Raleway-Black.ttf')
  }
  );

  if (!fontsLoaded && !fontError) {
    return <Loader />
  }
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