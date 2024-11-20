import * as Network from 'expo-network';
import * as BackgroundFetch from 'expo-background-fetch';
import {BGTASKS} from '@constants/constants';
import { getData } from '@api/grapiql';
import { NotificationController } from '@src/helper/notifications';

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

export const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(BGTASKS.CHECK_ONLINE_STATUS, {
    minimumInterval: 60 * 1, 
    stopOnTerminate: false,
    startOnBoot: true,
  })
};

export const unregisterBackgroundFetchAsync = async () => {
    return BackgroundFetch.unregisterTaskAsync(BGTASKS.CHECK_ONLINE_STATUS);
};