import { ToastAndroid } from "react-native";
import { storeToLocalStorage, retrieveLocalData } from "./localStorageFunctions";
import * as Network from 'expo-network';

const fetchWithCache = async (
  key: string,
  fetchFn: () => Promise<{ data: any, error: any }>,
  transform?: (data: any) => any,
): Promise<any> => {

  // First try to check network connectivity
  const networkState = await Network.getNetworkStateAsync();
  if (!networkState.isConnected || !networkState.isInternetReachable) {
    const cachedData = await retrieveLocalData(key);
    if (!cachedData) {
      throw new Error('No cached data available');
    }
    ToastAndroid.show('You are offline, you will not get updated offers', 5000)
    return cachedData;
  };

  try {
    const response = await fetchFn();
    const data = transform ? transform(response.data) : response.data;
    storeToLocalStorage(key, data);
    return data;
  } catch (error) {
    const cachedData = await retrieveLocalData(key);
    if (!cachedData) {
      throw new Error(`No cached data available for ${key}`);
    }
    return cachedData;
  }
};
  
export default fetchWithCache;