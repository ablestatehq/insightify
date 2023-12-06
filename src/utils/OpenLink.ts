import { Linking } from "react-native";

const OpenLink = async (url: string) => {
  // Navigate to the link in the browser upon card press
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};

export default OpenLink;