import React from "react";
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icons from "../assets/icons";
import {COLOR, FONTSIZE} from "../constants/contants";

interface IconLabelPairProps{
  size?: number
  color?: string
  iconName: string
  iconLabel: string
  press?: () => void
}
function IconLabelPair({iconName, iconLabel, color, press, size}:IconLabelPairProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={press}>
      <Icons name={iconName as string} size={size} _color={color}/>
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
    gap: 2,
    paddingHorizontal: 5,
    backgroundColor: COLOR.PRIMARY_50,
    borderRadius: 5,
    paddingVertical:5
  },
  labeText: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.SMALL,
    textAlignVertical: 'center',
  }
})