import React from 'react';
import {View, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import { COLOR, DIMEN } from '../../../constants/constants';

interface ReactionModalProps {
  visible: boolean;
  msgKey: string;
  modalPosition: any;
  onClose: () => void;
  deleteMessage: (msgKey: string) => void;
  onReply: (msgKey: string) => void;
  onReaction: (msgKey: string, emoji: string) => void
}

const Index = ({ visible, onClose, msgKey, onReaction, onReply, deleteMessage, modalPosition}: ReactionModalProps) => {
  const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡'];
  const onOpenEmojiPicker = () => {};
  console.log(modalPosition);
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, modalPosition]}>
              <View style={styles.emojiContainer}>
                {emojis.map((emoji, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {onReaction(msgKey, emoji)}}
                  >
                    <Text style={styles.emoji}>{emoji}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.optionsContainer}>
                <Pressable style={styles.option} onPress={() => {
                  onReply(msgKey);
                  onClose();
                }}>
                  <Text>Reply</Text>
                </Pressable>
                <Pressable onPress={() => {
                  deleteMessage(msgKey);
                  onClose();
                }} style={styles.option}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLOR.PRIMARY_300,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: DIMEN.PADDING.SM,
    borderWidth: 1,
    borderColor: COLOR.PRIMARY_100,
  },
  emojiContainer: {
    flexDirection: 'row',
  },
  emoji: {
    fontSize: 15,
    marginHorizontal: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DIMEN.PADDING.ME,
  },
  option: {
    alignItems: 'center',
  },
});

export default Index;
