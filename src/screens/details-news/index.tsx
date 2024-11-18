import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icons from '@src/assets/icons';
import { StoryDetailsProps } from '@src/types/navigation';

const Index = () => {
  // hooks 
  const route = useRoute<StoryDetailsProps>();
  const navigation = useNavigation();

  const { featured_image, title, author, id, content, resources, publishedAt, readTime } = route.params;
  const getImage = () => ({ uri: featured_image });
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={{position: 'relative'}}>
          <Icons name='back'
            _color={COLOR.WHITE}
            style={styles.back_btn}
            press={() => navigation.goBack()} />
          <Image source={getImage()} style={styles.articleImage} resizeMethod="resize" resizeMode='cover' />
        </View>
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{title}</Text>
          <Text style={styles.articleAuthor}>By {author}</Text>
          <View style={styles.articleMeta}>
            <Text style={styles.articleDate}>
              {new Date(publishedAt as string).getDate()}-{new Date(publishedAt as string).getUTCMonth()}-{new Date(publishedAt as string).getFullYear()}
            </Text>
            <Text style={styles.articleReadTime}>{readTime} read.</Text>
          </View>
          <Text style={styles.articleContent}>{content}</Text>
        </View>
      </ScrollView>
      {/* <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Icons name='message' _color={COLOR.GREY_200} size={15}/>
          <Text style={styles.bottomButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Icons name='Share' />
          <Text style={styles.bottomButtonText}>Share</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    padding: 16,
  },
  back_btn: {
    position: 'absolute',
    zIndex: 10,
    padding: DIMEN.CONSTANT.SM,
    backgroundColor: COLOR.NEUTRAL_2,
    borderRadius: DIMEN.CONSTANT.XLG,
    margin: DIMEN.MARGIN.XXSM,
  },
  articleInfo: {
    // flexDirection: 'row',
    // gap: DIMEN.CONSTANT.XSM
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: FONT_NAMES.Heading,
  },
  articleMeta: {
    flexDirection: 'row',
    marginBottom: DIMEN.MARGIN.LG,
    gap: DIMEN.CONSTANT.XSM,
    alignItems: 'center'
  },
  articleAuthor: {
    color: COLOR.GREY_100,
    marginRight: DIMEN.CONSTANT.SM,
    marginBottom: DIMEN.CONSTANT.ME,
    fontFamily: FONT_NAMES.Title
  },
  articleDate: {
    color: COLOR.GREY_100,
    marginRight: DIMEN.CONSTANT.SM,
  },
  articleReadTime: {
    // color: COLOR.GREY_50,
  },
  articleContent: {
    lineHeight: 24,
  },
  bottomBar: {
    // position: 'absolute',
    // bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLOR.WHITE,
    padding: DIMEN.CONSTANT.ME,
    // width: '80%',
    // alignSelf: 'center',
    elevation: 1,
    // marginBottom: DIMEN.CONSTANT.XSM
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: DIMEN.CONSTANT.XXSM,
  },
  bottomButtonText: {
    // color: '#fff',
    fontFamily: FONT_NAMES.Body,
  },
});
