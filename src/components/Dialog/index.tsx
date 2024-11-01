import React from 'react'
import { Modal, StyleSheet, Text, View, Pressable } from 'react-native'
import { COLOR, FONTSIZE } from '@constants/constants';
import { FONT_NAMES } from '@fonts'
import { IDialogBox } from '@utils/types';

const Dialog = ({
  onAccept,
  onReject,
  acceptText,
  cancelText,
  visible, title, message,
}: IDialogBox) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.heading}>{title}</Text>
          <View style={styles.body}>
            <Text style={styles.text}>{message}</Text>
          </View>
          {/* buttons  */}
          <View style={styles.buttons}>
            {!onAccept && <View />}
            {onAccept && <Pressable onPress={onAccept} style={styles.button_accept}>
              <Text style={styles.button_accept_Text}>{acceptText as string}</Text>
            </Pressable>}
            {onReject && <Pressable onPress={onReject} style={styles.button_reject}>
              <Text style={styles.button_text}>{cancelText as string}</Text>
            </Pressable>}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default React.memo(Dialog);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.NEUTRAL_1
  },
  container: {
    backgroundColor: COLOR.WHITE,
    width: '90%',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 20
  },
  heading: {
    color: COLOR.CODEBACKGROUND,
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_2
  },
  text: {
    color: COLOR.SECONDARY_300,
    fontFamily: FONT_NAMES.Heading,
    marginTop: 10,
    fontSize: FONTSIZE.BODY
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  body: {
    borderTopWidth: 1,
    borderTopColor: COLOR.GREY_50,
  },
  button_accept: {
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  button_reject: {
    backgroundColor: COLOR.WHITE,
    padding: 5,
    borderRadius: 5,
  },
  button_text: {
    color: COLOR.PRIMARY_300,
    fontFamily: FONT_NAMES.Body
  },
  button_accept_Text: {
    color: COLOR.PRIMARY_300,
    padding: 5,
    fontFamily: FONT_NAMES.Body
  }
})