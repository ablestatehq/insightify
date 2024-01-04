import { Alert } from 'react-native';
import * as Updates from 'expo-updates';
import DatabaseService from './src/appwrite/appwrite';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useRef, useState } from 'react';
import { APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID } from '@env';
import { MainStackNavigator } from './src/routes/StackNavigator';
import { generateTransactionRef } from './src/helper/functions/functions';
import AppContextProvider, { AppContext } from './src/helper/context/AppContext';
import { Device, NotificationController, Notifications } from './src/helper/functions/notifications';

import { NotificationType } from './src/utils/types';
import { storeToLocalStorage } from './src/utils/localStorageFunctions';

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  const { setNotifications, setIsNotificationEnabled } = useContext(AppContext);

  // refs
  const notificationBack = useRef<any>(null);
  const responseListener = useRef<any>(null);
  const notificationListener = useRef<any>(null);
  // function to listen to updates.
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

  useEffect(() => {
    const notifications = async () => {
      await NotificationController.registerForPushNotifications()
        .then(async (token) => {
          setExpoPushToken(token as string)
          const tokenData: NotificationType = {
            tokenID: generateTransactionRef(5),
            tokenValue: token as string,
            userOrDeviceID: Device.osVersion as string,
            subscription: true,
            platform: Device.osName?.toUpperCase() as string
          }

          const checkDBToken = await DatabaseService.checkDuplicateToken(token as string)
          if (!checkDBToken && token) {
            await DatabaseService.storeDBdata(
              APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID,
              tokenData
            ).then(response => {
              // Alert.alert('Opportunity notifications', 'You will be receiving notifications for the latest opportunities.', [
              //   {
              //     text: 'ok',
              //     style: 'cancel',
              //     onPress: () => { }
              //   }
              // ], {
              //   cancelable: true,
              //   onDismiss: () => { }
              // })
            });

            setIsNotificationEnabled(true)
            await storeToLocalStorage('tokens', { "pushToken": token, isPushNotificationEnabled: false });
          }
        })
        .catch((error: any) => {
          // Alert.alert('Opportunity notifications', `You may not be able to receive opportunity notifications\nContact us for support`, [
          //   {
          //     text: 'ok',
          //     style: 'cancel',
          //     onPress: () => { }
          //   }
          // ], {
          //   cancelable: true,
          //   onDismiss: () => { }
          // })
        })
      // This listener is fired whenever the app is in foreground
      notificationListener.current = Notifications.addNotificationReceivedListener(_notifications => {
        setNotifications(_notifications => [..._notifications]);
      });

      // This notification is fired when either the app is in foreground, background or killed.
      responseListener.current = Notifications.addNotificationResponseReceivedListener(_response => {
        console.log("It is well", _response);
        // setNotifications(preve)
      })
    }

    // Notifications.
    notifications();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

  return (
    <NavigationContainer>
      <AppContextProvider>
        <MainStackNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
}