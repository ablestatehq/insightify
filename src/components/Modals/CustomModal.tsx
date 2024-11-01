import { Modal, StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { COLOR, FONTSIZE } from '@constants/constants'
import Button from '../Button'
import { FONT_NAMES } from '@fonts'

interface CustomModalProps {
  title: string
  message: string
  cancel?: () => void
  accept?: () => void
  visibility: boolean
  acceptText?: string
  cancelText?: string
};

/**
 * @function CustomModal
 * 
 * @returns {Component}
 * 
 * @prop {title:string}
 * @prop {message:string}
 * @prop {cancel:Function}
 * @prop {accept:Function}
 * @prop {visibility:Boolean}
 */
const CustomModal: React.FC<CustomModalProps> = (
  {
    title,
    message,
    cancel,
    accept,
    visibility,
    cancelText,
    acceptText
  }
) => {
  return (
    <Modal visible={visibility} transparent>
      <TouchableWithoutFeedback onPress={cancel}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.contentContainer}>
              <Text style={styles.heading}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              {/* buttons  */}
              <View style={styles.buttons}>
                {/* If the accept button in not visible, create an invisible view  */}
                {!accept && <View />}
                {accept &&
                  <Button
                    title={acceptText ?? 'Accept'}
                    handlePress={accept}
                    textStyle={[styles.btnText, { color: COLOR.SECONDARY_300 }]}
                    btn={[styles.btn, { backgroundColor: COLOR.GREY_50 }]}
                  />}
                {cancel &&
                  <Button
                    title={cancelText ?? 'Cancel'}
                    handlePress={cancel}
                    textStyle={[styles.btnText, { color: COLOR.SECONDARY_300 }]}
                    btn={styles.btn}
                  />}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.NEUTRAL_2} />
    </Modal>
  );
}

export default CustomModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.NEUTRAL_2
  },
  contentContainer: {
    width: '75%',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor: COLOR.WHITE,
  },
  heading: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_1,
    color: COLOR.SECONDARY_300,
  },
  message: {
    fontSize: FONTSIZE.TITLE_2,
    marginTop: 10,
    fontFamily: FONT_NAMES.Title,
    color: COLOR.SECONDARY_300
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  btn: {
    paddingBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: COLOR.SECONDARY_50,
    borderRadius: 5
  },
  btnText: {
    fontFamily: FONT_NAMES.Heading,
    color: COLOR.WHITE
  },
});