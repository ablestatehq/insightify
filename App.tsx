import { NavigationContainer } from '@react-navigation/native';
import AppContextProvider from './src/helper/context/AppContext';
import AppStack from './src/routes/Drawer/AppStack';

export default function App() {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <AppStack />
      </AppContextProvider>
    </NavigationContainer>
  );
}