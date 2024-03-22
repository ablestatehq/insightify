import { Linking, Share, ToastAndroid} from "react-native";
import { storeToLocalStorage } from "../../utils/localStorageFunctions";

// Function to handle opportunity bookmarking 
const handleBookmark = async (id: string, opportunities:any[], setOpportunities:(opp:any[]) => void) => {
  const updatedOpportunities = [...opportunities];
  const targetIndex = updatedOpportunities.findIndex(opportunity => opportunity.id === id);

  if (targetIndex !== -1) {
    const targetOpportunity = updatedOpportunities[targetIndex];

    const toastMessage = targetOpportunity.bookmarked ? 'Removed from saved' : 'Saved this for you'
    // Toggle bookmark status
    targetOpportunity.bookmarked = !targetOpportunity.bookmarked;

    updatedOpportunities[targetIndex] = targetOpportunity;

    setOpportunities(updatedOpportunities);

    // Update local storage
    await storeToLocalStorage('opportunities', updatedOpportunities);
    ToastAndroid.show(`${toastMessage}`, 3000);
  }
};

// Function to handle techtips bookmarking
async function bookmarkCodeTips(id: string, codeTips: any[], setCodeTips: (tip: any[]) => void) {
  const updatedCodetips = [...codeTips];
  const targetIndex = updatedCodetips.findIndex(opportunity => opportunity.id === id);

  if (targetIndex !== -1) {
    const targetCodeTips = updatedCodetips[targetIndex];

    const toastMessage = targetCodeTips.bookmarked ? 'Removed from watch list' : 'Saved this for you';

    // Toggle bookmark status
    targetCodeTips.bookmarked = !targetCodeTips.bookmarked;

    updatedCodetips[targetIndex] = targetCodeTips;

    setCodeTips(updatedCodetips);

    // Update local storage
    await storeToLocalStorage('techTips', updatedCodetips);
    ToastAndroid.show(`${toastMessage}`, 3000);
  }
}
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
  bookmarkCodeTips
}