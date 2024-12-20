import {StyleSheet,View} from 'react-native';
import React, {useCallback, useMemo} from 'react'
import CategoryItem from '../CategoryItem/CategoryItem';

interface CategorySectionProp {
  setFilteredItems: React.Dispatch<React.SetStateAction<string>>
  categories: string[];
  initialCategory?: string;
}

const CategorySection: React.FC<CategorySectionProp> =
  ({
    initialCategory='',
    setFilteredItems,
    categories = []
  }) => {
    if (!categories.length) {
      return null;
    }
    // cache the activeList
    const initialActiveList = useMemo(() => {
      const list = Array(categories.length).fill(false);
      const initialIndex = categories.indexOf(initialCategory as string);
      if (initialIndex !== -1) list[initialIndex] = true;
      return list;
    }, [categories, initialCategory]);

    const [isActive, setIsActive] = React.useState<boolean[]>(initialActiveList);

    const setActiveCategory = useCallback((cat: string) => {
      const newIndex = categories.indexOf(cat);
      if (isActive[newIndex]) return;

      const newActive = isActive.map((_, index) => index === newIndex);
      setIsActive(newActive);
      setFilteredItems(cat);
    }, [categories, setFilteredItems, isActive]);

    return (
      <View style={styles.categorySection}>
        <View style={styles.categoryView}>
          {categories.map((category: string, index: number) => (
            <CategoryItem
              key={index}
              name={category}
              isActive={isActive[index]}
              setActive={() => setActiveCategory(category)}
            />
          ))}
        </View>
      </View>
    );
};


export default React.memo(CategorySection)

const styles = StyleSheet.create({
  categorySection: {},
  categoryView: { flexDirection: 'row', gap: 5 }
});