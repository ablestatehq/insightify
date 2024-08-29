import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useLocalStorage(key: string, initialValue: Record<string, unknown>) {

  const [storedValue, setStoredValue] = useState<Record<string, unknown>>(function () {
    try {
      const item = AsyncStorage.getItem(key).then(data => data);
      if (item) {
        const _data = JSON.parse(item as unknown as string)
        return JSON.parse(item as unknown as string)
      }
    else
        return initialValue
    } catch (error) {
      return initialValue;
    }
  })

  const setValue = async (value: Record<string, unknown>) => {
    try {
      setStoredValue(value as any);
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }
  return [storedValue, setValue] as const
}