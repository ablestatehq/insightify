import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '@constants/constants'
import { FONT_NAMES } from '@fonts'

interface SelectableProps {
  handleClick?: () => void
  label: string
  selected: boolean
}

const Selectable: React.FC<SelectableProps> = ({ handleClick, label, selected }) => {
  return (
    <View
      style={{
        ...styles.container,
        borderWidth: selected ? 1 : 0,
        borderColor: COLOR.PRIMARY_300,
        backgroundColor: selected ? COLOR.PRIMARY_50 : COLOR.SECONDARY_50,
      }}
    >
      <Pressable onPress={handleClick}>
        <Text style={{
          ...styles.text,
          color: selected ? COLOR.PRIMARY_300 : COLOR.SECONDARY_300
        }}>{label}</Text>
      </Pressable>
    </View>
  )
}

export default Selectable

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10
  },
  text: {
    fontFamily: FONT_NAMES.Heading
  }
})