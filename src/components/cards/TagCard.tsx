import React from 'react'
import {COLOR, DIMEN } from '@constants/constants'
import {Pressable, StyleSheet, Text } from 'react-native'
import { FONT_NAMES } from '@fonts'

interface TagCardProps {
  title?: string
  isActive: boolean
  setActive: (data: any) => void
  filteredItems: string[]
  itemCount?: number
}
const TagCard: React.FC<TagCardProps> =
  ({
    title,
    setActive,
    filteredItems,
    isActive,
    itemCount
  }) => {

    const handlePress = () => {
      if (isActive) {
        const newActive = filteredItems.filter((tag: string) => tag !== title)
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
          backgroundColor: isActive ? COLOR.SECONDARY_300 : COLOR.WHITE,
          borderWidth: 1,
          borderColor: COLOR.SECONDARY_300,
          paddingHorizontal: 10,
          borderRadius: DIMEN.PADDING.ELG,
          paddingVertical: 5,
          flexDirection: 'row',
          gap: 2.5
        }}
        onPress={handlePress}
      >
        <Text
          style={{
            color: isActive ? COLOR.WHITE : COLOR.SECONDARY_300,
            fontFamily: FONT_NAMES.Title
          }}
        >
          {title}
        </Text>
        {<Text
          style={{
            color: isActive ? COLOR.WHITE : COLOR.SECONDARY_300,
            fontFamily: FONT_NAMES.Title
          }}
        >{`(${itemCount})`}</Text>}
      </Pressable>
    )
  }

export default TagCard