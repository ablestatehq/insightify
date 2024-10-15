import * as Updates from 'expo-updates';
import * as TaskManager from 'expo-task-manager';
import * as Linking from 'expo-linking';
import {useEffect} from 'react';
import {MainStackNavigator} from './src/routes/StackNavigator';
import AppContextProvider from './src/helper/context/AppContext';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {BGTASKS} from './src/constants/constants';
import {
  useNetworkStatus,
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from './src/helper/customHooks/useNetworkStatus';

import {useFonts} from 'expo-font';
import {FONT_FILES} from './src/assets/fonts/fonts';
import {RootStackParamList} from './src/utils/types';
import usePushNotifications from './src/helper/customHooks/usePushNotification';

export default function App() {

  // Load font files in the program.
  useFonts(FONT_FILES);

  const {isUpdatePending} = Updates.useUpdates();
  const navigationRef = useNavigationContainerRef<RootStackParamList>()

  usePushNotifications();
  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  // Register the push notification for the app.
  const pre = Linking.createURL('');

  TaskManager.defineTask(BGTASKS.CHECK_ONLINE_STATUS, useNetworkStatus);
  useEffect(() => {
    registerBackgroundFetchAsync();
    return () => {
      unregisterBackgroundFetchAsync();
    };
  }, []);

  const config = {
    screens: {
      ConfirmEmail: 'confirmation/:code',
      Reset: 'reset/:code',
    },
  };

  const linking = {
    prefixes: ['https://insightify.ablestate.africa', pre],
    config,
  };

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <AppContextProvider>
        <MainStackNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
}