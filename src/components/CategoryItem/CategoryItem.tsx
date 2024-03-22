import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { COLOR, FONTSIZE } from '../../constants/contants';

interface CategoryItemProps {
  name: string
  isActive: boolean
  setActive: () => void
}

function CategoryItem({
  name, isActive, setActive
}: CategoryItemProps
): JSX.Element {
  return (
    <Pressable
      style={{
        ...styles.categoryItemContainer,
        // backgroundColor:  COLOR.WHITE, //isActive ? COLOR.SECONDARY_300 : COLOR.PRIMARY_300,
        borderBottomWidth: isActive ? 4 : 0,
        borderBottomColor: isActive ? COLOR.PRIMARY_300 : ''
      }}
      onPress={setActive}
    >
      <Text
        style={{
          ...styles.text,
          fontFamily: "RalewayMedium",
          color: isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_300
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
}

export default CategoryItem

const styles = StyleSheet.create({
  categoryItemContainer: {
    // borderRadius: 5,
    padding: 5,
    paddingBottom: 7,
    paddingHorizontal: 10
  },
  text: {
    fontSize: FONTSIZE.BODY
  }
})