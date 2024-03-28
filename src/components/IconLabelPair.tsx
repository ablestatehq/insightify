import React from "react";
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icons from "../assets/icons";
import {COLOR, FONTSIZE} from "../constants/contants";

interface IconLabelPairProps{
  size?: number
  color?: string
  iconName: string
  iconLabel: string
  onPress?: () => void
}
function IconLabelPair({iconName, iconLabel, color, onPress, size}:IconLabelPairProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icons name={iconName as string} size={size} _color={color}/>
      <Text style={{
        ...styles.labeText,
        color: color,
      }}>{iconLabel}</Text>
    </Pressable>
  )
}

export default IconLabelPair;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 5,
    backgroundColor: COLOR.SECONDARY_50,
    borderRadius: 5,
    paddingVertical:5
  },
  labeText: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.BODY,
    textAlignVertical: 'center',
    
  }
})