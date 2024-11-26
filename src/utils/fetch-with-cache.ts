import { storeToLocalStorage, retrieveLocalData } from "./localStorageFunctions";

 const fetchWithCache = async (
    key: string,
    fetchFn: () => Promise<{ data: any, error: any }>,
   transform?: (data: any) => any,
  ): Promise<any> => {
    try {
      const response = await fetchFn();
      const data = transform ? transform(response.data) : response.data;
      storeToLocalStorage(key, data);
      return data;
    } catch (error) {
      console.warn(`Failed to fetch ${key}, falling back to cache:`, error);
      const cachedData = await retrieveLocalData(key);
      if (!cachedData) {
        throw new Error(`No cached data available for ${key}`);
      }
      return cachedData;
    }
 };
  
export default fetchWithCache;