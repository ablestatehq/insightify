import {useUser} from "@src/context/UserContext";
import {useProducts} from "@src/context/ProductContext";
import {usePosts} from "@src/context/post-context";
import {useCodeTips} from "@src/context/TipsContext";
import {useOffers} from "@src/context/OpportunityContext";

import useChat from './useChat';
import useFilter from "./useFilter";
import useLocalStorage from "./useLocalStorage";
import {
  background_func,
  // useNetworkStatus,
  registerBackgroundFetchAsync, unregisterBackgroundFetchAsync
} from "./useBg-fucs";
import useOpportunities from "./useOpportunities";
import useProfile from "./useProfile";
import usePushNotifications from "./usePushNotification";

export {
  useUser,
  usePosts,
  useProducts,
  useCodeTips,
  useOffers,
  useChat,
  useFilter,
  useLocalStorage,
  background_func,
  useOpportunities,
  useProfile,
  usePushNotifications,
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync
};
