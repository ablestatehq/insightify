import React,
{ useContext } from 'react';

import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

import * as Updates from 'expo-updates';

import { AppContext } from '../../helper/context/AppContext'

// components 
import { Loader } from '../../components';
// import TabBar from '../../routes/TabBar'
// import Header from '../../components/Header/Header';

// constants
import { COLOR } from '../../constants/contants'
import OpportunityList from '../OpportunityStack/OpportunityList/OpportunityList';

const Home = () => {

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
    <SafeAreaView
      style={styles.container}
    >
      <View
        style={styles.headerContainer}
      >
        <OpportunityList />
      </View>
    </SafeAreaView >
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  headerContainer: {
    flex: 1,
    paddingVertical: 10,
  }
})