import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native'
import CategoryItem from '../CategoryItem/CategoryItem';
import { AppContext } from '@@helpers/context/AppContext';

const CategorySection = () => {

  const categories = ['All', 'Top rated', 'web development', 'Interview'];

  // Set the codeTips to show when the user changes the category.
  const { codeTips, setCodeTips } = React.useContext(AppContext);

  const [isActive, setIsActive] = React.useState<boolean[]>(Array(categories.length).fill(false));

  const setActiveCategory = (index: number) => {
    let newActive = Array(isActive.length).fill(false);
    newActive[index] = true;
    setIsActive(newActive)



  }

  React.useEffect(() => {
    setIsActive((prevState) => {
      const newState = [...prevState];
      if (newState.length > 0) {
        newState[0] = true;
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
        {categories.map((category: string, index: number) => (
          <CategoryItem
            key={index}
            name={category}
            isActive={isActive[index]}
            setActive={() => setActiveCategory(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default CategorySection

const styles = StyleSheet.create({
  categorySection: {
    padding: 5,
    marginVertical: 5,
  }
})