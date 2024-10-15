import React from 'react'
import { Feather } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from "../constants/constants"
import { Pressable, StyleSheet, Text } from 'react-native'
import { FONT_NAMES } from '../assets/fonts/fonts';

interface FloatingButtonProps {
  title?: string
  borderRadius?: number
  bgColor?: string
  textColor?: string
  press?: () => void
  buttonPosition: {
    bottom?: number
    right?: number
    left?: number
    top?: number
    marginRight?: number
  }
}

const FloatingButton: React.FC<FloatingButtonProps> =
  ({
    title,
    borderRadius,
    bgColor,
    textColor,
    press,
    buttonPosition
  }) => {

    return (
      <Pressable
        style={{
          ...styles.container,
          ...buttonPosition,
          padding: title ? 5 : 10,
          paddingHorizontal: title ? 15 : 10,
          borderRadius: borderRadius ? borderRadius : 100,
          backgroundColor: bgColor ? bgColor : COLOR.PRIMARY_300,
        }}
        onPress={press}
      >
        {title && <Text
          style={{
            ...styles.text,
            color: textColor ? textColor : COLOR.WHITE
          }}
        >{title}</Text>}
        {!title && <Feather name="plus" size={24} color={COLOR.WHITE} />}
      </Pressable>
    )
  }

export default FloatingButton

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: "flex-start",
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLOR.PRIMARY_300
  },
  text: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_2,
    textAlign: 'center',
    marginBottom: 5,
  }
})