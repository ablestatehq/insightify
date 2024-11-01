import React, { useState, createContext, useEffect } from 'react';

import {getData} from '@api/grapiql';
import {getMe} from '@api/strapiJSAPI';
import {ProductData} from '@utils/types';
import {retrieveLocalData, storeToLocalStorage} from '@utils/localStorageFunctions';

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  xp: number,
  setXp: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  codeTips: any[];
  setCodeTips: React.Dispatch<React.SetStateAction<any[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  opportunities: any[];
  setOpportunities: React.Dispatch<React.SetStateAction<any[]>>;
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  isNotificationEnabled: boolean;
  setIsNotificationEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  comments: any[];
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
  community: any[];
  setCommunity: React.Dispatch<React.SetStateAction<any[]>>;
  fetchAdditionalData: () => Promise<void>;
}

export const AppContext = createContext<AppContextType>({
  jwt: '',
  setJwt: () => {},
  user: {},
  setUser: () => {},
  xp: 0,
  setXp: () => {},
  isLoading: true,
  setIsLoading: () => {},
  codeTips: [],
  setCodeTips: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  opportunities: [],
  setOpportunities: () => {},
  products: [],
  setProducts: () => {},
  isNotificationEnabled: false,
  setIsNotificationEnabled: () => {},
  notifications: [],
  setNotifications: () => {},
  comments: [],
  setComments: () => {},
  community: [],
  setCommunity: () => {},
  fetchAdditionalData: async () => {},
});

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [xp, setXp] = useState<number>(0);
  const [jwt, setJwt] = useState<string>('');
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [codeTips, setCodeTips] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [community, setCommunity] = useState<any[]>([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // Run all fetches concurrently
      // const [localOpportunities = [], localTechTips = [], localProducts = []] = await Promise.all([
      //   retrieveLocalData('opportunities'),
      //   retrieveLocalData('techTips'),
      //   retrieveLocalData('products')
      // ]);

      const [user_, inCommunity, isNofityOn, productsData, opportunitiesData, techTips] = await Promise.all([
        getMe(),
        retrieveLocalData('isMember'),
        retrieveLocalData('tokens'),
        (await getData('products')).data,
        (await getData('opportunities')).data,
        (await getData('techTips')).data,
      ]);

      console.log("User: ", user_);
      console.log("products", products);
      // User & Notification Logic
      if (isNofityOn) {
        setIsNotificationEnabled(isNofityOn.isPushNotificationEnabled);
      }
      if (user_.ok) {
        setUser({
          ...user_.data,
          isMember: inCommunity?.isMember ?? false,
        });
        setJwt(user_.jwt);
        setXp(user_.data.totalXP ?? 0);
        setIsLoggedIn(true);
      }

      // Opportunities, TechTips, Products
      const updatedOpportunities = opportunitiesData.map((opp: any) => ({
        ...opp,
        // bookmarked: localOpportunities.find((localOpp: any) => localOpp.id === opp.id)?.bookmarked ?? false,
      }));

      const updatedTechTips = techTips.map((tip: any) => ({
        ...tip,
        // bookmarked: localTechTips.find((localTip: any) => localTip.id === tip.id)?.bookmarked ?? false,
      }));

      const updatedProducts = productsData.map((product: ProductData) => ({
        ...product,
        meta: {
          ...product.meta,
          // bookmarked: localProducts.find((localProd: ProductData) => localProd.id === product.id)?.meta?.bookmarked ?? false,
        }
      }));

      // Update state
      setOpportunities(updatedOpportunities);
      setCodeTips(updatedTechTips);
      setProducts(updatedProducts);

      // Cache data
      storeToLocalStorage('opportunities', updatedOpportunities);
      storeToLocalStorage('techTips', updatedTechTips);
      storeToLocalStorage('products', updatedProducts);

    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchAdditionalData = async () => {
    try {
      const [comments_, sent_notifications, community_members, localNotification] = await Promise.all([
        (await getData('comments')).data,
        (await getData('sentNotifications')).data,
        (await getData('communityMembers')).data,
        retrieveLocalData('notifications'),
      ]);

      if (comments_) {
        setComments((prev) => [...prev, ...comments_]);
      }

      if (localNotification) {
        setNotifications((prev) => [...prev, ...localNotification]);
      }

      if (community_members) {
        setCommunity((prev) => [...prev, ...community_members]);
      }
    } catch (error: any) { }
  };

  const contextValue: AppContextType = {
    user,
    setUser,
    jwt,
    setJwt,
    xp,
    setXp,
    isLoading,
    setIsLoading,
    codeTips,
    setCodeTips,
    isLoggedIn,
    setIsLoggedIn,
    opportunities,
    setOpportunities,
    products,
    setProducts,
    isNotificationEnabled,
    setIsNotificationEnabled,
    notifications,
    setNotifications,
    comments,
    setComments,
    community,
    setCommunity,
    fetchAdditionalData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
