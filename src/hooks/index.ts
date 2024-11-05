import { useUser } from "@src/context/UserContext";
import { useProducts } from "@src/context/ProductContext";
import { useCodeTips } from "@src/context/TipsContext";
import { useOffers } from "@src/context/OpportunityContext";

import useChat from './useChat';
import useFilter from "./useFilter";
import useLocalStorage from "./useLocalStorage";
import { useNetworkStatus, registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from "./useNetworkStatus";
import useOpportunities from "./useOpportunities";
import useProfile from "./useProfile";
import usePushNotifications from "./usePushNotification";

export {
  useUser,
  useProducts,
  useCodeTips,
  useOffers,
  useChat,
  useFilter,
  useLocalStorage,
  useNetworkStatus,
  useOpportunities,
  useProfile,
  usePushNotifications,
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync
};
