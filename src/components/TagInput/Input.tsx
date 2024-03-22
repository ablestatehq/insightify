import {TextInput} from 'react-native'
import React from 'react'

interface InputProps{
  value: string;
  placeHolder: string
  handleChange: (text: string) => void
  styles?: {inputFocused:Obj, input: Object}
}


function Input({value, handleChange, placeHolder, styles}: InputProps) {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <TextInput
      placeholder={placeHolder}
      style={isFocused ? styles?.inputFocused : styles?.input}
      onChangeText={handleChange}
      value={value}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  )
}

export default React.memo(Input);