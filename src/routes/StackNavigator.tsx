import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens 
import Login from '../screens/AuthScreens/Login/Login';
import SignUp from '../screens/AuthScreens/SignUp/SignUp';
import Share from '../screens/OpportunityStack/ShareOpportunity/Share';

// bottom tab 
import BottomTabNavigator from './BottomTabNavigator';
import Contact from '../screens/Drawer/Contact/Contact';
import FeedBack from '../screens/Drawer/FeedBack/FeedBack';
import Privacy from '../screens/Drawer/Privacy/Privacy';
import OnBoard from '../screens/OpportunityStack/onBoardSharing/OnBoard';
import { retrieveLocalData } from '../utils/localStorageFunctions';
import { Loader } from '../components';
import Notification from '../screens/Notifications/Notification';
import Forgot from '../screens/AuthScreens/Login/component/Forgot';
import ResetPassword from '../screens/AuthScreens/Login/component/ResetPassword';
import Otp from '../screens/AuthScreens/Login/component/Otp';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerShown: false
}

const MainStackNavigator = () => {
  const [isOnBoard, setIsOnBoard] = useState<boolean | null>(null)

  React.useEffect(() => {
    const checkOnBoard = async () => {
      const onBoard = await retrieveLocalData('onBoard');
      if (onBoard) {
        setIsOnBoard(false);
      } else {
        setIsOnBoard(true);
      }
    }
    checkOnBoard();
  });

  if (isOnBoard === null) {
    <Loader />
  }
  return isOnBoard != null && (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
    >
      {isOnBoard == true && <Stack.Screen name='OnBoard' component={OnBoard} />}
      <Stack.Screen name='Home' component={BottomTabNavigator} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Share' component={Share} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Privacy' component={Privacy} />
      <Stack.Screen name='Contact' component={Contact} />
      <Stack.Screen name='Feedback' component={FeedBack} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='Forgot' component={Forgot} />
      <Stack.Screen name='Reset' component={ResetPassword} />
      <Stack.Screen name='Otp' component={Otp} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}



export { MainStackNavigator }