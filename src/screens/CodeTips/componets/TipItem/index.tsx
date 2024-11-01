import React from 'react';
import RenderHtml from 'react-native-render-html';

import {StyleSheet, Text, View} from 'react-native'
import {FONT_NAMES} from '../../../../assets/fonts/fonts';
import {CodeSnippet, HTMLText, TipFooter} from '../../../../components';
import {handleBookmark} from '../../../../helper/functions/handleFunctions';
import {COLOR, FONTSIZE} from '../../../../constants/constants';

interface TipItemProp {
  id: number;
  categories: any[];
  tags: string;
  title: string;
  details: any;
  source_url_text: string;
  source_url: string;
  bookmarked: boolean;
  tips: any[];
  setTips: React.Dispatch<React.SetStateAction<any>>;
  comments: any[]
}
const Index = ({
  id,
  categories,
  tags,
  tips,
  title,
  details,
  source_url_text,
  bookmarked,
  source_url,
  setTips,
  comments
}: TipItemProp) => {
  // Render html tag renderers
  const renderers = {
    code: CodeSnippet,
    p: HTMLText
  };

  const [showReportModal, setShowReportModal] = React.useState<boolean>(false);

  const bookMarkTip = () => handleBookmark(
    id,
    tips,
    setTips,
    'techTips',
    'Tip saved',
    'Tip unsaved');
  
  const handleSubmitReport = () => setShowReportModal(!showReportModal);
  return (
    <View style={styles.renderItemView}>
      {categories ? (
        <View style={styles.tipTitleView}>
          <View style={styles.categoryView}>
            <Text style={styles.titleName}>{categories}</Text>
          </View>
          <View />
        </View>
      ) : null}
      <View style={styles.contentView}>
        {tags ? <Text style={styles.categories}>#{tags.split(', ').join(' #')}</Text> : null}
        <Text numberOfLines={3} style={styles.tipTitle}>{title}</Text>
        <RenderHtml
          contentWidth={100}
          source={{ html: details }}
          defaultTextProps={{ style: {fontFamily: FONT_NAMES.Body, fontSize: FONTSIZE.SMALL} }}
          renderers={renderers}
          tagsStyles={tagsStyles}
        />

        <TipFooter
          id={id}
          source_url_text={source_url_text}
          source_url={source_url}
          bookmarked={bookmarked}
          handleBookmark={bookMarkTip}
          onSubmitReport={handleSubmitReport}
          comments={comments}
        />
      </View>
    </View>
  )
}

export default React.memo(Index)

const styles = StyleSheet.create({
  renderItemView: {
    margin: 5,
    elevation: 0.5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  tipTitleView: {
    justifyContent: 'flex-start'
  },
  categoryView: {
    // padding: 10
  },
  titleName: {
    textTransform: 'capitalize',
    fontSize: FONTSIZE.TITLE_2
  },
  contentView: { flex: 1 },
  categories: {
    fontFamily: FONT_NAMES.Body,
    textTransform: 'lowercase',
    fontSize: FONTSIZE.SMALL,
  },
  tipTitle: {
    fontFamily: FONT_NAMES.Title,
    color: COLOR.SECONDARY_300,
    fontSize: FONTSIZE.BODY,
  },
});
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