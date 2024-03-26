import React, { useContext } from 'react'
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native'
import {AppContext} from '../../helper/context/AppContext';
import {environments} from '../../constants/environments';
import {storeData} from '../../../api/strapiJSAPI';

interface CommentsProps{
  wantsToComment: boolean
  resourceId: number
  comments: any[]
}

const {BASE_URL} = environments;

const Comments = function ({wantsToComment, comments, resourceId}:CommentsProps){
  
  const [comment, setComment] = React.useState<string>('')
  const {user, isLoggedIn} = useContext(AppContext);
  
  const submitComment = async function () {
    const data = {
      comment,
      resourceId,
      type: 'Tech Tip',
      author: isLoggedIn ? user?.id : null
    }
    // console.log(data);
    const response = await storeData('comments', data)
    if (response.ok) {
      
    }
  };

  return  wantsToComment && (
    <View style={styles.commentContainer}>
      {comments.map(function (comment, index) {
        return (
          <View style={styles.commentView} key={index}>
            {(comment.author && comment.author?.photo?.attributes?.url) ?
              <Image source={{ uri: `${BASE_URL}/uploads/${user?.photo}` }} />
              :
              <FontAwesome
                size={25}
                name="user-circle-o"
                color={COLOR.SECONDARY_100}
              />}
            <Text style={styles.commentText}>{comment}</Text>
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
          placeholder='Add a comment'
          style={styles.commentInput}
          onChangeText={text => setComment(text)}
        />
        <Ionicons
          name='send-outline'
          size={20}
          color={COLOR.SECONDARY_300}
          disabled={comment.length === 0}
          onPress={submitComment}
        />
      </View>
    </View>
  );
}

export default Comments;

const styles = StyleSheet.create({
  commentInput: {
    flex: 1,
    padding:5,
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_50,
    borderRadius:5
  },
  commentView: {
    marginVertical:5
  },
  commentText: {
    fontSize:FONTSIZE.BODY
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
  },
  commentContainer: {
    marginBottom: 20,
    marginTop:10
  }
})