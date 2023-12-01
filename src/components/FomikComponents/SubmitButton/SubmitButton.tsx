import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import { COLOR } from '../../../constants/contants'

interface SubmitButtonProp{
  handleSubmit: () => void,
  btnText?:string
}
const SubmitButton:React.FC<SubmitButtonProp> = ({handleSubmit, btnText}) => {
  const { isSubmitting, } = useFormikContext<any>()
  return (
    <Pressable
      onPress={handleSubmit}
      style={{
        ...styles.button,
        opacity: isSubmitting ? 0.5 : 1

      }}
      disabled={isSubmitting}
    >

      {isSubmitting &&
        <ActivityIndicator
          size='small'
          color={COLOR.WHITE}
        />
      }
      <Text
        style={{
          color: COLOR.WHITE,
          textAlign: 'center',
          fontFamily: "ComfortaaBold"
        }}
      >
        {btnText ?? 'SEND'}
      </Text>
    </Pressable>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    alignSelf: 'center',
    backgroundColor: COLOR.B_300,
    padding: 5,
    borderRadius: 5,
    width: '95%',
    margin:10
  }
})