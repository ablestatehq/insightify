import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { COLOR, FONTSIZE } from '@@constants/constants'

interface CategoryItemProps {
  name: string
  isActive: boolean
  setActive: () => void
}

const CategoryItem = (
  {
    name,
    isActive,
    setActive
  }: CategoryItemProps
) => {
  return (
    <Pressable
      style={{
        ...styles.categoryItemContainer,
        backgroundColor: isActive ? COLOR.SECONDARY_300 : COLOR.WHITE
      }}
      onPress={setActive}
    >
      <Text
        style={{
          ...styles.text,
          color: isActive ? COLOR.WHITE : COLOR.SECONDARY_300
        }}
      >
        {name}
      </Text>
    </Pressable >
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  categoryItemContainer: {
    borderRadius: 20,
    padding: 5,
    // alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_300,
    marginHorizontal: 5
  },
  text: {
    fontSize: FONTSIZE.SMALL
  }
})