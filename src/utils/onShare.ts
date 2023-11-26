import { Share, Alert } from "react-native";

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

export default onShare;