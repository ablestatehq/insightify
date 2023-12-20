import React, { useState } from 'react'

import { Dot } from './Dot'
import { Page } from './Page'
import { useNavigation } from '@react-navigation/native'
import { COLOR, DIMEN } from '../../../constants/contants'
import { Pressable, StyleSheet, Text } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { storeToLocalStorage } from '../../../utils/localStorageFunctions'
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'


const { SCREENWIDTH: PAGE_WITH, SCREENHEIGHT: PAGE_HEIGHT } = DIMEN

const OnBoard = () => {

  const dgl = Math.sqrt(Math.pow(PAGE_WITH, 2) + Math.pow(PAGE_HEIGHT, 2));
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const WORDS = [
    {
      head: 'Welcome to Insightify',
      des: 'Unlock your tech career with our curated and hand picked opportunities and resources.'
    },
    {
      head: 'Opportunities',
      des: 'Go to the Deck to access our curated opportunities like Jobs, Internships, Scholarships and more.'
    },
    {
      head: 'sky',
      des: 'Go to the Sky and access our favorite coding and Developer Job tips.\n\nEnhance your workflow with our hand picked developer tools.'
    },
    {
      head: 'Talent',
      des: 'Building a tech team? We can help.\n\nExperts in JavaScript, Python, PHP, WordPress, Laravel, UI/UX, Tech writers e.t.c'
    }
  ];

  const translateX = useSharedValue(0);

  // handle Translation on scroll event
  const scrollHandler = useAnimatedScrollHandler((event) => {
    const { contentOffset } = event;
    // console.log(currentIndex)
    translateX.value = contentOffset.x;
  });

  const Skipable = () => {
    const inputRange = [0, 1, 2];
    return (
      <Pressable
        onPress={async () => {
          navigation.navigate('Home')
          await storeToLocalStorage('onBoard', { 'isStart': false });
        }}
        style={{
          flex: 1,
          bottom: 25,
          position: 'absolute',
          alignSelf: 'flex-end',
          paddingRight: dgl * 0.020,
          paddingLeft: 5,
        }}>
        <Text
          style={styles.input}
        >
          {(currentIndex == WORDS.length - 1) ? 'Done' : 'Skip'}
        </Text>
      </Pressable>
    )
  }

  return (
    <>
      <Animated.FlatList
        bounces
        horizontal
        bouncesZoom
        data={WORDS}
        pagingEnabled
        initialNumToRender={1}
        decelerationRate='fast'
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        snapToInterval={PAGE_WITH}
        style={styles.onBoardContainer}
        keyExtractor={(item,index) => item.des}
        renderItem={({ item, index }) => {
          return (
            <Page
              title={item}
              index={index}
              key={index.toString()}
            />
          );
        }}
        showsHorizontalScrollIndicator={false}
      >
      </Animated.FlatList>
      <Dot
        data={WORDS}
        color={COLOR.ORANGE_300}
        translateX={translateX}
        setCurrentIndex={setCurrentIndex}
      />
      <Skipable />
    </>
  )
}

export default OnBoard

const styles = StyleSheet.create({
  input: {
    color: COLOR.ORANGE_300,
  },
  onBoardContainer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
})