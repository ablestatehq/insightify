import {useEffect, useMemo, useState} from 'react';
import { useTips } from '@src/context/TipsContext';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const useCodeTips = () => {
  const { codeTips, setCodeTips } = useTips();
  const [category, setCategory] = useState<string>('All');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [carouselData, setCarouselData] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);

  // saved tips
  const savedTips = useMemo(() => 
    codeTips.filter(tip => tip.bookmarked), 
    [codeTips]
  );

  // archived tips
  const archivedTips = useMemo(() => 
    codeTips.filter(tip => {
      const differenceInDays =
        (new Date().getTime() - new Date(tip.publishedAt).getTime()) / MS_PER_DAY;
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

  const handleEndReached = async () => {
    // await fetchAdditionalData('techTips', codeTips.length);
  }

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
    handleEndReached,
  };
};
