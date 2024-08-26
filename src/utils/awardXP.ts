import {storeData} from "../../api/strapiJSAPI";
import {retrieveLocalData, storeToLocalStorage} from "./localStorageFunctions";

  // Give points to the user for viewing the product.
const awardXP = async (AWARD: any, itemID: number, authToken: string, userID: number) => {
  const award = await retrieveLocalData('award-token');
  console.log('Award: ', award);
  if (award) {
    console.log('Another try: ', award[itemID]);
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
    console.log('First time here: ', AWARD['FIRST']);
    await storeToLocalStorage('award-token', {[itemID]: 'FIRST'});
    return AWARD['FIRST'] ?? 0;
  }
}

export default awardXP;