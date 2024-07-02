import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import {getMe} from '../../../api/strapiJSAPI';
import {retrieveLocalData, storeToLocalStorage} from '../../utils/localStorageFunctions';
import {getData} from '../../../api/grapiql';

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  jwt: string
  setJwt: React.Dispatch<React.SetStateAction<string>>
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  // isInCommunity: boolean
  // setIsInCommunity: React.Dispatch<React.SetStateAction<boolean>>
  codeTips: any[]
  setCodeTips: React.Dispatch<React.SetStateAction<any[]>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  opportunities: any[]
  setOpportunities: React.Dispatch<React.SetStateAction<any[]>>
  isNotificationEnabled: boolean
  setIsNotificationEnabled: React.Dispatch<React.SetStateAction<boolean>>
  notifications: any[],
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>,
  comments: any[],
  setComments: React.Dispatch<React.SetStateAction<any[]>>,
  community: any[],
  setCommunity: React.Dispatch<React.SetStateAction<any[]>>,
}

export const AppContext = createContext<AppContextType>({
  jwt: '',
  setJwt: () => { },
  user: {},
  setUser: () => { },
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
  comments:[],
  setComments: () => { },
  community: [],
  setCommunity: () => {},
})

const AppContextProvider = (
  {
    children
  }: AppContextProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [jwt, setJwt] = useState<string>('');
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [codeTips, setCodeTips] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [community, setCommunity] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inCommunity = await retrieveLocalData('isMember');
        const user_ = await getMe();

        if (user_.ok) {
          setIsLoggedIn(true);
          setUser((prev: any) => ({...user_.data, isMember: inCommunity.isMember}));
          setJwt(user_.jwt);
        }

        const oppos = (await getData('opportunities')).data;
        const techTips = (await getData('techTips')).data;
        const comments_ = (await getData('comments')).data;
        const sent_notifications = (await getData('sentNotifications')).data
        const community_members = (await getData('communityMembers')).data
        const tokens = await getData('notificationTokens');

        const localNotification = await retrieveLocalData('notifications');
        const local_opportunities = await retrieveLocalData('opportunities');
        const loacl_techTips = await retrieveLocalData('techTips');
        const pushNotificationResponse = await retrieveLocalData('tokens');
        const profilePicture = await retrieveLocalData('profilePicture');

        if (pushNotificationResponse) {
          const { isPushNotificationEnabled } = pushNotificationResponse;
          setIsNotificationEnabled(isPushNotificationEnabled);
        }

        // When there is a response from the database.
        if (oppos) {
          setOpportunities(prev => {
            const updatedOpportunity = oppos.map((opp: any) => {
              return ({
                ...opp,
                bookmarked: local_opportunities?.find((local_opp: any) => local_opp.id == opp.id)?.bookmarked ?? false
              })
            });

            const newOpportunities = [...prev, ...updatedOpportunity];
            storeToLocalStorage('opportunities', newOpportunities);
            return newOpportunities;
          });
          
        }
        else {
          setOpportunities(prev => [...prev, ...local_opportunities]);
        }

        // tech tips 
        if (techTips) {
          setCodeTips(prev => {
            const updatedCodeTip = techTips.map((tip: any) => {
              return ({
                ...tip,
                bookmarked: loacl_techTips?.find((local_tip: any) => local_tip.id == tip.id)?.bookmarked ?? false
              })
            });

            const newCodeTips = [...prev, ...updatedCodeTip];
            storeToLocalStorage('techTips', newCodeTips)

            return newCodeTips
          });
        }
        else {
          setCodeTips(prev => [...prev, ...loacl_techTips]);
        }

        if (comments_) {
          setComments(_prev => [..._prev, ...comments_]);
        }

        // notifications
        if (localNotification) {
          setNotifications(prev => [...prev, ...localNotification]);
        }
        // // inCommunity
        // if(inCommunity){
        //   setIsInCommunity(inCommunity.isMember);
        // }

        if (community_members) {
          setCommunity(prev => [...prev, ...community_members]);
        }
      }
      catch (error: any) { }
      finally {setIsLoading(false)}
    }

    fetchData();

  }, []);


  const contextValue: AppContextType = {
    user,
    setUser,
    jwt,
    setJwt,
    isLoading,
    setIsLoading,
    // isInCommunity,
    // setIsInCommunity,
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
    comments,
    setComments,
    community,
    setCommunity
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;