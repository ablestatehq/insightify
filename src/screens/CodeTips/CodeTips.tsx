import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import React, { useContext } from 'react';
// constants 
import { COLOR } from '../../constants/contants';

// components 
import { ExpandableItemList } from '../../components';
// import Carousel from 'react-native-snap-carousel';


import { AppContext } from '../../helper/context/AppContext';
import { extractCodeSnippet } from '../../helper/functions/functions';

const CodeTips = () => {

  const { codeTips } = useContext(AppContext);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(0)


  const handleToggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index))
  }
  
  return (
    <View
      style={styles.codeTipsContainer}
    >
      <View
        style={styles.contentContainer}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollableCodeTips}
        >
          {
            codeTips?.map((codeTip: any, index: number) => {
              return (
                <ExpandableItemList
                  key={index}
                  title={codeTip.Title}
                  index={index}
                  sourceName={codeTip?.Credit}
                  content={codeTip?.details?.replace(/```([^`]*)```/g, '')}
                  snippet={extractCodeSnippet(codeTip?.details)}
                  sourceLink={codeTip.Link}
                  expandedIndex={expandedIndex}
                  onToggleExpand={handleToggleExpand}
                  PL={codeTip?.Category}
                />
              )
            })
          }
        </ScrollView>
        {/* <Carousel
          layout={'tinder'}
          ref={setCarouselRef}
          data={codeTips}
          renderItem={renderCodeTips}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          loop={true}
        /> */}
      </View>
    </View>
  );
}

export default CodeTips

const styles = StyleSheet.create({
  codeTipsContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10
  },
  showCodeTip: {
    flex: 1,
  },
  scrollableCodeTips: {

  }
});