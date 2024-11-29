import * as BackgroundFetch from 'expo-background-fetch';

export const registerBackgroundFetchAsync = async (bg_task: string) => {
  return BackgroundFetch.registerTaskAsync(bg_task, {
    minimumInterval: 60 * 1, 
    stopOnTerminate: false,
    startOnBoot: true,
  })
};

export const unregisterBackgroundFetchAsync = async (bg_task: string) => {
    return BackgroundFetch.unregisterTaskAsync(bg_task);
};