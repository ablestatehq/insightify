import {useEffect, useState, useMemo} from 'react';
import {isPast, differenceInDays} from 'date-fns';


function useFilter(category: string, data: any[], filteredItems: string[]) {
  const [stillLoading, setStillLoading] = useState<boolean>(true);
  
  const currentDate = useMemo(() => new Date(), []);

  const {activeData, archivedOpp} = useMemo(() => {
    
    return data.reduce(
      (acc, opp) => {
        if (opp.Expires) {
          if (isPast(opp.Expires)) acc.archivedOpp.push(opp);
          else acc.activeData.push(opp);
        } else {
          const publishedAt = new Date(opp.publishedAt);
          const days = differenceInDays(currentDate, publishedAt);
          if (days <= 30) acc.activeData.push(opp);
          else acc.archivedOpp.push(opp);
        }
        return acc;
      },
      { activeData: [], archivedOpp: [] }
    );
  }, [data, currentDate]);

  // filter data based on category and filteredItems
  const filteredData = useMemo(() => {
    const applyFilters = (dataSet: any[]) => {
      return filteredItems.length > 0
        ? dataSet.filter((opp) => filteredItems.includes(opp.Category))
        : dataSet;
    };
    switch (category) {
      case 'Recent':
        return applyFilters(activeData);
      case 'Saved':
        return applyFilters(data.filter((item) => item.bookmarked === true));
      case 'All':
        return applyFilters(archivedOpp);
      default:
        return [];
    }
  }, [category, filteredItems, activeData, archivedOpp, data]);

  useEffect(() => {
    setStillLoading(true);
    setTimeout(() => {
      setStillLoading(false);
    }, 100);
  }, [filteredData]);

  return [filteredData, stillLoading] as const;
}

export default useFilter;
