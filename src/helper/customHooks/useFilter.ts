import {useEffect, useState} from "react";

function useFilter(category:string, data:any[], filteredItems: string[]) {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);
  
  const archivedOpp = data.filter(opp => {
    const publisedAt = new Date(opp.publishedAt);
    const currentDate = new Date();

    // console.log('PublishedAt: ', publisedAt);
    // console.log('CurrentDate: ', currentDate)
    const lifespan = (currentDate as any) - (publisedAt as any);
    
    // console.log("Lifespan: ", lifespan);
    // get the number of days
    const seconds = Math.floor(lifespan / 1000);

    // Convert to minutes
    const minutes = Math.floor(seconds / 60);

    // Convert to hours
    const hours = Math.floor(minutes / 60);

    // Convert to days
    const days = Math.floor(hours / 24);
    
    if (days > 30) {
      return opp;
    }
  });

  const activeData = data.filter(opp => {

    const publisedAt = new Date(opp.publishedAt);
    const currentDate = new Date();

    const lifespan = (currentDate as any) - (publisedAt as any);
    
    // get the number of days
    const seconds = Math.floor(lifespan / 1000);

    // Convert to minutes
    const minutes = Math.floor(seconds / 60);

    // Convert to hours
    const hours = Math.floor(minutes / 60);

    // Convert to days
    const days = Math.floor(hours / 24);
    
    if (days < 31) {
      return opp;
    }
  });

  useEffect(() => {
    try {
      setStillLoading(true);
      const filtered = filteredItems.length > 0 ? data.filter(opp => {
        return filteredItems.includes(opp.Category);
      }) : activeData;
    if (category == 'All') {
      setFilteredData([...filtered])
    } else if (category == 'Saved') {
      setFilteredData(currentData => {
        return []
      });
    } else if (category == 'For you') {
      setFilteredData(currentData => {
        return []
      });
    } else if (category == 'Archived') {
      setFilteredData([...archivedOpp])
    } else { }
    } catch (error) { }
    finally {
      setStillLoading(false);
    }
  }, [category, filteredItems]);
  
  return [filteredData, stillLoading] as const;
};

export default useFilter;