import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { COLOR, DIMEN } from '@src/constants/constants';

export interface CommentProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitCommit: () => void;
}

const Index = ({comment, setComment, handleSubmitCommit} : CommentProps) => {
  return (
    <View style={styles.comment}>
      <FontAwesome
        size={25}
        name="user-circle-o"
        color={COLOR.SECONDARY_100}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        onChangeText={setComment}
      />
      {comment.trim() &&
        <Ionicons
          name="send"
          size={25}
          color={COLOR.GREY_300}
          onPress={handleSubmitCommit}
        />}
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMEN.MARGIN.SM,
    backgroundColor: 'transparent',
    marginHorizontal: DIMEN.MARGIN.ME,
    marginVertical: DIMEN.MARGIN.SM,
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLOR.GREY_100,
    padding: DIMEN.PADDING.SM,
    borderRadius: DIMEN.MARGIN.XLG,
    paddingHorizontal: DIMEN.PADDING.ELG
  },
})