import { Linking, Share, Alert, } from "react-native";
import { retrieveLocalData, storeToLocalStorage } from "../../utils/localStorageFunctions";

// Function to handle opportunity bookmarking 
const handleBookmark = async (id: string, opportunities:any[], setOpportunities:(opp:any[]) => void) => {
  const updatedOpportunities = [...opportunities];
  const targetIndex = updatedOpportunities.findIndex(opportunity => opportunity.$id === id);

  if (targetIndex !== -1) {
    const targetOpportunity = updatedOpportunities[targetIndex];

    // Toggle bookmark status
    targetOpportunity.bookmarked = !targetOpportunity.bookmarked;

    updatedOpportunities[targetIndex] = targetOpportunity;

    setOpportunities(updatedOpportunities);

    // Update local storage
    try {
      const bookmarkedData = await retrieveLocalData('opportunities');
      const updatedBookmarkedData = bookmarkedData ? bookmarkedData.filter((oppId: string) => oppId !== id) : [];

      if (targetOpportunity.bookmarked) {
        updatedBookmarkedData.push(id);
      } else {
        updatedBookmarkedData.filter((removeId: string) => removeId !== id)
      }

      await storeToLocalStorage('opportunities', updatedBookmarkedData);
    } catch (error) {
      console.log(error);
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
    Alert.alert(error.message)
  }
}

export {
  OpenLink,
  onShare,
  handleBookmark
}