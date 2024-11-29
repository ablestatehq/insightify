import React, { useState, createContext, useEffect, useCallback } from 'react';

import { fetchNextBatch, getData } from '@api/grapiql';
import { getMe } from '@api/strapiJSAPI';
import { retrieveLocalData } from '@utils/localStorageFunctions';
import ProductProvider from './ProductContext';
import { createClientSocket } from '@src/lib/socket';
import { Socket } from 'socket.io-client';
import PostProvider from './post-context';
import fetchWithCache from '@src/utils/fetch-with-cache';

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  codeTips: any[];
  setCodeTips: React.Dispatch<React.SetStateAction<any[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  opportunities: any[];
  setOpportunities: React.Dispatch<React.SetStateAction<any[]>>;
  isNotificationEnabled: boolean;
  setIsNotificationEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  fetchAdditionalData: (endpoint: string, start: number) => Promise<void>;
}

export const AppContext = createContext<AppContextType>({
  jwt: '',
  setJwt: () => { },
  user: {},
  setUser: () => { },
  errors: {},
  setErrors: () => {},
  xp: 0,
  setXp: () => { },
  isLoading: true,
  setIsLoading: () => { },
  codeTips: [],
  setCodeTips: () => { },
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  opportunities: [],
  setOpportunities: () => { },
  isNotificationEnabled: false,
  setIsNotificationEnabled: () => { },
  notifications: [],
  setNotifications: () => { },
  fetchAdditionalData: async (endpoint: string, start: number) => {},
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [errors, setErrors] = useState<any>({});

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
      const [
        user_, inCommunity, isNofityOn,
      ] = await Promise.all([
        getMe(),
        retrieveLocalData('isMember'),
        retrieveLocalData('tokens'),
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

      // Opportunities, TechTips
      const [opportunity_data, tech_tips_data] = await Promise.all([
        fetchWithCache('opportunities', () => getData('opportunities')),
        fetchWithCache('techTips', () => getData('techTips')),
      ]);

      // Update state
      setOpportunities(opportunity_data);
      setCodeTips(tech_tips_data);

    } catch (error: any) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdditionalData = async (endpoint: string, start: number) => {
    try {
      switch (endpoint) {
        case 'opportunities':
          const newOpps = await fetchNextBatch('opportunities', start);
          if (!newOpps.data && newOpps.error) {
            return;
          } else {
            setOpportunities(prev => {
              const existingIds = prev.map((item) => item.id);
              const filteredNewOpps = newOpps.data.filter((item:any) => !existingIds.includes(item.id));
              return [...prev, ...filteredNewOpps];
            });
          }
          break;
        case 'techtips':
          const newTechTips = await fetchNextBatch('techTips', start as number);
          if (!newTechTips.data && newTechTips.error) {
            return;
          } else {
            setCodeTips(prev => {
              const existingIds = new Set(prev.map((item) => item.id));
              const filteredNewOpps = newTechTips.data.filter((item: any) => !existingIds.has(item.id));
              return [...prev, ...filteredNewOpps];
            });
          }
          break;
        case 'products':
          const newProducts = await fetchNextBatch('products', start as number);
          if (!newProducts.data && newProducts.error) {
            return;
          } else {
            setCodeTips(prev => {
              const existingIds = new Set(prev.map((item) => item.id));
              const filteredNewProducts = newProducts.data.filter((item: any) => !existingIds.has(item.id));
              return [...prev, ...filteredNewProducts];
            });
          }
          break;
      }
    } catch (error: any) { }
  };

  const contextValue: AppContextType = {
    user,
    setUser,
    jwt,
    setJwt,
    errors,
    setErrors,
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
    isNotificationEnabled,
    setIsNotificationEnabled,
    notifications,
    setNotifications,
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
      <PostProvider>
        <AppContext.Provider value={contextValue}>
          {children}
        </AppContext.Provider>
      </PostProvider>
    </ProductProvider>
  );
};

export default AppContextProvider;
