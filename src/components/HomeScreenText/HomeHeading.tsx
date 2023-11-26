import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FONTSIZE, COLOR } from '../../constants/contants'


interface TextProps {
  title: string
}
const HomeHeading = (
  {
    title
  }:
    TextProps) => {

  return (
    <View
      style={styles.container}
    >
      <Text
        style={[
          styles.text,
          {
            fontFamily: "RalewayBold"
          }
        ]}
      >
      {title}
    </Text>
    </View >
  );
}

export default HomeHeading

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  text: {
    fontSize: FONTSIZE.TITLE_1,
    marginVertical: 5,
    color: COLOR.ORANGE_300,
  }
})