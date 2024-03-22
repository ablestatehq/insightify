import {AppContext} from '../context/AppContext';
import {useContext, useEffect, useRef, useState} from 'react';
import {generateTransactionRef} from '../functions/functions';
import {getStrapiData, storeData} from '../../../api/strapiJSAPI';
import {storeToLocalStorage} from '../../utils/localStorageFunctions';
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
            await storeToLocalStorage('tokens', {pushToken: token, isPushNotificationEnabled: true});
          }
        }


      } catch (error) {}
    };

    const notificationReceivedHandler = (notification: any) => {
      console.log("App in the foreground", notification);
      // setNotifications((prevNotifications: any) => [...prevNotifications, notification]);
    };

    const notificationResponseHandler = (response: any) => {
      // Handle notification response
      console.log('App in background', response);
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