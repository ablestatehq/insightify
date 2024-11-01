import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { COLOR, DIMEN, FONTSIZE } from '@constants/constants';
import { FONT_NAMES } from '@fonts';

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
        borderBottomWidth: isActive ? 4 : 0,
        borderBottomColor: isActive ? COLOR.PRIMARY_300 : ''
      }}
      onPress={setActive}
    >
      <Text
        style={{
          ...styles.text,
          color: isActive ? COLOR.PRIMARY_300 : COLOR.SECONDARY_300
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
}

export default React.memo(CategoryItem)

const styles = StyleSheet.create({
  categoryItemContainer: {
    // borderRadius: 5,
    paddingBottom: DIMEN.PADDING.SM,
    // paddingLeft: DIMEN.PADDING.ME,
    marginRight: 20,
  },
  text: {
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Body,
  }
})