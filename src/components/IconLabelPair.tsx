import React from "react";
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icons from "../assets/icons";
import {FONTSIZE} from "../constants/contants";

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
        paddingVertical:2
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
    borderWidth: 1,
    paddingHorizontal:2
  },
  labeText: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.BODY,
    textAlignVertical: 'center',
    
  }
})