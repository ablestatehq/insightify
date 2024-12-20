import React from 'react'
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native'
import { COLOR } from '../../constants/constants'

interface ButtonProps {
  title?: string
  handlePress?: () => void
  btn?: ViewStyle
  textStyle?: TextStyle
  isLoading?: boolean
}
const Button: React.FC<ButtonProps> = ({ title, handlePress, btn, textStyle, isLoading }) => {

  const [isPressed, setIsPressed] = React.useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        btn,
        pressed || isPressed ? styles.pressedButton : null,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {isLoading ? <ActivityIndicator
        size='small'
        color={COLOR.WHITE}
      /> : <Text style={textStyle}>{title}</Text >}
    </Pressable>
  );
}

export default React.memo(Button);

const styles = StyleSheet.create({
  pressedButton: {
    opacity: 0.7
  }
})