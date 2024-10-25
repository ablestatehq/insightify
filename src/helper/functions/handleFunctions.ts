import {Linking, Share, ToastAndroid} from "react-native";
import {storeToLocalStorage} from "../../utils/localStorageFunctions";
import {updateStrapiData} from "../../../api/strapiJSAPI";

// Generic function to handle bookmarking for any type of items (opportunities, techTips, etc.)
const handleBookmark = async (
  id: string | number,
  items: any[],
  setItems: (updatedItems: any[]) => void,
  storageKey: 'products' | string,
  savedMessage: string,
  removedMessage: string,
  jwt?: string,
) => {
  const updatedItems = [...items];
  const targetIndex = updatedItems.findIndex(item => item.id === id);
  const targetItem = updatedItems[targetIndex];
  const toastMessage = targetItem.bookmarked ? removedMessage : savedMessage;

  if (storageKey === 'products') {
    const meta_data = targetItem.meta;
    let newChange: Object = {};
    if (meta_data) {
      newChange = {
      ...meta_data,
      "bookmarked": !meta_data.bookmarked,
    }
    } else {
      newChange = {
        "bookmarked": true,
      }
    }
    targetItem.meta = newChange;

    updatedItems[targetIndex] = targetItem;

    setItems(updatedItems);

    const response = await updateStrapiData('products', id as number, {meta: newChange}, jwt);
    console.log(response.data.attributes.meta);
    await storeToLocalStorage(storageKey, updatedItems);

    ToastAndroid.show(`${toastMessage}`, 3000);

  } else {
    if (targetIndex !== -1) {
      // Toggle bookmark status
      targetItem.bookmarked = !targetItem.bookmarked;

      updatedItems[targetIndex] = targetItem;

      setItems(updatedItems);

      // Update local storage
      await storeToLocalStorage(storageKey, updatedItems);
      ToastAndroid.show(`${toastMessage}`, 3000);
    }
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