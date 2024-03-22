import {useEffect, useState} from "react";
  
function useOpportunities(category:string, opportunities:any[], filteredItems: string[]) {
  const [filteredOpportunities, setFilteredOpportunities] = useState<any[]>([]);
  const [stillLoading, setStillLoading] = useState<boolean>(true);
  const archivedOpp = opportunities.filter(opp => {
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
    
    if (days > 30) {
      return opp;
    }
  });

  const activeOpportunities = opportunities.filter(opp => {

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
      const filtered = filteredItems.length > 0 ? opportunities.filter(opp => {
        return filteredItems.includes(opp.Category);
      }) : activeOpportunities;
    if (category == 'All') {
      setFilteredOpportunities([...filtered])
    } else if (category == 'Saved') {
      setFilteredOpportunities(currentOpportunities => {
        return []
      });
    } else if (category == 'For you') {
      setFilteredOpportunities(currentOpportunities => {
        return []
      });
    } else if (category == 'Archived') {
      setFilteredOpportunities([...archivedOpp])
    } else { }
    } catch (error) { }
    finally {
      setStillLoading(false);
    }
  }, [category, filteredItems]);
  
  return [filteredOpportunities, stillLoading] as const;
};

export default useOpportunities;