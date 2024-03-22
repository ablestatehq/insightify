import React from 'react'
import {Text, Pressable, StyleSheet} from 'react-native'

interface ButtonProps {
  title?: string
  handlePress?: () => void
  btn?: any
  textStyle?: any
}
const Button: React.FC<ButtonProps> = ({ title, handlePress, btn, textStyle }) => {
  
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      style={({pressed}) => [
        btn,
        pressed || isPressed ? styles.pressedButton : null,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

export default React.memo(Button);

const styles = StyleSheet.create({
  pressedButton: {
    opacity:0.7
  }
})