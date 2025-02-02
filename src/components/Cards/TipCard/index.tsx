import React from 'react'
import {Pressable, StyleSheet, View, Text, Image} from 'react-native'
import {COLOR, FONTSIZE} from '../../../constants/constants';
import CodeSnippet from '../CodeSnippet';
import HTMLText from '../HTMLText';
import RenderHtml from 'react-native-render-html';
import {FONT_NAMES} from '../../../assets/fonts/fonts';


const Index = (props: any) => {

  const {description, image, title} = props;

  const renderers = {
    code: CodeSnippet,
    p: HTMLText
  };

  return (
    <Pressable style={styles.container}>
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
          source={{html: description}}
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
    </Pressable>
  );
}

export default React.memo(Index);

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: 5,
    flexDirection: 'column',
    margin: 10,
    borderColor: COLOR.GREY_100,
    elevation: 2,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: 10
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
    marginVertical: 5,
    color: COLOR.PRIMARY_300,
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