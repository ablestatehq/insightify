import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import {COLOR, DIMEN} from '@constants/constants';
import {
  StyleSheet, Text, View, Platform,
  KeyboardAvoidingView, TextInput, Pressable
} from 'react-native'

interface SendCardProps {
  replyingTo: string | null;
  messageMap: Map<string, any>;
  userId: number;
  newMessage: any;
  setNewMessage: React.Dispatch<React.SetStateAction<any>>
  closeReply: () => void;
}
const Index = ({
  replyingTo,
  messageMap,
  userId,
  // textInputRef,
  newMessage,
  setNewMessage,
  closeReply,
}: SendCardProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.replyContainer}
    >
      {replyingTo !== null && <View style={styles.replyMessageContainer}>
        <Text style={styles.replyTo}>{messageMap.get(replyingTo)?.sender.data.id == userId ?
          'You' :
          messageMap.get(replyingTo)?.sender.data.attributes.username}</Text>
        <Text numberOfLines={2} style={styles.replyText}>{messageMap.get(replyingTo)?.content}</Text>
        <Pressable style={styles.close} onPress={closeReply}>
          <Ionicons name="close" size={15} color={COLOR.SECONDARY_100} />
        </Pressable>
      </View>}
      <TextInput
        style={{ ...styles.input, borderRadius: 100, paddingHorizontal: 15}}
        placeholderTextColor={COLOR.GREY_300}
        value={newMessage}
        onChangeText={setNewMessage}
        onEndEditing={(e: any) => {
          setNewMessage(e.nativeEvent.text);
          e.nativeEvent
        }}
        placeholder="Type your message..."
      />
    </KeyboardAvoidingView>
  )
}

export default Index;

const styles = StyleSheet.create({
  replyContainer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    borderRadius: 15,
  },
  input: {
    borderColor: COLOR.GREY_50,
    backgroundColor: COLOR.WHITE,
    padding: DIMEN.PADDING.SM
  },
  replyMessageContainer: {
    backgroundColor: COLOR.GREY_50,
    margin: 5,
    padding: 5,
    borderRadius: DIMEN.PADDING.SM,
    borderLeftWidth: 3,
    borderLeftColor: COLOR.PRIMARY_300,
  },
  replyText: {
    color: COLOR.GREY_100,
  },
  replyTo: {
    color: COLOR.PRIMARY_400,
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5
  }
})