import React, { useState } from 'react'
import {
  Modal, Pressable, StatusBar, StyleSheet, Text,
  TextInput, ToastAndroid, TouchableWithoutFeedback, View
} from 'react-native'
import Button from '../Button'
import { storeData } from '@api/strapiJSAPI'
import { COLOR, FONTSIZE } from '@constants/constants'
import Icons from '@icons'
import { FONT_NAMES } from '@fonts'

interface FormModalProps {
  visible: boolean
  onSubmit: () => void
  resourceId: number
  type: string
  author?: number
  // resourceTitle: string
}
const FormModal: React.FC<FormModalProps> = ({ visible, onSubmit, resourceId, type, author }) => {
  const [comment, setComment] = useState<string>('');
  const handleSubmit = async () => {
    if (comment.length === 0) return;
    const response = await storeData('comments', {
      comment,
      resourceId,
      type,
      author
    });
    if (response.data) {
      ToastAndroid.show('Report successfully submitted', 5000)
    } else {
      ToastAndroid.show('Request failed', 5000)
    }
    onSubmit()
  };

  return (
    <Modal transparent visible={visible}>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <Pressable style={styles.close} onPress={onSubmit}>
                <Icons name='close' size={25} _color={COLOR.SECONDARY_200} />
              </Pressable>
              <Text style={styles.headTextStyle}>What's happening?</Text>
              <View style={styles.inputView}>
                <TextInput
                  placeholder=''
                  numberOfLines={5}
                  multiline style={styles.input}
                  onChangeText={text => setComment(text)}
                />
              </View>
              <Button
                title='Submit a report'
                btn={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
                handlePress={handleSubmit}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar backgroundColor={COLOR.NEUTRAL_2} />
    </Modal>
  )
}

export default React.memo(FormModal)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.NEUTRAL_1
  },
  heading: {
    color: COLOR.SECONDARY_300,
    fontFamily: FONT_NAMES.Title
  },
  container: {
    backgroundColor: COLOR.WHITE,
    width: '80%',
    padding: 20,
    borderRadius: 5
  },
  buttonStyle: {
    backgroundColor: COLOR.SECONDARY_300,
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 2
  },
  buttonTextStyle: {
    color: COLOR.WHITE,
    fontFamily: FONT_NAMES.Heading,
    textAlign: 'center'
  },
  inputView: {
    padding: 5,
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_75,
    marginVertical: 20,
  },
  input: {
    fontFamily: FONT_NAMES.Title,
    textAlign: 'justify',
    textAlignVertical: 'top'
  },
  headTextStyle: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    // marginTop:20
  },
  close: {
    position: 'absolute',
    top: -5,
    right: -5
  }
})