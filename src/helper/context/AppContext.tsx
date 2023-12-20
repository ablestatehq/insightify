import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import codeTipsData from "../../utils/data/codeTipsData.json";
import { retrieveLocalData } from '../../utils/localStorageFunctions';
import opportunityData from '../../../src/utils/data/opportunities.json'
import DatabaseService from '../../appwrite/appwrite';
import { APPWRITE_DATABASE_ID, APPWRITE_OPPORTUNITIES_COLLECTION_ID, APPWRITE_CODETIPS_COLLECTION_ID } from '@env';
import { getOpportunites } from '../../../api/strapiJSAPI';


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
  const [codeTips, setCodeTips] = useState<any[]>(codeTipsData);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const oppos = await getOpportunites();

        // console.log(oppos[0].Description[0].children[0].text)
        const bookmarked_opportunities = await retrieveLocalData('opportunities'); // check for bookmarks
        const { isPushNotificationEnabled } = await retrieveLocalData('tokens');

        const response =
          await DatabaseService.getDBData(
            APPWRITE_OPPORTUNITIES_COLLECTION_ID
          )
        // When there is a response from the database.
        if (oppos) {
          const updatedOpportunity = oppos.map((opp: any) => {
            return ({
              // APPWRITE_DATABASE_ID,
              ...opp,
              bookmarked: bookmarked_opportunities ? bookmarked_opportunities.includes(opp.$id) : false
            })
          })

          // Sort the opportunites to bring the lasted notifications first.
          const sortedOpportunities = updatedOpportunity.sort((a: any, b: any) => {
            const dateA = new Date(a?.$publishedAt)
            const dateB = new Date(b?.$publishedAt)

            return (dateB as any) - (dateA as any)
          });

          setOpportunities([...sortedOpportunities]);
        } else {
          // If there is no response from the database, use the opportunities stored.
          const updatedOpportunity = opportunityData.opportunities.map((opp: any) => {
            return ({
              ...opp,
              bookmarked: bookmarked_opportunities ? bookmarked_opportunities.includes(opp.$id) : false
            })
          })
          setOpportunities([...updatedOpportunity]);
        }

        const developerTips =
          await DatabaseService.getDBData(
            APPWRITE_CODETIPS_COLLECTION_ID
          )
            .then(response => response)
            .catch(error => alert(`Developer tips error${error}`));

        // If developer tips are returned from the database. 
        // Store the tips in the codeTips state.
        if (developerTips) {
          // setCodeTips(developerTips);
        }

        setIsNotificationEnabled(isPushNotificationEnabled);
      } catch (error: any) {
        alert(`error occured while fetching data ${error}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    
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