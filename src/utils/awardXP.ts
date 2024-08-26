import {storeData} from "../../api/strapiJSAPI";
import {retrieveLocalData, storeToLocalStorage} from "./localStorageFunctions";

  // Give points to the user for viewing the product.
const awardXP = async (AWARD: any, itemID: number, authToken: string, userID: number) => {
  const award = await retrieveLocalData('award-token');
  if (award && award[itemID]) {
    if (award[itemID] !== 'THIRD') {
      await storeData(
        'rewards',
        {
          event: 1,
          rewardType: 'XP',
          amount: AWARD[award[itemID] === 'FIRST' ? 'SECOND' : 'THIRD'],
          status: 'pending',
          transactionType: 'earned',
          user: userID,
        }, authToken);
      
      await storeToLocalStorage('award-token', {...award, [itemID]: `${award[itemID] === 'FIRST' ? 'SECOND' : 'THIRD'}`});
      return AWARD[award[itemID] === 'FIRST' ? 'SECOND' : 'THIRD'] ?? 0
    }
  } else {
    await storeToLocalStorage('award-token', {...award, [itemID]: 'FIRST'});
    return AWARD['FIRST'] ?? 0;
  }
}

export default awardXP;