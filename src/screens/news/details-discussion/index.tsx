import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// constants and assets imports
import Icons from '@src/assets/icons'
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants'
import { FONT_NAMES } from '@src/assets/fonts/fonts'
import { environments } from '@src/constants/environments'

// type imports
import { Comment, RootStackParamList } from '@src/types'

// component and hook imports
import { Comment_, CommentList, Dot } from '@src/components'
import { usePosts } from "@src/context/post-context"
import { AppContext } from '@src/context'

// utility imports
import { kSeparator, resourceAge } from '@src/helper'
import count_post_view from '@src/utils/count_views'

const { BASE_URL } = environments;

const DiscussionScreen = () => {
  // navigation and route hooks
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Discussion'>>();

  // custom hooks
  const { posts, setPost } = usePosts();
  const { fetchComments, submitComment } = usePosts();

  // context
  const { jwt } = useContext(AppContext);

  // route parameters
  const { id } = route.params;

  // prevent unnecessary recalculations
  const post_data = useMemo(() =>
    posts.find((product: any) => product?.id === id),
    [posts, id]
  );

  // state
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  // image getter
  const getImage = useCallback((url: string) => ({
    uri: `${BASE_URL}${url}`
  }), [BASE_URL]);

  // comment submission handler
  const handleSubmitCommit = useCallback(async () => {
    try {
      if (!comment.trim()) return;

      const commentHandler = replyTo
        ? () => submitComment(id, comment, jwt, replyTo.id)
        : () => submitComment(id, comment, jwt);

      const newComment = await commentHandler();

      if (!newComment) return;

      setComments(prevComments => {
        if (replyTo) {
          // update for nested comments
          const updateNestedComments = (comments: Comment[]): Comment[] =>
            comments.map(comment =>
              comment.id === replyTo.id
                ? {
                  ...comment,
                  children: [newComment, ...(comment.children || [])]
                }
                : comment.children
                  ? { ...comment, children: updateNestedComments(comment.children) }
                  : comment
            );

          return updateNestedComments(prevComments);
        }

        return [...prevComments, newComment as Comment];
      });

      // reset comment state
      setComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Comment submission error:', error);
    }
  }, [id, comment, jwt, replyTo, submitComment]);

  // post update function
  const updatePosts = useCallback((id_: number, views_: number) => {
    setPost(prevPosts =>
      prevPosts.map(post =>
        post.id === id_ ? { ...post, views: views_ } : post
      )
    );
  }, [setPost]);

  // fetching and post count effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        await count_post_view(id, jwt, updatePosts);
        const data_comments = await fetchComments(id);
        setComments(data_comments);
      } catch (error) {
        console.error('Data fetching error:', error);
      }
    };

    fetchData();
  }, [id, jwt, fetchComments, updatePosts]);

  // render methods
  const renderProfileImage = useMemo(() => {
    const photoUrl = post_data?.author?.data?.attributes?.photo?.data?.attributes?.url;
    return photoUrl
      ? <Image
        source={getImage(photoUrl)}
        style={styles.profileImage}
      />
      : <Icons name='user' _color={COLOR.GREY_200} size={25} />;
  }, [post_data, getImage]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.nav_view}>
        <Icons
          name='back'
          size={20}
          _color={COLOR.GREY_200}
          press={() => navigation.goBack()}
        />
        <Text style={styles.heading_text}>Square</Text>
        <View />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_view_style}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.starter_profile}>
          {renderProfileImage}
          <Text style={styles.start_name_txt}>
            {`${post_data?.author.data.attributes.firstName} ${post_data?.author.data.attributes.lastName}`}
          </Text>
        </View>

        <View style={styles.starter_view_b}>
          <Text style={styles.small_text}>
            {resourceAge(new Date(post_data?.createdAt as string))}
          </Text>
          <Dot />
          <Text style={styles.small_text}>
            {comments.length} replies
          </Text>
        </View>

        <View style={styles.square_heading_view}>
          <Text style={styles.square_heading_txt}>
            {post_data?.topics.data.at(0)?.attributes.name}
          </Text>
          <View style={styles.likeContainer}>
            <Text style={styles.likeCount}>
              {post_data?.views ? kSeparator(post_data?.views) : 0}
            </Text>
            <Text style={styles.view_text_text}>views</Text>
          </View>
        </View>

        {post_data?.content && (
          <Text style={styles.content_text}>
            {post_data.content}
          </Text>
        )}

        <CommentList
          comments={comments}
          title='Replies'
          setReplyTo={setReplyTo}
        />
      </ScrollView>

      <Comment_
        replyTo={replyTo}
        setReplyTo={setReplyTo}
        comment={comment}
        setComment={setComment}
        handleSubmitCommit={handleSubmitCommit}
      />
    </KeyboardAvoidingView>
  );
};

export default React.memo(DiscussionScreen);

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