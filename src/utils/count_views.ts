import {updateStrapiData} from "@api/strapiJSAPI";
import {retrieveLocalData, storeToLocalStorage} from "./localStorageFunctions";
import { fetchDataByID } from "@api/grapiql";


const count_post_view = async (
  itemID: number,
  authToken: string | null,
  transform?: (id: number, views: number) => void
) => {
  try {
    const viewed_items = await retrieveLocalData('viewed_items');
    if (viewed_items && viewed_items.post_ids.includes(itemID)) {
      return;
    }
    const views = await fetchDataByID('posts', itemID);
    if (views.data) {
      const response = await updateStrapiData('posts',
        itemID,
        {
          views: views.data.views ? Number(views.data.views) + 1 : 1
        },
        authToken ? authToken : undefined);
      
      if (response.data) {
        transform?.(itemID, views.data.views ? Number(views.data.views) + 1 : 1); // run t
        const newViewedItems = viewed_items ?
          { ...viewed_items, post_ids: [...viewed_items.post_ids, itemID] } :
          { post_ids: [itemID] };
        storeToLocalStorage('viewed_items', newViewedItems);
      }
    }

  } catch (error) { }
};

export default count_post_view;