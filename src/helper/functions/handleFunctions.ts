import { Linking, Share, ToastAndroid} from "react-native";
import { storeToLocalStorage } from "../../utils/localStorageFunctions";

// Generic function to handle bookmarking for any type of items (opportunities, techTips, etc.)
const handleBookmark = async (
  id: string | number,
  items: any[],
  setItems: (updatedItems: any[]) => void,
  storageKey: string,
  savedMessage: string,
  removedMessage: string
) => {
  const updatedItems = [...items];
  const targetIndex = updatedItems.findIndex(item => item.id === id);

  if (targetIndex !== -1) {
    const targetItem = updatedItems[targetIndex];

    const toastMessage = targetItem.bookmarked ? removedMessage : savedMessage;

    // Toggle bookmark status
    targetItem.bookmarked = !targetItem.bookmarked;

    updatedItems[targetIndex] = targetItem;

    setItems(updatedItems);

    // Update local storage
    await storeToLocalStorage(storageKey, updatedItems);
    ToastAndroid.show(`${toastMessage}`, 3000);
  }
};

// Function to handle opening a link in the browser
const OpenLink = async (url: string) => {
  // Navigate to the link in the browser upon card press
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  }
};


// Function to handle sharing of content
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
    // Alert.alert(error.message)
  }
}

export {
  OpenLink,
  onShare,
  handleBookmark,
  // bookmarkCodeTips
}