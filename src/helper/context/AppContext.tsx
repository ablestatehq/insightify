import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import codeTipsData from "../../utils/data/codeTipsData.json";
import { retrieveLocalData } from '../../utils/localStorageFunctions';
import opportunityData from '../../../src/utils/data/opportunities.json'
import DatabaseService, { appwriteClient } from '../../appwrite/appwrite';
import { APPWRITE_DATABASE_ID, APPWRITE_OPPORTUNITIES_COLLECTION_ID, APPWRITE_CODETIPS_COLLECTION_ID } from '@env';


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
  setIsNotificationEnabled: () => { }
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookmarked_opportunities = await retrieveLocalData('opportunities')

        const response =
          await DatabaseService.getDBData(
            APPWRITE_OPPORTUNITIES_COLLECTION_ID
          )
        // When there is a response from the database.
        if (response) {
          const updatedOpportunity = response.map((opp: any) => {
            return ({
              APPWRITE_DATABASE_ID,
              ...opp,
              bookmarked: bookmarked_opportunities ? bookmarked_opportunities.includes(opp.$id) : false
            })
          })

          // Sort the opportunites to bring the lasted notifications first.
          const sortedOpportunities = updatedOpportunity.sort((a: any, b: any) => {
            const dateA = new Date(a?.$createdAt)
            const dateB = new Date(b?.$createdAt)

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
      } catch (error: any) {
        alert(`error occured while fetching data ${error}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    // const unsubscribe = appwriteClient?.subscribe(
    //   `databases.${APPWRITE_DATABASE_ID}.collections.${APPWRITE_OPPORTUNITIES_COLLECTION_ID}.documents`,
    //   (response: any) => {
    //     if (response.events.includes(
    //       'databases.*.collections.*.documents.*.create'
    //     )) {
    //       setOpportunities((prevOpportunities: any[]) => {
    //         const updatedOpportunity = [...prevOpportunities, ...response.payload];
    //         return updatedOpportunity;
    //       })
    //     } else if (response.events.includes(
    //       'database.*.collections.*.documents.delete'
    //     )) {
    //       setOpportunities((prevOpportunities: any[]) => {
    //         return prevOpportunities.filter((opportunity) => {
    //           return opportunity.$id !== response.payload.$id
    //         })
    //       })
    //     }
    //   })

    return () => {
      // unsubscribe ? unsubscribe() : null
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
    setIsNotificationEnabled
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;