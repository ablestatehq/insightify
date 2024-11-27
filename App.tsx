import * as Updates from 'expo-updates';
import * as TaskManager from 'expo-task-manager';
import * as Linking from 'expo-linking';
import { useEffect, useMemo } from 'react';
import { MainStackNavigator } from '@routes/StackNavigator';
import AppContextProvider from '@src/context/AppContext';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { BGTASKS } from '@constants/constants';
import {
  registerBackgroundFetchAsync,
  background_func,
  usePushNotifications,
} from '@src/hooks';

import { useFonts } from 'expo-font';
import { FONT_FILES } from '@fonts';
import { RootStackParamList } from '@src/types';
// import * as BackgroundFetch from 'expo-background-fetch';


TaskManager.defineTask(BGTASKS.CHECK_ONLINE_STATUS, background_func);

const LINK_CONFIG = {
  screens: {
    ConfirmEmail: 'confirmation/:code',
    Reset: 'reset/:code',
  },
};

export default function App() {

  useFonts(FONT_FILES); // Load font files in the program.
  usePushNotifications(); // Register the push notification for the app.

  const pre = Linking.createURL('');
  const { isUpdatePending } = Updates.useUpdates();
  const navigationRef = useNavigationContainerRef<RootStackParamList>()

  const linking = useMemo(() => ({
    prefixes: ['https://insightify.ablestate.africa', pre],
    LINK_CONFIG,
  }
  ), []);

  // const checkStatusAsync = async () => {
  //   const isRegistered = await TaskManager.isTaskRegisteredAsync(BGTASKS.CHECK_ONLINE_STATUS);
  //   if (isRegistered) return;
  //   else await registerBackgroundFetchAsync();
  // };

  // checking for the updates to update the app.
  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  // effect for the background task.
  // useEffect(() => {
  //   checkStatusAsync();
  // }, []);

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <AppContextProvider>
        <MainStackNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
}