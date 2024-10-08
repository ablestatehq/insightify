import React, {useState, useRef, useContext, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet, NativeSyntheticEvent, ActivityIndicator} from 'react-native';

import {CodeSnippet, TipFooter, HTMLText} from '../../../../components';

import RenderHtml from 'react-native-render-html';

import {AppContext} from '../../../../helper/context/AppContext';
import {COLOR, DIMEN, FONTSIZE} from '../../../../constants/constants';
import {bookmarkCodeTips} from '../../../../helper/functions/handleFunctions';
import {FONT_NAMES} from '../../../../assets/fonts/fonts';

const {SCREENWIDTH} = DIMEN;

interface CorouselProps {
  data: any[],
}

function Index({ data }: CorouselProps) {

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {codeTips, setCodeTips, comments} = useContext(AppContext);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Render html tag renderers
  const renderers = {
    code: CodeSnippet,
    p: HTMLText
  };

  const handleScroll = useCallback((event: NativeSyntheticEvent<any>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREENWIDTH);
    setCurrentIndex(index);
  }, []);


  const tagsStyles = {
    p: {
      fontFamily: FONT_NAMES.Body,
      fontSize: FONTSIZE.BODY,
      textAlign: 'justify',
      paddingVertical: 5
    },
    b: { fontWeight: 'bold' },
    ul: {
      listStyleType: 'none',
      paddingHorizontal: 5,
      paddingVertical: 1,
      textAlign: 'justify'
    },
    li: {
      fontFamily: FONT_NAMES.Body,
      fontSize: FONTSIZE.BODY
    },
    strong: {
      fontFamily: FONT_NAMES.Body,
      fontSize: FONTSIZE.BODY
    }
  };

  const MemoizedItem = React.memo(({item}: { item: any }) => (
    <View style={styles.renderItemView}>
      {item?.categories && (
        <View style={styles.tipTitleView}>
          <View style={styles.categoryView}>
            <Text style={styles.titleName}>{item?.categories}</Text>
          </View>
          <View />
        </View>
      )}
      <View style={{flex: 1}}>
        {item?.tags && <Text style={styles.categories}>#{item?.tags.split(', ').join(' #')}</Text>}
        <Text numberOfLines={3} style={styles.tipTitle}>{item?.title}</Text>
        <View style={styles.renderHtml}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RenderHtml
              contentWidth={100}
              source={{ html: item?.details }}
              defaultTextProps={{ style: { fontFamily: FONT_NAMES.Body } }}
              renderers={renderers}
              tagsStyles={tagsStyles}
            />
          </ScrollView>
        </View>
        <TipFooter
          id={item?.id}
          source_url_text={item?.source_url_text}
          source_url={item?.source_url}
          bookmarked={item?.bookmarked}
          handleBookmark={() => bookmarkCodeTips(item?.id, codeTips, setCodeTips)}
          onSubmitReport={() => setShowReportModal(!showReportModal)}
          comments={comments}
        />
      </View>
    </View>
  ));

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
        {data.length > 0 ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {data?.map((item: any, index: number) => (
              <MemoizedItem item={item} key={index}/>
            ))}
          </ScrollView>
        ) : (<View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color={COLOR.PRIMARY_300} />
        </View>)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  navText: {
    fontSize: 20,
  },
  currentIndex: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  codeTipsContainer: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY_50,
  },
  renderItemView: {
    width: SCREENWIDTH - 30,
    margin: 5,
    elevation: 0.5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  tipTitle: {
    fontFamily: FONT_NAMES.Title,
    color: COLOR.SECONDARY_300,
    fontSize: FONTSIZE.TITLE_1,
  },
  tipContent: {
    lineHeight: 30,
    color: COLOR.SECONDARY_300,
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.HEADING_5,
  },
  tipTitleView: {
    // marginBottom: 10,
    justifyContent: 'flex-start'
  },
  titleName: {
    textTransform: 'capitalize',
    fontSize: FONTSIZE.TITLE_2
  },
  categoryView: {
    // padding: 10
  },
  renderHtml: {
    flex: 1
  },
  categories: {
    fontFamily: FONT_NAMES.Body,
    textTransform: 'lowercase'
  },
  heading: {
    // textAlign: 'center',
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;