import {Linking, Share, ToastAndroid} from "react-native";
import {storeToLocalStorage} from "@utils/localStorageFunctions";

const handleBookmark = async (
  id: string | number,
  items: any[],
  setItems: (updatedItems: any[]) => void,
  storageKey: 'products' | string,
  savedMessage: string,
  removedMessage: string,
  jwt?: string,
) => {
  // console.log('id', id);
  const targetIndex = items.findIndex(item => item.id === id);
  if (targetIndex === -1) {
    console.warn(`Item with id ${id} not found.`);
    return;
  }

  const targetItem = items[targetIndex];
  const isBookmarked = targetItem?.meta?.bookmarked ?? targetItem?.bookmarked;
  const toastMessage = isBookmarked ? removedMessage : savedMessage;

  // if ((storageKey === 'products' && isBookmarked === targetItem.meta?.bookmarked) ||
  //   (storageKey !== 'products' && isBookmarked === targetItem.bookmarked)) {
  //   // console.log('It is here', id);
  //   return;
  // }
  let updatedItems;
  
  if (storageKey === 'products') {
    updatedItems = items.map((item, index) => {
      if (index === targetIndex) {
        return {
          ...item,
          meta: {
            ...item.meta,
            bookmarked: !isBookmarked,
          },
        };
      }
      return item;
    });
  } else {
    updatedItems = items.map((item, index) => {
      if (index === targetIndex) {
        return {
          ...item,
          bookmarked: !isBookmarked,
        };
      }
      return item;
    });
  }

  setItems(updatedItems);

  // Update local storage only for the changed item to optimize performance
  await storeToLocalStorage(storageKey, updatedItems[targetIndex]);

  // Show toast message (debounce if called frequently)
  ToastAndroid.show(toastMessage, 3000);
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