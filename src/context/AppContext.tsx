import React, { useState, createContext, useEffect, useCallback } from 'react';

import {getData} from '@api/grapiql';
import {getMe} from '@api/strapiJSAPI';
import {retrieveLocalData, storeToLocalStorage} from '@utils/localStorageFunctions';
import ProductProvider from './ProductContext';
import { createClientSocket } from '@src/lib/socket';
import { Socket } from 'socket.io-client';

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
  hasMoreOffers: boolean;
  setHasMoreOffers: React.Dispatch<React.SetStateAction<boolean>>;
  // products: any[];
  // setProducts: React.Dispatch<React.SetStateAction<any[]>>;
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
  setOpportunities: () => { },
  hasMoreOffers: true,
  setHasMoreOffers: () => {},
  // products: [],
  // setProducts: () => {},
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
  const [codeTips, setCodeTips] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [community, setCommunity] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [hasMoreOffers, setHasMoreOffers] = useState<boolean>(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  // real time.
  const setupSocket = useCallback(() => {
    const clientSocket = createClientSocket(jwt);
    setSocket(clientSocket);
    clientSocket.on('connect', () => {
      clientSocket.on('onlineUsers', (data) => { });
    })

    clientSocket.on('opportunity:create', ({ data }) => {
      setOpportunities([...opportunities, data]);
    });
  }, [socket]);
  const fetchInitialData = async () => {
    try {
      // Run all fetches concurrently
      const [localOpportunities = [], localTechTips = [], localProducts = []] = await Promise.all([
        retrieveLocalData('opportunities'),
        retrieveLocalData('techTips'),
        retrieveLocalData('products')
      ]);

      const [
        user_, inCommunity, isNofityOn,
        // productsData,
        opportunitiesData, techTips] = await Promise.all([
        getMe(),
        retrieveLocalData('isMember'),
        retrieveLocalData('tokens'),
        // (await getData('products')).data,
        (await getData('opportunities')),
        (await getData('techTips')),
      ]);

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
      const updatedOpportunities = opportunitiesData.data.map((opp: any) => ({
        ...opp,
        bookmarked: localOpportunities.find((localOpp: any) => localOpp.id === opp.id)?.bookmarked ?? false,
      }));

      const updatedTechTips = techTips.data.map((tip: any) => ({
        ...tip,
        bookmarked: localTechTips.find((localTip: any) => localTip.id === tip.id)?.bookmarked ?? false,
      }));

      // Update state
      setOpportunities(updatedOpportunities);
      setCodeTips(updatedTechTips);
      setHasMoreOffers(opportunitiesData.hasMore);

      // Cache data
      storeToLocalStorage('opportunities', updatedOpportunities);
      storeToLocalStorage('techTips', updatedTechTips);
      // storeToLocalStorage('products', updatedProducts);

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
    hasMoreOffers,
    setHasMoreOffers,
    // products,
    // setProducts,
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

  useEffect(() => {
    setupSocket();
    return () => {
      socket?.off('connect');
      socket?.off('opportunity:create');
    }
  }, []);
  return (
    <ProductProvider>
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    </ProductProvider>
  );
};

export default AppContextProvider;
