import React from 'react';
import {
  Text, View, StatusBar, TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useCodeTips} from './useCodeTips';
// constants
import Icons from '@icons';
import {FONT_NAMES} from '@fonts';
import {COLOR, FONTSIZE} from '@constants/constants';
import {CategorySection} from '@components/index';

// lazy loads
const Carousel = React.lazy(() => import('./componets/Carousel'));
const CodeTips = () => {
  const {
    category,
    setCategory,
    showSearchBar,
    setShowSearchBar,
    setSearchText,
    carouselData,
    setCodeTips,
    comments,
    codeTips
  } = useCodeTips();

  return (
    <View style={styles.codeTipsContainer}>
      <StatusBar backgroundColor={COLOR.WHITE} />
      <View style={styles.nav}>
        <View style={styles.header}>
          {showSearchBar ? (
            <View style={styles.searchBar}>
              <TextInput
                placeholder='search'
                onChangeText={text => setSearchText(text)}
              />
            </View>
          ) : (
            <Text style={styles.heading}>Career support</Text>
          )}
          <Icons
            name={showSearchBar ? 'close' : 'search'}
            _color={COLOR.SECONDARY_300}
            press={() => setShowSearchBar(!showSearchBar)}
          />
        </View>
        <CategorySection
          setFilteredItems={setCategory}
          categories={['All', 'Saved', 'Archived']}
          initialCategory={category}
        />
      </View>
      <View style={styles.carouselStyle}>
        <React.Suspense fallback={<ActivityIndicator size='small' color={COLOR.PRIMARY_300} />}>
          <Carousel data={carouselData} setTips={setCodeTips} comments={comments} tips={codeTips} />
        </React.Suspense>
      </View>
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
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  nav: {
    paddingHorizontal: 20,
    backgroundColor: COLOR.WHITE,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_50,
    paddingHorizontal: 10,
    borderRadius: 5,
    padding: 2
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_2,
    // marginVertical: 10,
  },
  carouselStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
