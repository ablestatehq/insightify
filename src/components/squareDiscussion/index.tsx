import React from 'react'
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import EmptyState from '../EmptyState';
import {kSeparator} from '@src/helper';
import {FONT_NAMES, Icons} from '@src/assets';
import {Post, RootStackParamList, SquareProps} from '@src/types';
import {COLOR, DIMEN, FONTSIZE, environments} from '@src/constants';

const {BASE_URL} = environments;
const DiscussionList = ({ discussions }: SquareProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = 
    ({ item }: { item: Post}) => {
      const image = item?.author?.data?.attributes?.photo?.data?.attributes?.url
        ? { uri: `${BASE_URL}${item?.author?.data?.attributes?.photo?.data?.attributes?.url}` }
        : null;

      return (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('Discussion', { ...item })}
        >
          {/* Profile Image */}
          {image ? (
            <Image source={image} style={styles.profileImage} />
          ) : (
            <Icons name="user" _color={COLOR.GREY_200} size={20} />
          )}

          {/* Content */}
          <View style={styles.content}>
            {item?.topics?.data?.at(0)?.attributes?.name && (
              <Text style={styles.title} numberOfLines={2}>
                {item?.topics?.data?.at(0)?.attributes?.name}
              </Text>
            )}
            <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
              {item?.content}
            </Text>
          </View>

          {/* like Section */}
          <View style={styles.likeContainer}>
            <Text style={styles.likeCount}>{item?.views ? kSeparator(item?.views) : 0}</Text>
            <Text style={styles.view_text_style}>views</Text>
          </View>
        </Pressable>
      );
    }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={discussions}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState text="Discussions" />}
        contentContainerStyle={styles.scrollStyle}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
}

export default DiscussionList;

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