import {StyleSheet, View, Image, Pressable, Text} from 'react-native'
import React from 'react'
import {Post, RootStackParamList, SquareProps} from '@src/types';
import Animated from 'react-native-reanimated';
import EmptyState from '../EmptyState';
import Icons from '@src/assets/icons';
import {COLOR, DIMEN, FONTSIZE} from '@src/constants/constants';
import {FONT_NAMES} from '@src/assets/fonts/fonts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {environments} from '@src/constants/environments';

const {BASE_URL} = environments;
const Index = ({ discussions}: SquareProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const renderDiscussion = ({ item, index }: { item: Post, index: number }) => {
    const getImage = () => ({uri: `${BASE_URL}${item?.author?.data?.attributes.photo.data.attributes.url}` })
    return (
      <Pressable style={styles.card} onPress={() => navigation.navigate('Discussion', {...item})}>
        {/* Profile Image */}
        {item.author?.data?.attributes?.photo?.data ?
          <Image source={getImage()} style={styles.profileImage} /> :
          <Icons name='user' _color={COLOR.GREY_200} size={20} />}

        {/* Content */}
        <View style={styles.content}>
          {item?.topics && <Text style={styles.title} numberOfLines={2}>{item?.topics?.data?.at(0)?.attributes?.name}</Text>}
          <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>{item?.content}</Text>
        </View>

        {/* like Section */}
        <View style={styles.likeContainer}>
          {/* <Icons name='heart' size={15}/> */}
          <Text style={styles.view_text_style}>views</Text>
          <Text style={styles.likeCount}>{item?.views ? item?.views : 0}</Text>
        </View>
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={discussions}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        renderItem={renderDiscussion}
        ListEmptyComponent={<EmptyState text='Discussions' />}
        contentContainerStyle={styles.scrollStyle}
      />
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollStyle: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    height: 100,
    gap: DIMEN.CONSTANT.SM,
    // alignItems: 'center',
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: DIMEN.CONSTANT.XSM,
    borderBottomWidth: 1, 
    borderBottomColor: COLOR.GREY_50,
    paddingVertical: DIMEN.PADDING.LG,
  },
  profileImage: {
    width: 20,
    // height: 25,
    aspectRatio: 1,
    borderRadius: DIMEN.CONSTANT.XLG,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Heading,
    lineHeight: 20,
    // textAlign: 'justify'
  },
  description: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
    textAlign: 'justify',
    textAlignVertical: 'center',
    flex: 1,
  },
  featuredTag: {
    backgroundColor: COLOR.PRIMARY_300,
    borderRadius: DIMEN.CONSTANT.XSM,
    paddingVertical: DIMEN.CONSTANT.XXSM,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  featuredText: {
    color: COLOR.WHITE,
    fontSize: 12,
  },
  likeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderLeftWidth: 1, 
    paddingHorizontal: DIMEN.PADDING.ME,
    borderLeftColor: COLOR.GREY_50,
    marginLeft: DIMEN.MARGIN.SM,
    paddingRight: DIMEN.PADDING.LG
  },
  likeCount: {
    fontSize: FONTSIZE.SMALL,
    marginTop: DIMEN.CONSTANT.XXSM,
    fontFamily: FONT_NAMES.Body,
  },
  view_text_style: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
  }
});