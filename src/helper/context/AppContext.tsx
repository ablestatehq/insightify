import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import socket from '../../../api/socket';
import {getMe, getStrapiData} from '../../../api/strapiJSAPI';
import {retrieveLocalData, storeToLocalStorage} from '../../utils/localStorageFunctions';


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
  isInCommunity: boolean
  setIsInCommunity: React.Dispatch<React.SetStateAction<boolean>>
  codeTips: any[]
  setCodeTips: React.Dispatch<React.SetStateAction<any[]>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  opportunities: any[]
  setOpportunities: React.Dispatch<React.SetStateAction<any[]>>
  isNotificationEnabled: boolean
  setIsNotificationEnabled: React.Dispatch<React.SetStateAction<boolean>>
  notifications: any[],
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
}

export const AppContext = createContext<AppContextType>({
  jwt: '',
  setJwt: () => { },
  user: {},
  setUser: () => { },
  isLoading: true,
  setIsLoading: () => { },
  isInCommunity: false,
  setIsInCommunity: () => { },
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

  const [isInCommunity, setIsInCommunity] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get me 
        const user_ = await getMe();

        if (user_.ok) {
          console.log(user_.jwt)
          console.log(user_.data);
          setIsLoggedIn(true);
          setUser(user_.data);
          setJwt(user_.jwt);
        }

        // fetch remote data from the api 
        const techTips = await getStrapiData('tech-tips');
        const oppos = await getStrapiData('opportunities');
        const sent_notifications = await getStrapiData('sent-notifications');

        // console.log(oppos[5].Description)
        const inCommunity = await retrieveLocalData('joined_comm');
        const localNotification = await retrieveLocalData('notifications');
        const local_opportunities = await retrieveLocalData('opportunities');
        const loacl_techTips = await retrieveLocalData('techTips');
        const pushNotificationResponse = await retrieveLocalData('tokens');

        // console.log("This is it",local_opportunities[0].id)
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

            // Sort the opportunites to bring the lasted notifications first.
            const sortedOpportunities = updatedOpportunity.sort((a: any, b: any) => {
              const dateA = new Date(a?.publishedAt)
              const dateB = new Date(b?.publishedAt)

              return (dateB as any) - (dateA as any)
            });

            const newOpportunities = [...prev, ...sortedOpportunities];
            storeToLocalStorage('opportunities', newOpportunities)

            return newOpportunities
          });
          
        } else {
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

            // Sort the opportunites to bring the lasted notifications first.
            const sortedCodeTips = updatedCodeTip.sort((a: any, b: any) => {
              const dateA = new Date(a?.publishedAt)
              const dateB = new Date(b?.publishedAt)

              return (dateB as any) - (dateA as any)
            });

            const newCodeTips = [...prev, ...sortedCodeTips];
            storeToLocalStorage('techTips', newCodeTips)

            return newCodeTips
          });
        } else {
          setCodeTips(prev => [...prev, ...loacl_techTips]);
        }

        // notifications
        if (localNotification) {
          setNotifications(prev => [...prev, ...localNotification]);
        }
        // inCommunity
        if(inCommunity){
          setIsInCommunity(inCommunity.isJoined);
        }
      }
      catch (error: any) { }
      finally { setIsLoading(false) }
    }

    fetchData();

    const s = socket.connect();

    s.on('notifications', async (notes: any) => {
      if (notes.data.model != 'talent-request') {
        const localNotifications = await retrieveLocalData('notifications');
        if (localNotifications) {
          if (!localNotifications.some((element: any) => (element.notification_data.data.entry.id == notes.data.entry.id && element.notification_data.data.model == notes.data.model))) {
            setNotifications(prev => [...prev, {
              'notification_data': notes,
              'status': 'UNREAD'
            }]);
            await storeToLocalStorage('notifications', [...localNotifications, {
              'notification_data': notes,
              'status': 'UNREAD'
            }])
          }
        } else {
          setNotifications(prev => [...prev, {
            'notification_data': notes,
            'status': 'UNREAD'
          }]);
          await storeToLocalStorage('notifications', [{
            'notification_data': notes,
            'status': 'UNREAD'
          }])
        }
      }
    })

    return () => {
    }
  }, []);


  const contextValue: AppContextType = {
    user,
    setUser,
    jwt,
    setJwt,
    isLoading,
    setIsLoading,
    isInCommunity,
    setIsInCommunity,
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
  };


  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;