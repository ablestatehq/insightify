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
      });
    if (canOpen) {
      await Linking.openURL(sourceLink ?? "")
        .then(response => {
        })
        .catch(error => {
        })
    }
  } catch (error) {
  }
}


export default onShare;