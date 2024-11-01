import React from "react";
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icons from "../assets/icons";
import { COLOR, DIMEN, FONTSIZE } from "../constants/constants";
import { FONT_NAMES } from "@fonts";

interface IconLabelPairProps {
  size?: number
  color?: string
  iconName: string
  iconLabel: string
  press?: () => void
}
function IconLabelPair({ iconName, iconLabel, color, press, size }: IconLabelPairProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={press}>
      <Icons name={iconName as string} size={size} _color={color} />
      <Text style={{
        ...styles.labeText,
        color: color,
      }}>{iconLabel}</Text>
    </TouchableOpacity>
  )
}

export default IconLabelPair;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMEN.PADDING.ES,
    paddingHorizontal: DIMEN.PADDING.SM,
    backgroundColor: COLOR.PRIMARY_50,
    borderRadius: DIMEN.PADDING.SM,
    paddingVertical: DIMEN.PADDING.SM,
  },
  labeText: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.SMALL,
    // textAlignVertical: 'center',
  }
})