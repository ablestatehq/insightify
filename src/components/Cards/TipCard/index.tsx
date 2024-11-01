import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {COLOR, DIMEN, FONTSIZE} from '@constants/constants';
import CodeSnippet from '../CodeSnippet';
import HTMLText from '../HTMLText';
import RenderHtml from 'react-native-render-html';
import {FONT_NAMES} from '@fonts';
import TipFooter from '../TipFooter';
import { handleBookmark } from '@helpers/functions/handleFunctions';

const Index = (props: any) => {

  const {
    id,
    details,
    image,
    title,
    source_url_text,
    source_url,
    bookmarked,
    comments,
    setTips,
    tips,
  } = props;

  const bookMarkTip = () => handleBookmark(
    id,
    tips,
    setTips,
    'techTips',
    'Tip saved',
    'Tip unsaved');
  
  const renderers = {
    code: CodeSnippet,
    p: HTMLText
  };

  return (
    <View style={styles.container}>
      <Text style={styles.careerTxtStyle}>{'CAREER'}</Text>
      {image ? <Image
        source={{ uri: `${image}` }}
        resizeMethod="resize"
        resizeMode="cover"
        style={styles.imageStyles}
      /> : null}
      <View style={styles.content}>
        {title ? <Text numberOfLines={3} style={styles.titleStyle}>
          {title}
        </Text> : null}
        <RenderHtml
          contentWidth={100}
          source={{html: details}}
          defaultTextProps={{style: styles.defaultStyles}}
          renderers={renderers}
          tagsStyles={{
            p: {...styles.paraStyles},
            b: {fontWeight: 'bold'},
            ul: {listStyleType : 'none', ...styles.ulStyles},
            li: {...styles.liStyles},
            strong: { ...styles.liStyles }
          }}
        />
      </View>
      <TipFooter
        id={id}
        source_url_text={source_url_text}
        source_url={source_url}
        bookmarked={bookmarked}
        handleBookmark={bookMarkTip}
        comments={comments}
      />
    </View>
  );
}

export default React.memo(Index);

const styles = StyleSheet.create({
  container: {
    marginTop: DIMEN.MARGIN.SM,
    height: 250,
    borderRadius: 5,
    flexDirection: 'column',
    elevation: 2,
    backgroundColor: COLOR.WHITE,
    padding: DIMEN.PADDING.ME,
  },
  careerTxtStyle: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.X_SMALL,
    color: COLOR.PRIMARY_300,
  },
  imageStyles: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  content: {
    // flexGrow: 1,
    // padding: 5,
  },
  dateStyle: {
    textTransform: 'uppercase',
    color: COLOR.SECONDARY_500,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  locationStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  titleStyle: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.BODY,
    color: COLOR.GREY_300,
    marginTop: DIMEN.MARGIN.XSM,
  },
  descriptionStyle: {
    color: COLOR.PRIMARY_200,
  },
  paraStyles: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
    textAlign: 'justify',
    paddingVertical: 5,
    flexWrap: 'wrap',
  },
  ulStyles: {
    // listStyleType: 'none',
    paddingHorizontal: 5,
    paddingVertical: 1,
    textAlign: 'justify',
    flexWrap: 'wrap',
  },
  liStyles: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY
  },
  defaultStyles: {
    fontFamily: FONT_NAMES.Body,
    flexWrap: 'wrap'
  }
});