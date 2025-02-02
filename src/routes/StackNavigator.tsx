import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens 
import Login from '../screens/AuthScreens/Login/Login';
import SignUp from '../screens/AuthScreens/SignUp/SignUp';
import Share from '../screens/ShareOpportunity/Share';

// bottom tab 
import BottomTabNavigator from './BottomTabNavigator';
import Contact from '../screens/More/Contact/Contact';
import FeedBack from '../screens/More/FeedBack/FeedBack';
import Privacy from '../screens/More/Privacy/Privacy';
import OnBoard from '../screens/onBoardSharing/OnBoard';
import { retrieveLocalData } from '../utils/localStorageFunctions';
import { Loader } from '../components';
import Notification from '../screens/Notifications/Notification';
import Forgot from '../screens/AuthScreens/Login/component/Forgot';
import ResetPassword from '../screens/AuthScreens/Login/component/ResetPassword';
import Otp from '../screens/AuthScreens/Login/component/Otp';
import Profile from '../screens/Profile';
import ChatRoom from '../screens/ChatScreen/ChatScreen'
import FindTalent from '../screens/FindTalent/FindTalent';
import Product from '../screens/Product';
import Offers from '../screens/Offers'
import ProductList from '../screens/ProductList';
import AddProduct from '../screens/AddProduct'
import ConfirmationScreen from '../screens/AuthScreens/Confirmation'

const { Screen, Navigator } = createNativeStackNavigator();

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
    <Navigator
      screenOptions={screenOptionStyle}
    >
      {isOnBoard == true && <Screen name='OnBoard' component={OnBoard} />}
      <Screen name='Home' component={BottomTabNavigator} />
      <Screen name='Login' component={Login} />
      <Screen name='Share' component={Share} />
      <Screen name='SignUp' component={SignUp} />
      <Screen name='Privacy' component={Privacy} />
      <Screen name='Contact' component={Contact} />
      <Screen name='Feedback' component={FeedBack} />
      <Screen name='Notification' component={Notification} />
      <Screen name='Forgot' component={Forgot} />
      <Screen name='Reset' component={ResetPassword} />
      <Screen name='Otp' component={Otp} />
      <Screen name='Profile' component={Profile} />
      <Screen name='ChatRoom' component={ChatRoom} />
      <Screen name='Talent' component={FindTalent} />
      <Screen name='ProductDetail' component={Product} />
      <Screen name='Offers' component={Offers} />
      <Screen name='ProductList' component={ProductList} />
      <Screen name='AddProduct' component={AddProduct} />
      <Screen name='ConfirmEmail' component={ConfirmationScreen} />
    </Navigator>
  )
}



export { MainStackNavigator }