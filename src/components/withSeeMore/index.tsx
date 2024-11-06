import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLOR, DIMEN } from "@constants/constants";
import Button from "../Button";

interface WithSeeMoreProps<P> {
  Component: React.ComponentType<P>
  title?: string
  onPress?: () => void
  btn_text?: string
  btn_style?: ViewStyle
  text_style?: TextStyle
}

function Index<P extends object>(props: WithSeeMoreProps<P> & P) {
  const { Component, title, onPress, btn_text, btn_style, text_style, ...rest } = props;
  return (
    <View style={styles.container}>
      <Component {...rest as P} />
      <Button title={btn_text}
        handlePress={onPress}
        btn={{
          ...btn_style,
          marginHorizontal: DIMEN.CONSTANT.SM,
          marginBottom: DIMEN.MARGIN.XXSM,
          backgroundColor: COLOR.GREY_300
        }}
        textStyle={{ ...text_style, color: COLOR.WHITE }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMEN.MARGIN.LG,
    borderRadius: DIMEN.CONSTANT.SM,
    borderWidth: 0.5,
    borderColor: COLOR.GREY_50,
    overflow: 'hidden',
    elevation: 1,
    backgroundColor: COLOR.WHITE
  }
})
export default Index;