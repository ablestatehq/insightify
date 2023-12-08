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

const CodeTips = () => {

  const { codeTips } = useContext(AppContext);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(0)

  // useRef hook
  // const carouselRef = useRef(null);

  // const setCarouselRef = (c: any) => {
  //   carouselRef.current = c;
  // };

  // useWindowDimensions
  // const { width: windowWidth } = useWindowDimensions();


  const handleToggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  // const renderCodeTips = ({ item, index }: { item: any, index: number }) => {
  //   return (
  //     <ExpandableListItem
  //       key={index}
  //       title={item.title}
  //       index={index}
  //       sourceName={`Berkeley Boot Camps	`}
  //       content={item.description}
  //       snippet={item.snippet}
  //       sourceLink={item.source.link}
  //       expandedIndex={expandedIndex}
  //     />
  //   )
  // }

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
                  title={codeTip.title}
                  index={index}
                  sourceName={`Berkeley Boot Camps	`}
                  content={codeTip.description}
                  snippet={codeTip.snippet}
                  sourceLink={codeTip.source.link}
                  expandedIndex={expandedIndex}
                  onToggleExpand={handleToggleExpand}
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