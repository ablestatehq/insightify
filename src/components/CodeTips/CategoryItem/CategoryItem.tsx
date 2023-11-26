import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { COLOR, FONTSIZE } from '../../../constants/contants'

interface CategoryItemProps {
  name: string
  isActive: boolean
  setActive: () => void
}

const CategoryItem: React.FC<CategoryItemProps> = (
  {
    name,
    isActive,
    setActive
  }
) => {
  return (
    <Pressable
      style={{
        ...styles.categoryItemContainer,
        backgroundColor: isActive ? COLOR.B_300 : COLOR.WHITE
      }}
      onPress={setActive}
    >
      <Text
        style={{
          ...styles.text,
          fontFamily: "RalewayMedium",
          color: isActive ? COLOR.WHITE : COLOR.B_300
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
    borderWidth: 1,
    borderColor: COLOR.B_300,
    marginHorizontal: 5
  },
  text: {
    fontSize: FONTSIZE.SMALL
  }
})