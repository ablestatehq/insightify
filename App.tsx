import * as Updates from 'expo-updates';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useContext, useEffect, useRef, useState} from 'react';
import {MainStackNavigator} from './src/routes/StackNavigator';
import {generateTransactionRef} from './src/helper/functions/functions';
import AppContextProvider, {AppContext} from './src/helper/context/AppContext';
import {Device, NotificationController, Notifications} from './src/helper/functions/notifications';

import usePushNotifications from './src/helper/customHooks/usePushNotification';

export default function App() {

  const eventListener = (event: Updates.UpdateEvent) => {
    try {
      if (event.type === Updates.UpdateEventType.ERROR) {
        // Error occured.
      } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
        // No update available.
      } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        // Since updates are available, notify the user about the updates available
        Alert.alert(
          "Update available",
          "Don't miss out on the latest Insightify features. Tap 'UPDATE' to update your app now.",
          [
            {
              text: "UPDATE",
              onPress: async () => {
                // When the user presses 'update'
                // install updates.
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              },
              style: 'cancel'
            }
          ],
          {
            cancelable: true,
            onDismiss: async () => {
              // await Updates.fetchUpdateAsync();
              // await Updates.reloadAsync();
            },
          }
        )
      }
    } catch (error) {
      console.log("error occured.")
    }
  }
  
  // Listen to the updates available and do the required action.
  Updates.useUpdateEvents(eventListener);

  const {expoPushToken} = usePushNotifications()

  // console.log(expoPushToken)
  return (
    <NavigationContainer>
      <AppContextProvider>
        <MainStackNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
}