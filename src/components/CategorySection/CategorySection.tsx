import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native'
import CategoryItem from '../CategoryItem/CategoryItem';
import { COLOR } from '../../constants/contants';

interface CategorySectionProp {
  setFilteredItems: React.Dispatch<React.SetStateAction<string>>
  categories: string[]
}

const CategorySection: React.FC<CategorySectionProp> = ({ setFilteredItems, categories}) => {

  // const categories = ['All', 'For you','Saved'];

  const [isActive, setIsActive] = React.useState<boolean[]>(Array(categories.length).fill(false));

  const setActiveCategory = (index: number) => {
    let newActive = Array(isActive.length).fill(false);
    newActive[index] = true;
    setIsActive(newActive)

    const category = categories[index];
    setFilteredItems(category)
  }

  React.useEffect(() => {
    setIsActive((prevState) => {
      const newState = [...prevState];
      if (newState.length > 0) {
        // newState[prevState.length - 1] = true; 
        newState[0] = true
      }
      return newState;
    });
  }, []);

  return (
    <View
      style={styles.categorySection}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{flexDirection:'row',gap:5}}>
          {categories.map((category: string, index: number) => (
            <CategoryItem
              key={index}
              name={category}
              isActive={isActive[index]}
              setActive={() => setActiveCategory(index)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default React.memo(CategorySection)

const styles = StyleSheet.create({
  categorySection: {
    // padding: 5,
    marginTop: 5,
    // borderBottomWidth: 0.5,
    // borderBottomColor: COLOR.SECONDARY_50
  }
})