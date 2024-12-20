import * as Network from 'expo-network';
import * as BackgroundFetch from 'expo-background-fetch';
import { getData } from '@api/grapiql';
import { NotificationController } from '@src/helper/notifications';
import { retrieveLocalData, storeToLocalStorage } from '@src/utils/localStorageFunctions';

export const background_func = async () => {
  try {
     // check if there is active internet
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected || !networkState.isInternetReachable) {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    };
    
    // check notification right now
    const response = (await getData('posts')).data;

    if (response.length > 0) {
      NotificationController.schedulePushNotification(
        'You were mentioned!',
        'Check out what your friend said about you.'
      )
    };

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
};

export const checkActiveStatus = async () => {
  const currentDate = new Date();
  let lastOpenDate = await retrieveLocalData('lastOpenDate');
  let inactivityDays = 0;

  if (lastOpenDate) {
    lastOpenDate = new Date(lastOpenDate);
    const timeDiff = currentDate.getTime() - lastOpenDate.getTime();
    inactivityDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // calculate days
  }

  let notificationThreshold = await retrieveLocalData('notificationThreshold');
  if (!notificationThreshold) {
    notificationThreshold = 5;
    await storeToLocalStorage('notificationThreshold', notificationThreshold);
  } else {
    notificationThreshold = parseInt(notificationThreshold, 10);
  }

  if (inactivityDays >= notificationThreshold) {
    // Send push notification
    NotificationController.schedulePushNotification(
        'You were mentioned!',
        'Check out what your friend said about you.'
      )

    // upate the notification threshold for next notification
    const nextThreshold = notificationThreshold + 5;
    await storeToLocalStorage('notificationThreshold', nextThreshold);

    // reset last open date for inactivity tracking
    await storeToLocalStorage('lastOpenDate', currentDate);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  }
  return BackgroundFetch.BackgroundFetchResult.NoData;
}