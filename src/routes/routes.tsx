import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

// screens
import Privacy from '../screens/Drawer/Privacy/Privacy';
import Share from '../screens/OpportunityStack/ShareOpportunity/Share';
import OpportunityList from '../screens/OpportunityStack/OpportunityList/OpportunityList';
import Login from '../screens/AuthScreens/Login/Login';
import SignUp from '../screens/AuthScreens/SignUp/SignUp';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Privacy' component={Privacy} />
    </Stack.Navigator>
  );
}

export const OpportunityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='OpportunityList' component={OpportunityList} />
      <Stack.Screen name='Share' component={Share} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

export default Routes
