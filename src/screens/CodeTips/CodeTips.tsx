import React from 'react';
import {
  Text, View, StatusBar, TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Icons from '../../assets/icons';
import Carousel from './componets/Carousel'
import {useCodeTips} from './useCodeTips';
import {CategorySection} from '../../components';
import {FONT_NAMES} from '../../assets/fonts/fonts';
// constants
import {COLOR, FONTSIZE} from '../../constants/constants';

const CodeTips = () => {
  const {
    category,
    setCategory,
    showSearchBar,
    setShowSearchBar,
    searchText,
    setSearchText,
    carouselData,
    isLoading,
  } = useCodeTips();

  return (
    <View style={styles.codeTipsContainer}>
      <StatusBar backgroundColor={COLOR.WHITE} />
      <View style={{ paddingHorizontal: 20, backgroundColor: COLOR.WHITE }}>
        <View style={styles.header}>
          {showSearchBar ? (
            <View style={styles.searchBar}>
              <TextInput
                placeholder='search'
                onChangeText={text => setSearchText(text)}
              />
            </View>
          ) : (
            <Text style={styles.heading}>Career insights</Text>
          )}
          <Icons
            name={showSearchBar ? 'close' : 'search'}
            _color={COLOR.SECONDARY_300}
            press={() => setShowSearchBar(!showSearchBar)}
          />
        </View>
        <CategorySection setFilteredItems={setCategory} categories={['All', 'Saved', 'Archived']} />
      </View>
        <Carousel data={carouselData} />
    </View>
  );
}

export default CodeTips;

const styles = StyleSheet.create({
  codeTipsContainer: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY_50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 20,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_50,
    paddingHorizontal: 10,
    borderRadius: 5,
    padding: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_1,
  }
});
