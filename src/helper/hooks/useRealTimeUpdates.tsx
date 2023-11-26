import { useEffect, useState } from 'react';
import { appwriteClient } from '../../appwrite/appwrite';
import { environments } from '../../constants/environments';
// import { database } from 'appwrite';

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_ARTICLES_COLLECTION_ID,
  APPWRITE_CODETIPS_COLLECTION_ID,
  APPWRITE_PROJECT_ENDPOINT,
  APPWRITE_PROJECT_ID
} = environments;

const useRealtimeUpdates = (callback: () => void) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [topStories, setTopStories] = useState<any[]>([]);
  useEffect(() => {
    appwriteClient
      .setEndpoint(APPWRITE_PROJECT_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID)
      .subscribe(
      `databases.${APPWRITE_DATABASE_ID}.collections.${APPWRITE_ARTICLES_COLLECTION_ID}.documents`,
      (response: any) => {
        if(response.events.includes(
          'databases.*.collections.*.documents.*.create'
        )) {
          // If there is a newly created document. Update the articles and the top stories.
          setArticles((prevArticles: any[]) => {
            // first combine all the articles plus the updated articles.
            const updatedArticles = [...prevArticles, ...topStories, ...response.payload];
            const sortedArticles = updatedArticles?.sort((a: any, b: any) => {
              const dateA = new Date(b.publishedAt);
              const dateB = new Date(a.publishedAt);

              return (dateA as any) - (dateB as any);
            });

            // Set the topStories with the top 3 articles
            const topStories_ = sortedArticles.slice(0, 3);
            setTopStories(topStories_);
            return [...sortedArticles.slice(3)];
          }
          );
        } else if (response.events.includes(
          'database.*.collections.*.documents.delete'
        )) {
          setArticles((prevArticles: any[]) => {
            return prevArticles.filter((article) => {
              return article.$id !== response.payload.$id
            })
          })
        }
      });
    // Clean up the subscription on component unmount
    return () => {
      // subscription && subscription.unsubscribe();
    };
  }, [callback]); // Ensure the callback is re-created only when it changes
};

export default useRealtimeUpdates;
