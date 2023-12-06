import React from 'react'
import { COLOR } from '../constants/contants'
import { Pressable, StyleSheet, Text } from 'react-native'

interface TagCardProps {
  title?: string
  isActive: boolean
  setActive: (data: any) => void
  filteredItems: string[]
}
const TagCard: React.FC<TagCardProps> =
  ({
    title,
    setActive,
    filteredItems,
    isActive
  }) => {
  
  const handlePress = () => {
    if (isActive) {
      const newActive = filteredItems.filter((tag:string) => tag !== title)
      setActive([...newActive])
    } else {
      if (!filteredItems.includes(title as string)) {
        setActive([...filteredItems, title]);
      }
    }
  }
  return (
    <Pressable
      style={{
        backgroundColor: isActive ? COLOR.B_300 : COLOR.WHITE,
        borderWidth: 1,
        borderColor: COLOR.B_300,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius:100
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          color: isActive ? COLOR.WHITE : COLOR.B_300,
          fontFamily:'RalewayBold'
        }}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default TagCard

const styles = StyleSheet.create({

})