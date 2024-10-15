import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

class NotificationHandler {
  constructor() {
    // Set the default notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  // Register device for push notifications and return the token
  async registerForPushNotifications() {
    try {
      // Check if device is a physical device
      if (!Device.isDevice) {
        return null;
      }

      // Check and request notification permissions
      const token = await this.getPushNotificationPermissions();
      if (!token) {
        return null;
      }

      // Configure Android-specific notification channel
      if (Platform.OS === 'android') {
        await this.configureAndroidNotificationChannel();
      }

      // Return the token
      return token;
    } catch (error: any) {
      return null;
    }
  }

  // Request notification permissions and get Expo Push Token
  async getPushNotificationPermissions() {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // If permissions are granted, get the push token
    if (finalStatus === 'granted') {
      try {
        const token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants?.expoConfig?.extra?.eas?.projectId,
        });
        return token?.data;
      } catch (error: any) {
        return null;
      }
    } else {
      return null;
    }
  }

  // Configure notification channel for Android devices
  async configureAndroidNotificationChannel() {
    try {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    } catch (error: any) {}
  }

  // Schedule a local push notification
  async schedulePushNotification(title: string, body: string, data: string, secs: number) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { data },
        },
        trigger: { seconds: secs },
      });
    } catch (error: any) {}
  }
}

const NotificationController = new NotificationHandler();

export {NotificationController, Notifications, Device};
