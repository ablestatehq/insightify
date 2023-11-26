import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import { COLOR, FONTSIZE } from '../../../constants/contants'

const Successful = () => {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={[
          styles.text,
          {
            fontFamily:'ComfortaaBold'
          }
        ]}
      >
        Article bookmarked
      </Text>
    </View>
  )
}

export default Successful

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR.NEUTRAL_3
  },
  text: {
    position: "absolute",
    bottom: 5,
    textAlign:"center",
    lineHeight:25,
    fontSize:FONTSIZE.TITLE_2
  }
})