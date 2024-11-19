import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {COLOR, DIMEN, FONTSIZE} from '@src/constants/constants';
import {FONT_NAMES } from '@src/assets/fonts/fonts';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import Icons from '@src/assets/icons';
import { StoryDetailsProps } from '@src/types';
import { Dot } from '@src/components';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { NSource } from '@src/types/news';

// consts
const HEADER = {
  MAX_HEIGHT: 200,
  MIN_HEIGHT: 10,
  get SCROLL_DISTANCE() {
    return this.MAX_HEIGHT - this.MIN_HEIGHT;
  },
} as const;

// animation configs
const SPRING_CONFIG = {
  damping: 15,
  mass: 1,
  stiffness: 100,
};

const TIMING_CONFIG = {
  duration: 300,
};


// back button
const BackButton = React.memo(( {navigation}:{navigation: any}) => (
  <View style={styles.backBtn}>
    <Icons
      name="back"
      _color={COLOR.WHITE}
      press={() => navigation.goBack()}
    />
  </View>
));

const Article = React.memo((
  { author, source, formattedDate, readTime }:
    {
      author: string; 
      source: NSource;
      formattedDate: string;
      readTime: string;
    }) => (
  <>
    <View style={styles.reportViewStyle}>
      <Text style={styles.articleAuthor}>By {author}</Text>
      <Dot />
      <Text style={styles.articleAuthor}>{source?.name}</Text>
    </View>

    <View style={styles.articleMeta}>
      <Text style={styles.articleDate}>{formattedDate}</Text>
      <Text style={styles.articleReadTime}>{readTime} read</Text>
    </View>
  </>
));

const StoryDetails = () => {
  // hooks
  const route = useRoute<StoryDetailsProps>();
  const navigation = useNavigation();

  const {
    featured_image,
    title,
    author,
    content,
    publishedAt,
    readTime,
    source
  } = route.params;

  // animated value
  const scrollY = useSharedValue(0);

  // img source
  const get_image = useMemo(() => ({ uri: featured_image }), [featured_image]);

  const formattedDate = useMemo(() => {
    const date = new Date(publishedAt);
    return `${date.getDate()}-${date.getUTCMonth()}-${date.getFullYear()}`;
  }, [publishedAt]);

  // animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(
      interpolate(
        scrollY.value,
        [0, HEADER.SCROLL_DISTANCE],
        [HEADER.MAX_HEIGHT, HEADER.MIN_HEIGHT],
      ),
      SPRING_CONFIG
    ),
  }), []);

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(
      interpolate(
        scrollY.value,
        [0, HEADER.SCROLL_DISTANCE / 2, HEADER.SCROLL_DISTANCE],
        [1, 0.5, 0],
      ),
      TIMING_CONFIG
    ),
    transform: [{
      translateY: withSpring(
        interpolate(
          scrollY.value,
          [0, HEADER.SCROLL_DISTANCE],
          [0, -50],
        ),
        SPRING_CONFIG
      ),
    }],
  }), []);

  // scroll handler
  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // header components
  const HeaderImage = useMemo(() => (
    <Animated.View style={[styles.imageContainer, headerAnimatedStyle]}>
      <Animated.Image
        source={get_image}
        style={[styles.articleImage, imageAnimatedStyle, headerAnimatedStyle]}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </Animated.View>
  ), [get_image, headerAnimatedStyle, imageAnimatedStyle]);

  return (
    <View style={styles.container}>
      {HeaderImage}
      <BackButton navigation={navigation} />
      <Animated.ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        removeClippedSubviews={true}
        overScrollMode="never"
        bounces={false}
      >
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle} numberOfLines={2}>
            {title}
          </Text>

          <Article
            author={author as string}
            source={source as NSource}
            formattedDate={formattedDate}
            readTime={readTime}
          />

          <Text style={styles.articleContent}>
            {content}
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default React.memo(StoryDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: DIMEN.CONSTANT.LG,
  },
  backBtn: {
    position: 'absolute',
    zIndex: 10,
    padding: DIMEN.CONSTANT.SM,
    backgroundColor: COLOR.NEUTRAL_2,
    borderRadius: DIMEN.CONSTANT.XLG,
    margin: DIMEN.MARGIN.XSM,
    marginLeft: DIMEN.MARGIN.LG,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    overflow: 'hidden',
    paddingHorizontal: DIMEN.CONSTANT.ME,
    height: HEADER.MAX_HEIGHT,
    zIndex: 1,
    width: '100%',
  },
  articleImage: {
    width: '100%',
    height: HEADER.MAX_HEIGHT,
    borderRadius: DIMEN.CONSTANT.SM,
  },
  articleInfo: {
    paddingTop: DIMEN.CONSTANT.ME,
  },
  articleTitle: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: FONT_NAMES.Heading,
    marginBottom: DIMEN.MARGIN.XSM,
  },
  reportViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMEN.CONSTANT.XXSM,
    marginBottom: DIMEN.CONSTANT.ME,
  },
  articleAuthor: {
    color: COLOR.GREY_100,
    fontFamily: FONT_NAMES.Title,
  },
  articleMeta: {
    flexDirection: 'row',
    marginBottom: DIMEN.MARGIN.LG,
    gap: DIMEN.CONSTANT.XSM,
    alignItems: 'center',
  },
  articleDate: {
    color: COLOR.GREY_100,
  },
  articleReadTime: {
    color: COLOR.GREY_100,
  },
  articleContent: {
    lineHeight: 24,
    textAlign: 'justify',
  },
});