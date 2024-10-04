import React, {useCallback, useMemo} from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import CategoryItem from '../CategoryItem/CategoryItem';

interface CategorySectionProp {
  setFilteredItems: React.Dispatch<React.SetStateAction<string>>
  categories: string[];
  initialCategory?: string;
}

const CategorySection: React.FC<CategorySectionProp> =
  ({initialCategory, setFilteredItems, categories}) => {
    const initialActiveList = useMemo(() => Array(categories.length).fill(false), [categories]);
    const initialIndex = categories.indexOf(initialCategory as string);
    initialActiveList[initialIndex] = true;
    const [isActive, setIsActive] = React.useState<boolean[]>(initialActiveList);

    const setActiveCategory = useCallback((cat: string) => {
      let newActive = Array(isActive.length).fill(false);
      newActive[categories.indexOf(cat)] = true;
      setIsActive(newActive);
      // const category = categories[index];
      setFilteredItems(cat);
    }, [categories, setFilteredItems, isActive.length]);

  return (
    <View style={styles.categorySection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', gap: 5}}>
          {categories.map((category: string, index: number) => (
            <CategoryItem
              key={index}
              name={category}
              isActive={isActive[index]}
              setActive={() => setActiveCategory(category)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


export default React.memo(CategorySection)

const styles = StyleSheet.create({
  categorySection: {
    marginTop: 5,
  }
})