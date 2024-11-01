import {AppContext} from '../context/AppContext';
import {useContext, useEffect, useRef, useState} from 'react';
import {generateTransactionRef} from '../functions/functions';
import {storeData, updateStrapiData} from '@api/strapiJSAPI';
import {clearLocalData, retrieveLocalData, storeToLocalStorage} from '@utils/localStorageFunctions';
import {Device, NotificationController, Notifications} from '../functions/notifications';

const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  const generateTokenData = (token: string) => ({
    tokenValue: generateTransactionRef(5),
    tokenID: token,
    deviceID: Device.osVersion,
    subscription: true,
    platform: (Device.osName as string).toUpperCase(),
    serialNumber: Device.modelId,
    model: Device.modelName,
    manafacturer: Device.manufacturer,
  }
  );

  const handleTokenUpdate = async (token: string, storedToken: any) => {
    const tokenData = generateTokenData(token);
    if (!storedToken) {
      const response = await storeData('notification-tokens', tokenData);
      if (response?.data?.id) {
        await storeToLocalStorage('tokens',
          {pushToken: token, isPushNotificationEnabled: true, id: response.data.id});
        setIsNotificationEnabled(true);
      }
    } else if (storedToken.pushToken !== token) {
      await updateStrapiData('notification-tokens', storedToken.id, tokenData).then(response => {
        clearLocalData('tokens');
        storeToLocalStorage('tokens',
          {pushToken: token, isPushNotificationEnabled: true, id: storedToken.id});
      });
    }
  };

  const registerForPushNotifications = async () => {
    try {
      const token = await NotificationController.registerForPushNotifications();
      const storedToken = await retrieveLocalData('tokens');
      setExpoPushToken(token as string);
      await handleTokenUpdate(token as string, storedToken);
    } catch (error) {}
  };
  
  const notificationReceivedHandler = async (notification: any) => {
    const {
      date,
      request: {
        content: {
          title,
          subtitle,
          body,
          data: { id, model }
        }
      }
    } = notification;
    const localNotifications = await retrieveLocalData('notifications');
    const isNotified = (localNotifications || []).some((element: any) => (element.notification_data.id == id && element.notification_data.model == model))
    if (!isNotified) {

      setNotifications((prev: any[]) => {
        return [...prev, {
          'notification_data': {
            id: id || null,
            title,
            body,
            expiryDate: date,
            model
          },
          'status': 'UNREAD'
        }]
      });
      // Store the notification to the local storage for future reference
      await storeToLocalStorage('notifications', [...(localNotifications || []), {
        'notification_data': {
          id,
          title,
          body,
          expiryDate: date,
          model
        },
        'status': 'UNREAD'
      }]);
    }
  };

  const notificationResponseHandler = async (response: any) => {
    // Handle notification response
    const {
      date,
      notification: {
        request: {
          content: {
            title,
            subtitle,
            body,
            data: { id, model }
          }
        }
      }
    } = response;
    const localNotifications = await retrieveLocalData('notifications');
    const isNotified = (localNotifications || [])
      .some((element: any) => (element.notification_data.id == id && element.notification_data.model == model));
    if (!isNotified) {
      setNotifications((prev: any[]) => {
        return [...prev, {
          'notification_data': {
            id: id || null,
            title,
            body,
            expiryDate: date,
            model
          },
          'status': 'UNREAD'
        }]
      });
      // Store the notification to the local storage for future reference
      await storeToLocalStorage('notifications', [...localNotifications, {
        'notification_data': {
          id: id || null,
          title,
          body,
          expiryDate: date,
          model
        },
        'status': 'UNREAD'
      }]);
    }
  };

  const {setNotifications, setIsNotificationEnabled} = useContext(AppContext);
  
  useEffect(() => {
    (async () => {
      await registerForPushNotifications();

      notificationListener.current =
        Notifications.addNotificationReceivedListener(notificationReceivedHandler);
      
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener(notificationResponseHandler);
    })();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {expoPushToken};
};

export default usePushNotifications;