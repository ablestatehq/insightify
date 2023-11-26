import {
  Animated,
  StyleSheet,
  View,
} from 'react-native'
import React, { Fragment, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import TrendingNewsItem from '../TrendingNewsItem/TrendingNewsItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLOR, FONTSIZE } from '../../../constants/contants';
import HomeHeading from '../../HomeScreenText/HomeHeading';
import { AppContext } from '../../../helper/context/AppContext';


const NewsListContainer:React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { articles } = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      <HomeHeading title='Trending in Africa' />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Container for the list of the rest of the news  */}
        {
          articles.map((item: any, index: number) => (
            <Fragment key={index}>
              <TrendingNewsItem
                title={item.title}
                reporter={`Tech News Africa`}
                datePublished={item.publishedAt}
                featuredImage={{ uri: item.featured_image }}
                handleTendingArticleClick={() => {
                  navigation.navigate('Details', item);
                }}
              />
            </Fragment>
          ))
        }
      </Animated.ScrollView>
    </View >
  )
}

export default NewsListContainer

const styles = StyleSheet.create({
  networkErrorCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerCard: {
    backgroundColor: COLOR.WHITE,
    width: 200,
    height: 200,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.TITLE_2,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  reloadText: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLOR.B_300,
    padding: 5,
    borderRadius: 5
  },
  reloadBtn: {
  }
})