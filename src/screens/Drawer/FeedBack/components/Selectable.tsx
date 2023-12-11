import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../../../constants/contants'

interface SelectableProps{
  handleClick?: () => void
  label: string
  selected: boolean
}

const Selectable:React.FC<SelectableProps> = ({handleClick, label, selected}) => {
  return (
    <View
      style={{
        ...styles.container,
        borderWidth: selected ? 1 : 0,
        borderColor: COLOR.ORANGE_300,
        backgroundColor: selected ? COLOR.ORANGE_50 : COLOR.B_50,
      }}
    >
      <Pressable onPress={handleClick}>
        <Text style={{
          ...styles.text,
          color:selected ? COLOR.ORANGE_300 : COLOR.B_300
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
    paddingHorizontal:10
  },
  text: {
    fontFamily:'ComfortaaBold'
  }
})