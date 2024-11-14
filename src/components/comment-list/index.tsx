import { StyleSheet, Text, View, Image, LayoutChangeEvent } from 'react-native'
import React from 'react'
import { Comment } from '@src/types'
import { FontAwesome } from '@expo/vector-icons'
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants'
import { resourceAge } from '@src/helper/functions'
import { environments } from '@src/constants/environments';
import { FONT_NAMES } from '@src/assets/fonts/fonts'

const {BASE_URL} = environments;

interface CommentListProps {
  title?: string;
  comments: Comment[];
  sectionLayout?: (event: LayoutChangeEvent) => void;
}
const Index = ({title, comments, sectionLayout}: CommentListProps) => {

  const getImage = React.useCallback((url: string) => ({ uri: `${BASE_URL}${url}` }), []);
  return (
    <View onLayout={sectionLayout}>
      <Text style={styles.commentTitle}>{title ? title : 'Comments'}</Text>
      {
        comments.length > 0 ? comments.map((comment: Comment, index) => (
          comment.approvalStatus !== 'REJECTED' &&
          <View style={styles.comments} key={index}>
            <View style={styles.commentedBy}>
              {comment.author && <View style={styles.devProfile}>
                {comment.author && !comment.author.avatar &&
                  <FontAwesome
                    size={30}
                    name="user-circle-o"
                    color={COLOR.SECONDARY_100}
                  />}
                {comment.author && comment.author.avatar &&
                  <Image
                    source={getImage(comment.author.avatar)}
                    height={30}
                    width={30}
                    resizeMethod="resize"
                    resizeMode="cover"
                    style={styles.avatar}
                  />
                }
                <View>
                  <View style={styles.commentor_view}>
                    <Text style={styles.commentor}>{comment?.author.name}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.timeStamp}>{resourceAge(new Date(comment.createdAt as string))} ago</Text>
                  </View>
                  {/* <Text style={styles.commentor_email}>{comment?.author.email}</Text> */}
                </View>
              </View>}
            </View>
            <Text style={styles.contentStyle}>{comment.content}</Text>
          </View>
        )) :
          <Text style={styles.no_comments}>No {title ? title.toLowerCase() : 'comments'}</Text>
      }
    </View >
  )
}

export default Index

const styles = StyleSheet.create({
  devProfile: {
    flexDirection: 'row',
    gap: DIMEN.MARGIN.SM,
  },
  commentTitle: {
    textAlign: 'left',
    fontSize: FONTSIZE.BODY,
    marginVertical: DIMEN.MARGIN.SM,
    fontFamily: FONT_NAMES.Title,
  },
  comments: {
    marginVertical: DIMEN.MARGIN.SM,
    // padding: DIMEN.PADDING.SM,
  },
  no_comments: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
    color: COLOR.GREY_100,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  commentor: {
    textAlign: 'left',
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Title,
    lineHeight: DIMEN.CONSTANT.ME,
  },
  commentor_view: {
    // flex:1,
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.SM,
    alignItems: 'center',
    paddingVertical: DIMEN.CONSTANT.XXSM,
  },
  commentedBy: {
    flexDirection: 'row',
    gap: DIMEN.MARGIN.SM,
    // alignItems: 'center',
  },
  dot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 10,
    backgroundColor: COLOR.GREY_100,
  },
  timeStamp: {
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Body,
    color: COLOR.GREY_100,
    lineHeight: DIMEN.CONSTANT.ME
  },
  avatar: {

  },
  commentor_email: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.X_SMALL,
    lineHeight: 10,
  },
  contentStyle: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
    marginTop: DIMEN.MARGIN.ME,
    marginBottom: DIMEN.MARGIN.XXSM,
  },
})