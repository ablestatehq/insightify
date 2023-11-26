import React, {
  useState,
  createContext,
  useEffect,
} from 'react';
import codeTipsData from "../../utils/data/codeTipsData.json";
import { environments } from '../../constants/environments';
import DatabaseService from '../../appwrite/appwrite';
import { retrieveLocalData, storeToLocalStorage } from '../../utils/localStorageFunctions';

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_ARTICLES_COLLECTION_ID,
  APPWRITE_CODETIPS_COLLECTION_ID,
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
});

const AppContextProvider = (
  {
    children
  }: AppContextProviderProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [codeTips, setCodeTips] = useState<any[]>(codeTipsData);
  const [topStories, setTopStories] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const techInAfricaNewsInLocalStorage =
          await retrieveLocalData('articles')

        const techInAfricaResponse =
          await DatabaseService.getDBData(
            APPWRITE_DATABASE_ID,
            APPWRITE_ARTICLES_COLLECTION_ID
          )
            .then(response => response)
            .catch(error => alert(`Tech In Africa response ${error}`));

        const developerTips =
          await DatabaseService.getDBData(
            APPWRITE_DATABASE_ID,
            APPWRITE_CODETIPS_COLLECTION_ID
          )
            .then(response => response)
            .catch(error => alert(`Developer tips error${error}`));

        if (techInAfricaResponse) {
          // Sort articles by publication date
          const sortedArticles = techInAfricaResponse?.sort((a: any, b: any) => {
            const dateA = new Date(b.publishedAt);
            const dateB = new Date(a.publishedAt);

            return (dateA as any) - (dateB as any);
          });

          setArticles(sortedArticles.slice(3));
          await storeToLocalStorage('articles', sortedArticles);
          // Set the topStories with the top 3 articles
          const topStories_ = sortedArticles.slice(0, 3);
          setTopStories(topStories_);
        } else {
          // alert("Something is totally wrong. Nothing is returned from the ")
          if (techInAfricaNewsInLocalStorage) {
            setArticles(techInAfricaNewsInLocalStorage.slice(3));
            // set topStores.
            setTopStories(techInAfricaNewsInLocalStorage.slice(0, 3));
          }
        }

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
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;