import {BASE_URL} from "@env";
import {storeData} from "@api/strapiJSAPI";
import {retrieveLocalData, storeToLocalStorage} from "./localStorageFunctions";

// When the user views the discussion for the first time.
// Count it has a view

const count_post_view = async (AWARD: any, itemID: number, authToken: string, userID: number) => {
  try {
    const viewed_items = await retrieveLocalData('viewed_items');
    // const views = await
    //   (await fetch(`${BASE_URL}/api/views?filters[resourceId][$eq]=${itemID}&populate[user][filters][id][$eq]=${userID}`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${authToken}`
    //       }
    //     })).json();
    
    // check the response from the endpoint
    // if (!viewed_items) {
    //   return;
    // }
    
      await storeData(
        'post',
        {
          view: 1
        },
        authToken
      );
      
      // await storeToLocalStorage('viewed_items', { ...viewed_items, [itemID]: 'FIRST' });
  } catch (error) {}
}

export default count_post_view;