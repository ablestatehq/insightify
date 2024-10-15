import AsyncStorage from "@react-native-async-storage/async-storage";

async function storeToLocalStorage(key: string, value: any) {
  
  const stringified_data = JSON.stringify(value);
  const retrieve_data = await AsyncStorage.getItem(key)
    .catch(error => {});
  
  if (retrieve_data) {
    if (stringified_data != retrieve_data) {
        try {
          await AsyncStorage.setItem(`${key}`, stringified_data, function () { })
            .catch(error => {});
        } catch (error) {}
    }
  } else {
    try {
      await AsyncStorage.setItem(`${key}`, stringified_data);
    } catch (error) {}
  }
}

async function retrieveLocalData(key:string) {
  try {
    const res = await AsyncStorage.getItem(`${key}`);
    if (res) {
      return JSON.parse(res);
    }
  } catch (error) {}
}

async function clearLocalData(key:string) {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (error) {}
}

export {
  clearLocalData,
  retrieveLocalData,
  storeToLocalStorage,
}