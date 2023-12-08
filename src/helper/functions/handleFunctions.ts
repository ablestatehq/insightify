import { useContext } from "react";
import { Linking, Share, Alert, } from "react-native";
import { AppContext } from "../context/AppContext";
import { retrieveLocalData, storeToLocalStorage } from "../../utils/localStorageFunctions";

// open a link in the browser
const OpenLink = async (url: string) => {
  // Navigate to the link in the browser upon card press
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};


// Share content
const onShare = async (message: string) => {
  try {
    const results = await Share.share(
      {
        message,
      }
    )

    if (results.action === Share.sharedAction) {

    }
  } catch (error: any) {
    Alert.alert(error.message)
  }
}

export {
  OpenLink,
  onShare,
}