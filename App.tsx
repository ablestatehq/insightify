import {useEffect} from 'react';
import {Linking} from 'react-native';
import * as Updates from 'expo-updates';
import {MainStackNavigator} from './src/routes/StackNavigator';
import AppContextProvider from './src/helper/context/AppContext';
import usePushNotifications from './src/helper/customHooks/usePushNotification';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';

export default function App() {

  const {currentlyRunning, isUpdateAvailable, isUpdatePending} = Updates.useUpdates();
  const navigationRef = useNavigationContainerRef();
  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const {url} = event;
      let data = await Linking.canOpenURL(url)
      if (data) {
        navigationRef.current?.navigate("Home");
      }
    };

    // Add event listener for deep links
    Linking.addEventListener('url', handleDeepLink)

    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending])
  const {expoPushToken} = usePushNotifications()
  return (
    <NavigationContainer ref={navigationRef}>
      <AppContextProvider>
        <MainStackNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
}