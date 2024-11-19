import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState, useCallback, useEffect, useContext } from 'react'
import Icons from '@src/assets/icons'
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Comment, RootStackParamList } from '@src/types'
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import { environments } from '@src/constants/environments'
import { resourceAge } from '@src/helper/functions'
import { Comment_, CommentList, Dot } from '@src/components'
import { usePosts } from '@src/hooks'
import { AppContext } from '@src/context'

const { BASE_URL } = environments;
const Index = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Discussion'>>();

  // state 
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const {
    id,
    author,
    content,
    createdAt,
    media,
    mentions,
    poll,
    topics,
    type,
    updatedAt,
    views,
    meta,
  } = route.params;

  const getImage = useCallback((url: string) => ({ uri: `${BASE_URL}${url}` }), []);
  const { fetchComments, submitComment } = usePosts();
  const { jwt } = useContext(AppContext);

  useEffect(() => {
    const _fetch = async () => {
      const data_comments = await fetchComments(id);
      setComments(data_comments)
    }

    _fetch().then(() => { }).catch();
  }, []);

  const handleSubmitCommit = async () => {
    if (replyTo) {
      const _reply = await submitComment(id, comment, jwt, replyTo.id);
      if (_reply) {
        setComments(prev => {
          const updateReplies = (comments: Comment[]): Comment[] => {
            return comments.map((comment) => {
              if (comment.id === replyTo.id) {
                return {
                  ...comment,
                  children: [_reply, ...(comment.children || [])],
                };
              }
              // run recursion on the nested children
              return comment.children ? { children: updateReplies(comment.children) , ...comment } : comment;
            });
          };
          return updateReplies(prev);
        });
        setComment('');
        setReplyTo(null);
      }
      console.log(replyTo);
    } else {
      const _comment = await submitComment(id, comment, jwt);
      if (_comment) {
        setComments([...comments, _comment as Comment]);
        setComment('');
        setReplyTo(null);
      }
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.nav_view}>
        <Icons name='back' size={20} _color={COLOR.GREY_200} press={() => navigation.goBack()} />
        <Text style={styles.heading_text}>Square</Text>
        <View />
        {/* <Icons name='Share' press={() => { }} style={styles.share_icon} size={10} _color={COLOR.GREY_200} /> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_view_style}
        keyboardShouldPersistTaps="always">
        <View style={styles.starter_profile}>
          {author?.data?.attributes?.photo.data ?
            <Image source={getImage(author.data.attributes?.photo?.data?.attributes?.url)} style={styles.profileImage} /> :
            <Icons name='user' _color={COLOR.GREY_200} size={25} />}
          <Text style={styles.start_name_txt}>{`${author.data.attributes.firstName} ${author.data.attributes.lastName}`}</Text>
          {/* <View style={styles.dot_style} />
        <Pressable>
          <Text style={styles.start_follow_txt}>Follow</Text>
        </Pressable> */}
        </View>

        <View style={styles.starter_view_b}>
          <Text style={styles.small_text}>{resourceAge(new Date(createdAt as string))}</Text>
          <Dot />
          <Text style={styles.small_text}>{comments.length} replies</Text>
        </View>

        {/* like Section */}
        <View style={styles.square_heading_view}>
          <Text style={styles.square_heading_txt}>{topics.data.at(0)?.attributes.name}</Text>
          <View style={styles.likeContainer}>
            {/* <Icons name='heart' size={15} /> */}
            <Text style={styles.view_text_text}>views</Text>
            <Text style={styles.likeCount}>{views ? views : 0}</Text>
          </View>
        </View>

        {/* content  */}
        {content && <Text style={styles.content_text}>{content}</Text>}

        {/* replies  */}
        <CommentList comments={comments} title='Replies' setReplyTo={setReplyTo} />
      </ScrollView>
      <Comment_
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        comment={comment}
        setComment={setComment}
        handleSubmitCommit={handleSubmitCommit}
      />
      {/* </View> */}
    </KeyboardAvoidingView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DIMEN.PADDING.ME,
    backgroundColor: COLOR.WHITE,
  },
  nav_view: {
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.ME,
    alignItems: 'center',
    // borderWidth: 1,
    justifyContent: 'space-between'
  },
  scroll_view_style: {
    // flex: 1,
    marginTop: DIMEN.MARGIN.ME,
    paddingBottom: 80,
  },
  heading_text: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.BODY
  },
  share_icon: {
    alignSelf: 'flex-end',
  },
  starter_profile: {
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.SM,
  },
  start_name_txt: {
    fontFamily: FONT_NAMES.Heading,

  },
  start_follow_txt: {},
  starter_view_b: {
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.XXSM,
    alignItems: 'center',
    marginTop: DIMEN.CONSTANT.XSM,
  },
  profileImage: {
    width: 25,
    height: 25,
    aspectRatio: 1,
    borderRadius: DIMEN.CONSTANT.XLG,
  },
  view_text_text: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL
  },
  likeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderLeftWidth: 1,
    paddingHorizontal: DIMEN.PADDING.ME,
    borderLeftColor: COLOR.GREY_50,
    marginLeft: DIMEN.MARGIN.SM,
  },
  likeCount: {
    fontSize: FONTSIZE.SMALL,
    marginTop: DIMEN.CONSTANT.XXSM,
    fontFamily: FONT_NAMES.Body,
  },
  square_heading_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: DIMEN.MARGIN.ME,
  },
  square_heading_txt: {
    flex: 1,
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.BODY,
  },
  content_text: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
    textAlign: 'justify'
  },
  commentTitle: {
    textAlign: 'left',
    fontSize: FONTSIZE.BODY,
    marginVertical: DIMEN.MARGIN.SM,
    fontFamily: FONT_NAMES.Title,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMEN.MARGIN.SM,
    backgroundColor: 'transparent',
    marginHorizontal: DIMEN.MARGIN.ME,
    marginVertical: DIMEN.MARGIN.SM,
  },
  comments: {
    marginVertical: DIMEN.MARGIN.SM,
  },
  devProfile: {
    flexDirection: 'row',
    gap: DIMEN.MARGIN.SM,
  },
  no_comments: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
    color: COLOR.GREY_100,
    left: 30,
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
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLOR.GREY_100,
    padding: DIMEN.PADDING.SM,
    borderRadius: DIMEN.MARGIN.XLG,
    paddingHorizontal: DIMEN.PADDING.ELG
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
  small_text: { fontFamily: FONT_NAMES.Body, fontSize: FONTSIZE.SMALL }
})