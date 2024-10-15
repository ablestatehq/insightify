import {useContext, useEffect, useMemo, useState} from 'react';
import {AppContext} from '../../helper/context/AppContext';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const useCodeTips = () => {
  const {codeTips, setCodeTips, comments} = useContext(AppContext);
  const [category, setCategory] = useState<string>('All');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [carouselData, setCarouselData] = useState<any[]>([]);

  // saved tips
  const savedTips = useMemo(() => 
    codeTips.filter(tip => tip.bookmarked), 
    [codeTips]
  );

  // archived tips
  const archivedTips = useMemo(() => 
    codeTips.filter(tip => {
      const differenceInDays = (new Date().getTime() - new Date(tip.publishedAt).getTime()) / MS_PER_DAY;
      return differenceInDays > 28;
    }), 
    [codeTips]
  );

  // Filter carousel data based on selected category
  const filteredData = useMemo(() => {
    if (category === 'Archived') return archivedTips;
    if (category === 'Saved') return savedTips;
    return codeTips;
  }, [category, savedTips, archivedTips, codeTips]);

  useEffect(() => {
    setCarouselData(filteredData);
  }, [filteredData]);

  return {
    category,
    setCategory,
    showSearchBar,
    setShowSearchBar,
    searchText,
    setSearchText,
    carouselData,
    setCodeTips,
    comments,
    codeTips,
  };
};
