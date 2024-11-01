import React, { useContext } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '@constants/constants';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { AppContext } from '@helpers/context/AppContext';
import { environments } from '@constants/environments';
import { storeData } from '@api/strapiJSAPI';
import { FONT_NAMES } from '@fonts';

interface CommentsProps {
  wantsToComment: boolean
  resourceId: number
  comments: any[]
}

const { BASE_URL } = environments;


// Add scrollView to the comment section.
const Comments = function ({ wantsToComment, comments, resourceId }: CommentsProps) {

  const [commentText, setCommentText] = React.useState<string>('')
  const [comments_, setComments_] = React.useState<any[]>([...comments]);
  const { user, isLoggedIn } = useContext(AppContext);

  const submitComment = async function () {
    const data = {
      comment: commentText,
      resourceId,
      type: 'Tech Tip',
      author: isLoggedIn ? user?.id : null
    }

    const response = await storeData('comments', data)
    if (response) {
      setComments_(prev => [...prev, response?.data?.attributes]);
      setCommentText('');
    }
  };

  return wantsToComment && (
    <View style={styles.commentContainer}>
      {comments_.slice(-2).map(function (comment, index) {
        return (
          <View style={{
            ...styles.commentView,
            marginHorizontal: index == 1 ? 15 : 0,
            marginVertical: 5,
          }} key={index}>
            {(comment.author && comment.author?.photo?.attributes?.url) ?
              <Image source={{ uri: `${BASE_URL}/uploads/${user?.photo}` }} />
              :
              <FontAwesome
                size={20}
                name="user-circle-o"
                color={COLOR.SECONDARY_100}
              />}
            <View style={{
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderRadius: 10,
              backgroundColor: COLOR.NEUTRAL_1
            }}>
              <Text style={{ fontFamily: FONT_NAMES.Heading, paddingBottom: 5 }}>{comment?.author?.data?.attributes?.firstName ?? 'Guest user'}</Text>
              <Text style={styles.commentText}>{comment.comment}{comment.resourceId}</Text>
            </View>
          </View>
        )
      })}
      <View style={styles.inputView}>
        {(isLoggedIn && user?.photo) ?
          <Image source={{ uri: `${BASE_URL}/uploads/${user?.photo}` }} />
          :
          <FontAwesome
            size={25}
            name="user-circle-o"
            color={COLOR.SECONDARY_100}
          />}
        <TextInput
          multiline
          value={commentText}
          placeholder='Add a comment'
          style={styles.commentInput}
          onChangeText={text => setCommentText(text)}
        />
        <Ionicons
          name='send-outline'
          size={20}
          color={COLOR.SECONDARY_300}
          disabled={commentText.length === 0}
          onPress={submitComment}
        />
      </View>
    </View>
  );
}

export default React.memo(Comments);

const styles = StyleSheet.create({
  commentInput: {
    flex: 1,
    padding: 5,
    // borderWidth: 1,
    // borderColor: COLOR.SECONDARY_50,
    borderRadius: 5
  },
  commentView: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  commentText: {
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Body,
    paddingBottom: 3
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: COLOR.SECONDARY_50
  },
  commentContainer: {
    marginBottom: 20,
    marginTop: 10
  }
})