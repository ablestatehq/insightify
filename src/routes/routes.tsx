import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Home from '../screens/Dashboard/Home';
import CodeTips from '../screens/CodeTips/CodeTips';
import NewsDetails from '../screens/NewsDetails/NewsDetails';
import { RootStackParamList } from '../utils/types';
import Privacy from '../screens/Drawer/Privacy/Privacy';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Details' component={NewsDetails} />
      <Stack.Screen name='CodeTips' component={CodeTips} />
      <Stack.Screen name='Privacy' component={Privacy} />
    </Stack.Navigator>
  );
}

export default Routes
