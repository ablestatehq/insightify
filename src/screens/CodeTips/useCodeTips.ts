import {useContext, useEffect, useMemo, useState} from 'react';
import {AppContext} from '../../helper/context/AppContext';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const useCodeTips = () => {
  const {codeTips} = useContext(AppContext);
  const [category, setCategory] = useState<string>('All');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [carouselData, setCarouselData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Filter and memoize saved and archived tips
  const {savedTips, archivedTips} = useMemo(() => {
    const saved = codeTips.filter(tip => tip.bookmarked === true);
    const archived = codeTips.filter(tip => {
      const publishedAt = new Date(tip.publishedAt);
      const now = new Date();
      const differenceInDays = Math.floor((now.getTime() - publishedAt.getTime()) / MS_PER_DAY);
      return differenceInDays > 28;
    });
    return {savedTips: saved, archivedTips: archived};
  }, [codeTips]);

  // Filter carousel data based on selected category
  const filteredData = useMemo(() => {
    switch (category) {
      case 'Archived':
        return archivedTips;
      case 'Saved':
        return savedTips;
      default:
        return codeTips;
    }
  }, [category, savedTips, archivedTips, codeTips]);

  useEffect(() => {
    setIsLoading(true);
    setCarouselData(filteredData);
    setIsLoading(false);
  }, [filteredData]);

  return {
    category,
    setCategory,
    showSearchBar,
    setShowSearchBar,
    searchText,
    setSearchText,
    carouselData,
    isLoading,
  };
};
