import { NavigationContainer } from '@react-navigation/native';
import AppContextProvider from './src/helper/context/AppContext';
import { MainStackNavigator } from './src/routes/StackNavigator';
import * as Updates from 'expo-updates';
import { Alert } from 'react-native';


export default function App() {

  // function to listen to updates.
  const eventListener = (event: Updates.UpdateEvent) => {
    try {
      if (event.type === Updates.UpdateEventType.ERROR) {
        // Error occured.
      } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
        // No update available.
      } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        // Since updates are available, notify the user about the updates available
        Alert.alert(
          "Update available",
          "Don't miss out on the latest Insightify features. Tap 'UPDATE' to update your app now.",
          [
            {
              text: "UPDATE",
              onPress: async () => {
                // When the user presses 'update'
                // install updates.
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              },
              style: 'cancel'
            }
          ],
          {
            cancelable: true,
            onDismiss: async () => {
              // await Updates.fetchUpdateAsync();
              // await Updates.reloadAsync();
            },
          }
        )
      }
    } catch (error) {
      console.log("error occured.")
    }
  }
  // Listen to the updates available and do the required action.
  Updates.useUpdateEvents(eventListener);

  return (
    <NavigationContainer>
      <AppContextProvider>
        <MainStackNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
}