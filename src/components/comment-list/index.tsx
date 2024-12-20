import { StyleSheet, Text, View, Image, LayoutChangeEvent, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Comment } from '@src/types';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { resourceAge } from '@src/helper/functions';
import { environments } from '@src/constants/environments';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import Icons from '@src/assets/icons';
import Dot from '../common/dot';

const { BASE_URL } = environments;

interface CommentListProps {
  title?: string;
  comments: Comment[];
  setReplyTo: React.Dispatch<React.SetStateAction<Comment | null>>
  onReply?: () => void;
  sectionLayout?: (event: LayoutChangeEvent) => void;
}

function ShowComment({ comment, setReplyTo }:
  {
    comment: Comment,
    setReplyTo: React.Dispatch<React.SetStateAction<Comment | null>>
  }) {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const getImage = React.useCallback((url: string) => ({ uri: `${BASE_URL}${url}` }), []);

  return (
    <View style={styles.comments}>
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
              <Dot />
              <Text style={styles.timeStamp}>{resourceAge(new Date(comment.createdAt as string))}</Text>
            </View>
            {/* <Text style={styles.commentor_email}>{comment?.author.email}</Text> */}
          </View>
        </View>}
      </View>
      <Text style={styles.contentStyle}>{comment.content}</Text>
      <View style={styles.view_replies_styles}>
        {!comment.gotThread && <View />}
        {comment.gotThread &&
          <Pressable onPress={() => setShowReplies(!showReplies)}>
            <Text style={styles.show_replies_text}>{showReplies ? 'Hide replies' : `Show replies (${comment.children?.length})`}</Text>
          </Pressable>}
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', gap: DIMEN.CONSTANT.XXSM, alignSelf: 'flex-end' }}
          onPress={() => setReplyTo(comment)}>
          <Icons name={'share-arrow'} size={12} />
          <Text style={styles.show_replies_text}>Reply</Text>
        </Pressable>
      </View>

      {/* Threaded Replies */}
      {showReplies && comment?.children && comment?.children.length > 0 && (
        <View style={styles.thread_view}>
          {comment?.children.map((child) => (
            <ShowComment
              key={child.id}
              comment={child}
              setReplyTo={setReplyTo}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const Index = ({ title, comments, sectionLayout, setReplyTo }: CommentListProps) => {
  return (
    <View onLayout={sectionLayout}>
      <Text style={styles.commentTitle}>{title ? title : 'Comments'}</Text>
      {
        comments.length > 0 ? comments.map((comment: Comment, index) => (
          comment.approvalStatus !== 'REJECTED' &&
          <ShowComment comment={comment} setReplyTo={setReplyTo} key={index} />
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
    borderBottomWidth: 0.5,
    borderColor: COLOR.GREY_50,
    padding: DIMEN.PADDING.SM,
    // paddingBottom: 50
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
  thread_view: {
    paddingHorizontal: DIMEN.CONSTANT.ME,
    // borderWidth: 0.5,
    // borderColor: COLOR.GREY_50,
    margin: DIMEN.MARGIN.XSM,
    borderRadius: DIMEN.CONSTANT.SM,
  },
  view_replies_styles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: DIMEN.MARGIN.SM,
  },
  show_replies_text: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
  }
})