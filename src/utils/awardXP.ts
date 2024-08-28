import {BASE_URL} from "@env";
import {storeData} from "../../api/strapiJSAPI";
import {retrieveLocalData, storeToLocalStorage} from "./localStorageFunctions";

  // Give points to the user for viewing the product.
const awardXP = async (AWARD: any, itemID: number, authToken: string, userID: number) => {
  const award = await retrieveLocalData('award-token');
  const views = await
    (await fetch(`${BASE_URL}/api/views?filters[resourceId][$eq]=${itemID}&populate[user][filters][id][$eq]=${userID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
      }})).json();
  // console.log(views.data.length);
  if (award && award[itemID] && views.data.length >= 3) {
    if (award[itemID] !== 'THIRD') {
      await storeData(
        'rewards',
        {
          event: 1,
          rewardType: 'xp',
          amount: AWARD[award[itemID] === 'FIRST' ? 'SECOND' : 'THIRD'],
          status: 'pending',
          transactionType: 'earned',
          user: userID,
        }, authToken);
      const viewResponse = await storeData(
        'views',
        {
          user: userID,
          resourceId: itemID,
          type: 'Product'
        }, authToken
      );
      await storeToLocalStorage('award-token', {...award, [itemID]: `${award[itemID] === 'FIRST' ? 'SECOND' : 'THIRD'}`});
      return AWARD[award[itemID] === 'FIRST' ? 'SECOND' : 'THIRD'] ?? 0
    }
  } else {
    if (views.data.length >= 0) {
      return
    } else {
      await storeData(
      'rewards',
      {
        event: 1,
        rewardType: 'xp',
        amount: AWARD['FIRST'],
        status: 'pending',
        transactionType: 'earned',
        user: userID,
      }, authToken);
    
    await storeData(
        'views',
        {
          user: userID,
          resourceId: itemID,
          type: 'Product'
      },
        authToken
    );
    
    await storeToLocalStorage('award-token', {...award, [itemID]: 'FIRST'});
    return AWARD['FIRST'] ?? 0;
    }
  }
}

export default awardXP;