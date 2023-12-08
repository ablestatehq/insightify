import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import DatabaseService from '../../appwrite/appwrite';
import { environments } from '../../constants/environments';
import codeTipsData from "../../utils/data/codeTipsData.json";
import opportunityData from '../../../src/utils/data/opportunities.json'
import { retrieveLocalData } from '../../utils/localStorageFunctions';

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_CODETIPS_COLLECTION_ID,
  APPWRITE_OPPORTUNITIES_COLLECTION_ID
} = environments;


interface AppContextProviderProps {
  children: React.ReactNode;
}

interface AppContextType {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  codeTips: any[]
  setCodeTips: React.Dispatch<React.SetStateAction<any[]>>
  topStories: any[]
  setTopStories: React.Dispatch<React.SetStateAction<any[]>>
  articles: any[]
  setArticles: React.Dispatch<React.SetStateAction<any[]>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  opportunities: any[]
  setOpportunities: React.Dispatch<React.SetStateAction<any[]>>
}

export const AppContext = createContext<AppContextType>({
  isLoading: true,
  setIsLoading: () => { },
  codeTips: [],
  setCodeTips: () => { },
  topStories: [],
  setTopStories: () => { },
  articles: [],
  setArticles: () => { },
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  opportunities: [],
  setOpportunities: () => { }
});

const AppContextProvider = (
  {
    children
  }: AppContextProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [codeTips, setCodeTips] = useState<any[]>(codeTipsData);
  const [topStories, setTopStories] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const bookmarked_opportunities = await retrieveLocalData('opportunities')

        const response =
          await DatabaseService.getDBData(
            APPWRITE_DATABASE_ID,
            APPWRITE_OPPORTUNITIES_COLLECTION_ID
          )
        // When there is a response from the database.
        if (response) {
          const updatedOpportunity = response.map((opp: any) => {
            return ({
              ...opp,
              bookmarked: bookmarked_opportunities ? bookmarked_opportunities.includes(opp.$id) : false
            })
          })
          setOpportunities([...updatedOpportunity]);
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
            APPWRITE_DATABASE_ID,
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
  }, []);


  const contextValue: AppContextType = {
    isLoading,
    setIsLoading,
    codeTips,
    setCodeTips,
    topStories,
    setTopStories,
    articles,
    setArticles,
    isLoggedIn,
    setIsLoggedIn,
    opportunities,
    setOpportunities
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;