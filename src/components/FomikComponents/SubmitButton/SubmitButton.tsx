import React from 'react'
import {useFormikContext} from 'formik'
import {COLOR} from '../../../constants/contants'
import {ActivityIndicator, Pressable, Text} from 'react-native'

interface SubmitButtonProp {
  handleSubmit: () => void,
  btnText?: string,
  button?: any
}

const SubmitButton: React.FC<SubmitButtonProp> = ({handleSubmit, btnText, button}) => {
  const {isSubmitting} = useFormikContext<any>()
  
  return (
    <Pressable
      onPress={handleSubmit}
      style={{
        ...button,
        opacity: isSubmitting ? 0.5 : 1,
        flexDirection: 'row',
        gap: 5
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