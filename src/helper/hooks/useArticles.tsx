import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import DatabaseService from '../../appwrite/appwrite';
import { environments } from '../../constants/environments';
import { retrieveLocalData, storeToLocalStorage } from '../../utils/localStorageFunctions';

const useArticles = () => {

  const {
    APPWRITE_DATABASE_ID,
    APPWRITE_ARTICLES_COLLECTION_ID,
    APPWRITE_CODETIPS_COLLECTION_ID,
  } = environments;


  const { setIsLoading, setCodeTips, setTopStories, setArticles } = useContext(AppContext);
  // const [codeTips, setCodeTips] = useState<any[]>(codeTipsData);
  // const [topStories, setTopStories] = useState<any[]>([])
  // const [articles, setArticles] = useState<any[]>([]);
  
  useEffect(() => {

    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const techInAfricaNewsInLocalStorage =
          await retrieveLocalData('articles');
        
        const techInAfricaResponse =
          await DatabaseService.getDBData(
            APPWRITE_DATABASE_ID,
            APPWRITE_ARTICLES_COLLECTION_ID
          )
            .then(response => response)
            .catch(error => console.error(error));

        const developerTips =
          await DatabaseService.getDBData(
            APPWRITE_DATABASE_ID,
            APPWRITE_CODETIPS_COLLECTION_ID
          )
            .then(response => response)
            .catch(error => console.error(error));

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
        alert(`Error occured while fetching data ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData();
  }, []);

  // return {
  //   articles,
  //   codeTips,
  //   topStories
  // }
}

export default useArticles;