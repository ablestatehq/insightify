import { useEffect, useState, useMemo } from 'react';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getDateDifference(date1: Date, date2: Date): number {
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

function useFilter(category: string, data: any[], filteredItems: string[]) {
  const [stillLoading, setStillLoading] = useState<boolean>(true);
  
  // avoid re-creating it on every render
  const currentDate = useMemo(() => new Date(), []);

  // only calculated once per data change
  const {activeData, archivedOpp} = useMemo(() => {
    return data.reduce(
      (acc, opp) => {
        const publishedAt = new Date(opp.publishedAt);
        const days = getDateDifference(publishedAt, currentDate);
        if (days <= 30) {
          acc.activeData.push(opp);
        } else {
          acc.archivedOpp.push(opp);
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
