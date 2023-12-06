import React, { useContext, useRef } from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

// hooks
import { useNavigation } from '@react-navigation/native';

// components 
import { AppContext } from '../../../../helper/context/AppContext';
import NewsItemContainer from '../NewsItemContainer/NewsItemContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LatestNewsContainer: React.FC = () => {

  const { topStories } = useContext(AppContext);
  // useState
  const [index, setIndex] = React.useState(0)
  // Navigation hook
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // useWindowDimens()
  const { width: windowWidth } = useWindowDimensions();

  // useRef hook
  const isCarouseRed = useRef(null);

  const setCarouselRef = (c: any) => {
    isCarouseRed.current = c;
  };


  const renderLatestStory = ({ item, index }: { item: any, index: number }) => (
    <NewsItemContainer
      key={index}
      image={{ uri: item.featured_image }}
      title={item.title}
      author={"Tech News Africa"}
      publishedAt={item.publishedAt}
      handleNavigation={() => {
        navigation.navigate("Details", item);
      }}
    />
  );

  return (
    <View
      style={styles.container}
    >
      {/* <Carousel
        ref={setCarouselRef}
        data={topStories}
        renderItem={renderLatestStory}
        sliderWidth={windowWidth - 10}
        itemWidth={windowWidth - 40}
        loop={true}
        enableSnap={true}
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={5000}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      /> */}
    </View>
  );
}

export default LatestNewsContainer;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: "100%"
  },
  flatListStyle: {
  }
})