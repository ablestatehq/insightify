import {getData} from '../../../api/grapiql';
import {getMe} from '../../../api/strapiJSAPI';
import React, { useState, createContext, useEffect } from 'react';
import { retrieveLocalData, storeToLocalStorage } from '../../utils/localStorageFunctions';

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
  setJwt: () => { },
  user: {},
  setUser: () => { },
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
  products: [],
  setProducts: () => { },
  isNotificationEnabled: false,
  setIsNotificationEnabled: () => { },
  notifications: [],
  setNotifications: () => { },
  comments: [],
  setComments: () => { },
  community: [],
  setCommunity: () => { },
  fetchAdditionalData: async () => { },
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
      const inCommunity = await retrieveLocalData('isMember');
      const isNofityOn = await retrieveLocalData('tokens');
      if (isNofityOn) {
        setIsNotificationEnabled(isNofityOn?.isPushNotificationEnabled);
      }
      const user_ = await getMe();
      if (user_.ok) {
        setXp(user_.data.totalXP ? user_.data.totalXP : 0);
        setIsLoggedIn(true);
        if (inCommunity) {
          setUser((prev: any) => ({ ...user_.data, isMember: inCommunity.isMember }));
          setJwt(user_.jwt);
        }
      }

      const techTips = (await getData('techTips')).data;
      const _products = (await getData('products')).data;
      const oppos = (await getData('opportunities')).data;

      const local_opportunities = await retrieveLocalData('opportunities');
      const local_techTips = await retrieveLocalData('techTips');
      const local_bookmarked_prods = await retrieveLocalData('products');

      if (oppos) {
        setOpportunities((prev) => {
          const updatedOpportunity = oppos.map((opp: any) => ({
            ...opp,
            bookmarked: local_opportunities?.find((local_opp: any) => local_opp.id === opp.id)?.bookmarked ?? false,
          }));
          const newOpportunities = [...prev, ...updatedOpportunity];
          storeToLocalStorage('opportunities', newOpportunities);
          return newOpportunities;
        });
      } else {
        setOpportunities((prev) => [...prev, ...local_opportunities]);
      }

      if (techTips) {
        setCodeTips((prev) => {
          const updatedCodeTip = techTips.map((tip: any) => ({
            ...tip,
            bookmarked: local_techTips?.find((local_tip: any) => local_tip.id === tip.id)?.bookmarked ?? false,
          }));
          const newCodeTips = [...prev, ...updatedCodeTip];
          storeToLocalStorage('techTips', newCodeTips);
          return newCodeTips;
        });
      } else {
        setCodeTips((prev) => [...prev, ...local_techTips]);
      }

      if (_products) {
        setProducts((prev) => {
          storeToLocalStorage('products', _products.slice(0,4));
          return [...prev, ..._products]
        });

      } else {
        setProducts((prev) => [...prev, ...local_bookmarked_prods]);
      }
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAdditionalData = async () => {
    try {
      const comments_ = (await getData('comments')).data;
      const sent_notifications = (await getData('sentNotifications')).data;
      const community_members = (await getData('communityMembers')).data;
      const localNotification = await retrieveLocalData('notifications');

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
