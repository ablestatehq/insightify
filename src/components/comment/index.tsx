import { StyleSheet, View, TextInput, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { Comment } from '@src/types';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import Icons from '@src/assets/icons';

export interface CommentProps {
  comment: string;
  replyTo: Comment | null;
  setReplyTo: React.Dispatch<React.SetStateAction<Comment | null>>
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitCommit: () => void;
}

const Index = ({ comment, replyTo, setComment, handleSubmitCommit, setReplyTo }: CommentProps) => {

  return (
    <KeyboardAvoidingView>
      <View style={styles.comment}>
        <FontAwesome
          size={25}
          name="user-circle-o"
          color={COLOR.SECONDARY_100}
          style={styles.icon_styles}
        />
        <View style={styles.main}>
          {replyTo && <View style={styles.reply_to_view_style}>
            <Text style={styles.author_name_style}>{replyTo.author?.name}</Text>
            <Text style={styles.reply_to_content} numberOfLines={2}>{replyTo.content}</Text>
            <Icons
              size={15}
              name='close'
              _color={COLOR.GREY_300}
              style={styles.close_icon}
              press={() => setReplyTo(null)}
            />
          </View>}
          <TextInput
            style={styles.input}
            placeholder="Type a comment..."
            value={comment}
            onChangeText={setComment}
          />
        </View>
        {comment.trim() &&
          <Ionicons
            name="send"
            size={20}
            color={COLOR.GREY_300}
            style={styles.send_icon_style}
            onPress={handleSubmitCommit}
          />}
      </View>
    </KeyboardAvoidingView>
  )
}

export default Index;

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMEN.MARGIN.SM,
    marginHorizontal: DIMEN.MARGIN.XSM,
    marginVertical: DIMEN.MARGIN.XSM,
  },
  close_icon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  author_name_style: {},
  main: {
    flex: 1,
    height: 35,
    backgroundColor: COLOR.WHITE,
    borderRadius: DIMEN.MARGIN.XLG,
    // borderBottomLeftRadius: DIMEN.MARGIN.XLG,
    // borderBottomRightRadius: DIMEN.MARGIN.XLG,
  },
  reply_to_content: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
  },
  input: {
    borderWidth: 0.5,
    borderColor: COLOR.GREY_50,
    padding: DIMEN.PADDING.SM,
    borderRadius: DIMEN.MARGIN.XLG,
    paddingHorizontal: DIMEN.PADDING.ELG,
    backgroundColor: COLOR.WHITE,
  },
  reply_to_view_style: {
    width: '100%',
    position: 'absolute',
    bottom: 38,
    padding: DIMEN.CONSTANT.SM,
    borderRadius: DIMEN.MARGIN.ME,
    borderTopLeftRadius: DIMEN.MARGIN.ME,
    borderTopRightRadius: DIMEN.MARGIN.ME,
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: COLOR.GREY_50,
    backgroundColor: COLOR.WHITE,
  },
  icon_styles: {
    backgroundColor: COLOR.WHITE,
    width: 25,
    height: 25,
    borderRadius: DIMEN.CONSTANT.XLG,
    // borderWidth: 1,
    // alignSelf: 'center',
  },
  send_icon_style: {
  }
})