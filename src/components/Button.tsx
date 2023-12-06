import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { FONTSIZE } from '../constants/contants'

interface ButtonProps {
  title?: string
  handlePress?: () => void
  btn?: any
  textStyle?: any
}
const Button: React.FC<ButtonProps> = ({ title, handlePress, btn, textStyle }) => {
  return (
    <Pressable style={btn} onPress={handlePress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
})