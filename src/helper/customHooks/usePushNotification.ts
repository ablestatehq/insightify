import {AppContext} from '../context/AppContext';
import {useContext, useEffect, useRef, useState} from 'react';
import {generateTransactionRef} from '../functions/functions';
import {getStrapiData, storeData} from '../../../api/strapiJSAPI';
import {retrieveLocalData, storeToLocalStorage} from '../../utils/localStorageFunctions';
import {Device, NotificationController, Notifications} from '../functions/notifications';

const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  const {setNotifications, setIsNotificationEnabled} = useContext(AppContext);
  useEffect(() => {

    const registerForPushNotifications = async () => {
      try {
        const token = await NotificationController.registerForPushNotifications().catch(error => console.error(error))
        if (token) {
          setExpoPushToken(token as string);
          const tokenData = {
            tokenValue: generateTransactionRef(5),
            tokenID: token,
            deviceID: Device.osVersion,
            subscription: true,
            platform: (Device.osName as string).toUpperCase(),
            serialNumber: Device.modelId,
            model: Device.modelName,
            manafacturer: Device.manufacturer,
          };

          const checkDBToken = await getStrapiData('notification-tokens');

          if (!checkDBToken.includes(token)) {
            setIsNotificationEnabled(true);
            await storeData('notification-tokens', tokenData);
            await storeToLocalStorage('tokens', { pushToken: token, isPushNotificationEnabled: true });
          } else {
            // If the expoToken exists in the database.
          }
        }
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

    const notificationResponseHandler = async(response: any) => {
      // Handle notification response
      console.log(response?.notification?.request?.content);
      const {
        date,
        notification: {
          request: {
          content: {
            title,
            subtitle,
            body,
            data:{id, model}
          }
        }
        }
      } = response;
      const localNotifications = await retrieveLocalData('notifications');
      // console.log("Local storage", localNotifications);
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

    registerForPushNotifications();

    notificationListener.current = Notifications.addNotificationReceivedListener(notificationReceivedHandler);
    responseListener.current = Notifications.addNotificationResponseReceivedListener(notificationResponseHandler);

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return {expoPushToken};
};

export default usePushNotifications;