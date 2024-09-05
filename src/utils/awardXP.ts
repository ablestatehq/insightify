import {BASE_URL} from "@env";
import {storeData} from "../../api/strapiJSAPI";
import {retrieveLocalData, storeToLocalStorage} from "./localStorageFunctions";

  // Give points to the user for viewing the product.
const awardXP = async (AWARD: any, itemID: number, authToken: string, userID: number) => {
  try {
    const award = await retrieveLocalData('award-token');
    const views = await
      (await fetch(`${BASE_URL}/api/views?filters[resourceId][$eq]=${itemID}&populate[user][filters][id][$eq]=${userID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
          }
        })).json();
    
    // check the response from the endpoint
    if (!views || !views.data) {
      return;
    }

    // if the response is of the format we expoect, proceed
    const viewCount = views.data.length || 0;
    
    if (award[itemID] && viewCount >= 3) {
      if (award[itemID] !== 'THIRD') {
        const newAwardType = award[itemID] === 'FIRST' ? 'SECOND' : 'THIRD';
        await storeData(
          'rewards',
          {
            event: 1,
            rewardType: 'xp',
            amount: AWARD[newAwardType],
            status: 'pending',
            transactionType: 'earned',
            user: userID,
          },
          authToken
        );

        await storeData(
          'views',
          {
            user: userID,
            resourceId: itemID,
            type: 'Product'
          },
          authToken
        );

        await storeToLocalStorage('award-token', { ...award, [itemID]: newAwardType });
        return AWARD[newAwardType] ?? 0;
      }
    } else if (viewCount === 0) {
      await storeData(
        'rewards',
        {
          event: 1,
          rewardType: 'xp',
          amount: AWARD['FIRST'],
          status: 'pending',
          transactionType: 'earned',
          user: userID,
        },
        authToken
      );
      
      await storeData(
        'views',
        {
          user: userID,
          resourceId: itemID,
          type: 'Product'
        },
        authToken
      );
      
      await storeToLocalStorage('award-token', { ...award, [itemID]: 'FIRST' });
      return AWARD['FIRST'] ?? 0;
    }
  } catch (error) {
    console.error('awardXP function error: ', error)
  }
}

export default awardXP;