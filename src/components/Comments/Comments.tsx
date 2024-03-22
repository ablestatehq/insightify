import React from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {AntDesign} from '@expo/vector-icons';

interface CommentsProps{
  comment: boolean
}
const Comments = () => {
  return (
    <View>
      <TextInput
        multiline
        placeholder='Add a comment'
        style={styles.commentInput}
      />
    </View>
  )
}

export default Comments

const styles = StyleSheet.create({
  commentInput:{}
})