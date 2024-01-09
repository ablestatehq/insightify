import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useContext } from 'react';
// constants 
import { COLOR, DIMEN, FONTSIZE } from '../../constants/contants';
import Carousel from 'react-native-reanimated-carousel';

// components 
import { ExpandableItemList } from '../../components';

import { AppContext } from '../../helper/context/AppContext';
import { extractCodeSnippet } from '../../helper/functions/functions';
import CodeHighlighter from 'react-native-code-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CategorySection from './componets/CategorySection/CategorySection';

const CodeTips = () => {
  const { SCREENWIDTH: width, SCREENHEIGHT: height } = DIMEN;

  const { codeTips } = useContext(AppContext);


  return (
    <View
      style={styles.codeTipsContainer}
    >
      <View>
        {/* <Text>Code Tips</Text> */}
        {/* <CategorySection /> */}
      </View>
      <Carousel
        loop
        width={width}
        height={height}
        data={codeTips}
        mode='parallax'
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10]
        }}
        // onSnapToItem={(index) => console.log('current index: ', index)}
        renderItem={({ item, index }) => (
          <View style={styles.renderItemView}>
            <View style={styles.tipTitleView}>
              <View style={styles.categoryView}>
                <Text style={styles.titleName}>
                  {item?.Category}
                </Text>
              </View>
              <View />
            </View>
            <View
              style={
                styles.tipContentView
              }
            >
              <Text
                numberOfLines={3}
                style={{
                  ...styles.tipTitle,
                  fontFamily: "RalewayBold"
                }}
              >
                # {item?.Title}
              </Text>
              <Text
                style={{
                  ...styles.tipContent,
                }}
              >
                {item?.details?.replace(/```([^`]*)```/g, '')}
              </Text>
              <View style={styles.tipFooter}>
                <View style={styles.codeDescriptionStyle}>
                  <CodeHighlighter
                    hljsStyle={atomOneDarkReasonable}
                    containerStyle={styles.codeSnippet}
                    textStyle={styles.code}
                    language={`${item?.Category?.toLowerCase()}`}
                  >
                    {extractCodeSnippet(item?.details)}
                  </CodeHighlighter>
                </View>
              </View>
            </View >
          </View>
        )}
      />

      {/* <View
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
      </View> */}
    </View>
  );
}

export default CodeTips

const styles = StyleSheet.create({
  codeTipsContainer: {
    flex: 1,
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

  },
  renderItemView: {
    flex: 1,
    borderWidth: 0.2,
    padding: 10,
    borderRadius: 10
  },
  tipTitle: {
    color: COLOR.B_300,
    fontSize: FONTSIZE.HEADING_4,
    // textAlign: 'center',
    fontFamily:'RalewayBold'
  },
  tipContent: {
    color: COLOR.B_300,
    fontSize: FONTSIZE.HEADING_5,
    fontFamily: 'ComfortaaBold',
    lineHeight:30
  },
  tipContentView: {
    flex:1,
    // borderWidth: 1,
    padding:10
  },
  tipFooter: {
    
  },
  tipTitleView: {
    marginBottom: 10,
    justifyContent:'flex-start'
  },
  titleName: {
    textTransform: 'capitalize',
    fontSize:FONTSIZE.TITLE_1
  },
  categoryView: {
    padding:10
  },
  codeSnippet: {
    paddingHorizontal:20
  },
  codeDescriptionStyle: {
    
  },
  code: {
    fontFamily: 'RalewayBold',
    fontSize:FONTSIZE.BODY
  }
});