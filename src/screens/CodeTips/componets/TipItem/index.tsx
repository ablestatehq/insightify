import React, { useCallback, useMemo } from 'react';
import RenderHtml from 'react-native-render-html';
import { StyleSheet, Text, View } from 'react-native';

import { FONT_NAMES } from '@fonts';
import { CodeSnippet, HTMLText, TipFooter } from '@components/index';
import { handleBookmark } from '@src/helper/handleFunctions';
import { COLOR, FONTSIZE } from '@constants/constants';

interface TipItemProps {
  id: number;
  categories?: string[];
  tags?: string;
  title: string;
  details: string;
  source_url_text?: string;
  source_url?: string;
  bookmarked?: boolean;
  tips: any[];
  setTips: React.Dispatch<React.SetStateAction<any>>;
  comments: any[];
}

const Index: React.FC<TipItemProps> = ({
  id,
  categories,
  tags,
  tips,
  title,
  details,
  source_url_text,
  bookmarked = false,
  source_url,
  setTips,
  comments
}) => {
  // renderers
  const renderers = useMemo(() => ({
    code: CodeSnippet,
    p: HTMLText
  }), []);

  // bookmark handler
  const bookMarkTip = useCallback(() =>
    handleBookmark(
      id,
      tips,
      setTips,
      'techTips',
      'Tip saved',
      'Tip unsaved'
    ), [id, tips, setTips]);

  // tag processing
  const processedTags = useMemo(() =>
    tags ? `#${tags.split(', ').join(' #')}` : null,
    [tags]
  );

  return (
    <View style={styles.renderItemView}>
      {categories && (
        <View style={styles.tipTitleView}>
          <Text style={styles.titleName}>
            {Array.isArray(categories) ? categories.join(', ') : categories}
          </Text>
        </View>
      )}
      <View style={styles.contentView}>
        {processedTags && (
          <Text style={styles.categories}>
            {processedTags}
          </Text>
        )}
        <Text numberOfLines={3} style={styles.tipTitle}>
          {title}
        </Text>
        <RenderHtml
          contentWidth={100}
          source={{ html: details }}
          defaultTextProps={{
            style: {
              fontFamily: FONT_NAMES.Body,
              fontSize: FONTSIZE.SMALL
            }
          }}
          renderers={renderers}
          tagsStyles={tagsStyles}
        />

        <TipFooter
          id={id}
          source_url_text={source_url_text}
          source_url={source_url}
          bookmarked={bookmarked}
          handleBookmark={bookMarkTip}
          comments={comments}
        />
      </View>
    </View>
  );
};

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

export default React.memo(Index);