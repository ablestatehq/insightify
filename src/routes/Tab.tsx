import * as React from "react"
import { Animated, TouchableOpacity } from "react-native"

interface TabProps{
  focusAnim: any
  title: string
  onPress: () => void
}
const Tab = (
  {
    focusAnim,
    title,
    onPress
  }: TabProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", "tomato"]
          })
        }}
      >
        <Animated.Text
          style={{
            color: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["#444", "#fff"]
            })
          }}
        >{title}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default Tab