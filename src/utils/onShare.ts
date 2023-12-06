import { Share, Alert, Linking } from "react-native";

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

export const handleLinkPress = async (sourceLink:string) => {
  try {
    const canOpen = await Linking.canOpenURL(sourceLink ?? "")
      .then(response => response)
      .catch((error: any) => {
        console.log("Link error", error.message);
      });
    if (canOpen) {
      console.log("The link should open");
      await Linking.openURL(sourceLink ?? "")
        .then(response => {
          console.log("Opened the link", response);
        })
        .catch(error => {
          console.log("Failed to open a given link");
        })
    }
  } catch (error) {
    console.log("Caught the error", error);
  }
}


export default onShare;