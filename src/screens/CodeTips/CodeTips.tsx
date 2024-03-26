import {
  Text, View,
  StatusBar, TextInput,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// constants
import {COLOR, FONTSIZE} from '../../constants/contants';

import Carousel from './componets/Carousel'
import Icons from '../../assets/icons';
import {AppContext} from '../../helper/context/AppContext';
import {CategorySection, FloatingButton} from '../../components';


const CodeTips = () => {

  const {codeTips} = useContext(AppContext);
  // const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // const [isCarouselReady, setIsCarouselReady] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('All');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [carouselData, setCarouselData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const savedTips = codeTips.filter(saved =>  saved.bookmarked == true);
  const archivedTips = codeTips.map(tip => {

    const timestamp1 = new Date(tip.publishedAt);
    const timestamp2 = new Date();

    // Calculate difference in milliseconds
    const differenceInMilliseconds = Math.floor((timestamp2 as any) - (timestamp1 as any));

    // Convert milliseconds to days
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);
    if (differenceInDays > 28) {
      return tip
    }
  });
  
  useEffect(() => {
    setIsLoading(true);
    if (category == 'Archived') {
      setCarouselData([...archivedTips.filter(tip => tip)]);
      setIsLoading(false)
    } else if(category == 'Saved'){
      setCarouselData([...savedTips.filter(tip => tip)]);
      setIsLoading(false)
    } else {
      setCarouselData([...codeTips]);
      setIsLoading(false)
    }
  }, [category]);

  return (
    <View style={styles.codeTipsContainer}>
      <StatusBar backgroundColor={COLOR.WHITE} />
      <View style={{paddingHorizontal: 20, backgroundColor: COLOR.WHITE}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, gap: 20}}>
          {showSearchBar && <View style={{flex: 1, borderWidth: 1, borderColor: COLOR.SECONDARY_50, paddingHorizontal: 10, borderRadius: 5, padding: 2}}>
            <TextInput
              placeholder='search'
              onChangeText={text => {
                setSearchText(text);
              }}
            />
          </View>}
          {!showSearchBar && <Text style={styles.heading}>Career insights</Text>}
          {/* <Icons name='search' _color={COLOR.SECONDARY_300} press={() => { setShowSearchBar(currentValue => !currentValue) }} /> */}
          {showSearchBar && <Icons name='close' _color={COLOR.SECONDARY_300} press={() => {setShowSearchBar(currentValue => !currentValue)}} />}
        </View>
        <CategorySection setFilteredItems={setCategory} categories={['All', 'Saved', 'Archived']} />
      </View>
      {isLoading && (<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator
          size='large'
          color={COLOR.PRIMARY_300}
        />
      </View>)}
      {!isLoading && <Carousel data={carouselData}/>}
      
      {/* <FloatingButton
        title='Ask'
        borderRadius={25}
        press={function () {
          Alert.alert('Feature update', 'Feature coming soon',
            [{ text: 'ok', style: 'cancel', onPress(value) { } }], { onDismiss() { }, cancelable: true, });
        } } buttonPosition={{
          right: 10,
          top: 100
        }} /> */}
    </View>
  );
}

export default CodeTips

const styles = StyleSheet.create({
  codeTipsContainer: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY_50,
  },
  renderItemView: {
    flex: 1,
    margin: 5,
    elevation: 0.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLOR.WHITE,
  },
  tipTitle: {
    fontFamily: 'RalewayBold',
    color: COLOR.SECONDARY_300,
    fontSize: FONTSIZE.HEADING_4,
  },
  tipContent: {
    lineHeight: 30,
    color: COLOR.SECONDARY_300,
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.HEADING_5,
  },
  tipTitleView: {
    justifyContent: 'flex-start'
  },
  titleName: {
    textTransform: 'capitalize',
    fontSize: FONTSIZE.TITLE_1
  },
  categoryView: {
  },
  renderHtml: {
    flex: 1
  },
  categories: {
    fontFamily: 'ComfortaaLight',
    textTransform: 'lowercase'
  },
  heading: {
    // textAlign: 'center',
    fontFamily: 'RalewaySemiBold',
    fontSize: FONTSIZE.TITLE_1
  }
});