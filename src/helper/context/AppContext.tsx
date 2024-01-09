import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import socket from '../../../api/socket';
import { getStrapiData } from '../../../api/strapiJSAPI';
import { retrieveLocalData, storeToLocalStorage } from '../../utils/localStorageFunctions';


interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
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
});

const AppContextProvider = (
  {
    children
  }: AppContextProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [codeTips, setCodeTips] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch remote data from the api 
        const techTips = await getStrapiData('tech-tips');
        const oppos = await getStrapiData('opportunities');
        // console.log(techTips)
        // fetch local data 
        const localNotification = await retrieveLocalData('notifications');
        const bookmarked_opportunities = await retrieveLocalData('opportunities'); // check for bookmarks
        const { isPushNotificationEnabled } = await retrieveLocalData('tokens');

        // When there is a response from the database.
        if (oppos) {
          const updatedOpportunity = oppos.map((opp: any) => {
            return ({
              ...opp,
              bookmarked: bookmarked_opportunities ? bookmarked_opportunities.includes(opp.$id) : false
            })
          })

          // Sort the opportunites to bring the lasted notifications first.
          const sortedOpportunities = updatedOpportunity.sort((a: any, b: any) => {
            const dateA = new Date(a?.publishedAt)
            const dateB = new Date(b?.publishedAt)

            return (dateB as any) - (dateA as any)
          });

          setOpportunities([...sortedOpportunities]);
        }

        if (techTips) {
          setCodeTips(prev => [...prev, ...techTips]);
        }
        setIsNotificationEnabled(isPushNotificationEnabled);
        if (localNotification) {
          // console.log(localNotification)
          setNotifications(prev => [...prev, ...localNotification])
        }
      } catch (error: any) {
        alert(`error occured while fetching data ${error}`);
      } finally {
        setIsLoading(false);
      }
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
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;