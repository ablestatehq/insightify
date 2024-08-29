import * as Network from 'expo-network';
import * as BackgroundFetch from 'expo-background-fetch';
import {BGTASKS} from '../../constants/constants';
import {NotificationController} from '../functions/notifications';

export const useNetworkStatus = async () => {
  try {
    // const now = new Date();
    notifyServerDeviceIsOnline();
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background task failed:', error);
    // return BackgroundFetch.BackgroundFetchResult.Failed;
  }
};

const notifyServerDeviceIsOnline = async () => {
   try {
    const networkState = await Network.getNetworkStateAsync();
     if (networkState.isConnected) {
       // If the network is connected. 
       // Establish a connect to the server.
       const ws = new WebSocket('ws://host.com/path');
       ws.onopen = () => {
         ws.send('Any missed notifications')
       }
      // const now = new Date();
      NotificationController.schedulePushNotification(
          'Insightify',
          `Got background fetch call at date: `,
          'Back online', 2
        );
    }
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
};

export const registerBackgroundFetchAsync = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BGTASKS.CHECK_ONLINE_STATUS, {
      minimumInterval: 1* 60,
      stopOnTerminate: false,
      startOnBoot: true,
    });
  } catch (error) {
  }
};

export const unregisterBackgroundFetchAsync = async () => {
  try {
    await BackgroundFetch.unregisterTaskAsync(BGTASKS.CHECK_ONLINE_STATUS);
  } catch (error) {
  }
};