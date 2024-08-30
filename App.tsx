import {useEffect} from 'react';
import {Linking} from 'react-native';
import * as Updates from 'expo-updates';
import * as TaskManager from 'expo-task-manager';

import {MainStackNavigator} from './src/routes/StackNavigator';
import AppContextProvider from './src/helper/context/AppContext';
import usePushNotifications from './src/helper/customHooks/usePushNotification';
import {NavigationContainer, ParamListBase, useNavigationContainerRef} from '@react-navigation/native';
import {BGTASKS} from './src/constants/constants';
import {
  useNetworkStatus,
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from './src/helper/customHooks/useNetworkStatus';

import {useFonts} from 'expo-font';
import {FONT_FILES} from './src/assets/fonts/fonts';

export default function App() {

  const [fontsLoaded] = useFonts(FONT_FILES);
  const {isUpdatePending} = Updates.useUpdates();
  const navigationRef = useNavigationContainerRef<ParamListBase>();

  useEffect(() => {
    const handleDeepLink = async (event: {url: string}) => {
      const {url} = event;
      let data = await Linking.canOpenURL(url);
      if (data) {
        navigationRef.current?.navigate("Home");
      }
    };

    // Add event listener for deep links
    Linking.addEventListener('url', handleDeepLink);

    if (isUpdatePending) {
      Updates.reloadAsync();
    }

  }, [isUpdatePending]);

  // Register the push notification for the app.
  usePushNotifications();


  TaskManager.defineTask(BGTASKS.CHECK_ONLINE_STATUS, useNetworkStatus);
  useEffect(() => {
    registerBackgroundFetchAsync();
    return () => {
      unregisterBackgroundFetchAsync();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef} >
      <AppContextProvider>
        <MainStackNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
}