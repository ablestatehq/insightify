import React from 'react';
import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import { COLOR, FONTSIZE } from '../../../../constants/contants';
import { ArticleLifeSpan } from '../../../../helper/functions/functions';

interface NewsItemContainerProps {
  image: any,
  title: string,
  author: string,
  publishedAt: string,
  handleNavigation: () => void
}

const NewsItemContainer = (
  {
    image,
    title,
    author,
    publishedAt,
    handleNavigation
  }: NewsItemContainerProps
) => {

  return (
    <View
      style={styles.container}
    >
      <Pressable
        onPress={handleNavigation}
      >
        <View
          style={styles.imageView}
        >
          <Image
            source={image}
            style={styles.imageStyle}
            // width={100}
            resizeMethod='resize'
            resizeMode='cover'
          />
        </View>
        <View
          style={styles.headingContainer}
        >
          <Text
            style={{
              ...styles.headingText,
            }}
          numberOfLines={2}
          >
          {title}
        </Text>
        <Text
            style={{
              ...styles.text,
              fontFamily:"RalewayRegular"
            }}
        >
          From {author}
        </Text>
        <View
          style={styles.footerContainer}
        >
          <Text
            style={styles.text}
          >
            {new Date(publishedAt).toDateString()}
          </Text>
          <Text
              style={{
                ...styles.text,
                fontFamily:"RalewayRegular"
            }}
          >{ArticleLifeSpan(publishedAt)} </Text>
        </View>
    </View>
      </Pressable >
    </View >
  );
}

export default NewsItemContainer

const styles = StyleSheet.create({
  container: {
  },

  imageView: {
    borderRadius: 10,
    width:'100%'
  },

  imageStyle: {
    height: 250,
    borderRadius: 10,
  },

  headingText: {
    fontSize: FONTSIZE.HEADING_5,
    color: COLOR.WHITE,
    fontFamily:"ComfortaaBold"
  },

  headingContainer: {
    width: '100%',
    flex:1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLOR.NEUTRAL_2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    gap: 5,
  },

  text: {
    color: COLOR.WHITE,
    fontFamily:"RalewayRegular"
  }
})