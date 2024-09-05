import {Platform} from 'react-native';

import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";

class NotificationHandler{
  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
      }),
    });
  }

  async registerForPushNotifications() {
    let token;
    // let newToken;
    if (Platform.OS == 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      });
    }

     if (Device.isDevice) {
       const {status: existingStatus} = await Notifications.getPermissionsAsync();
       let finalStatus = existingStatus;
       if (existingStatus !== 'granted') {
         const {status} = await Notifications.requestPermissionsAsync();
         finalStatus = status;
       }
       if (finalStatus !== 'granted') {
         alert('Failed to get push token for push notification!');
         return;
       }

       try {
        //  newToken = await Notifications.getDevicePushTokenAsync();
         token = await Notifications.getExpoPushTokenAsync({
           projectId: Constants?.expoConfig?.extra?.eas?.projectId,
         });
       } catch (error:any) {console.warn(`${error.message}`)}
      } else {
        alert('Must use physical device for Push Notifications');
     }
      return token?.data;
  }

  async schedulePushNotification(title: string, body: string, data: string, secs:number) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: {data},
      },
      trigger: {seconds: secs},
    });
  }
}

const NotificationController = new NotificationHandler();

export {
  NotificationController,
  Notifications,
  Device
}