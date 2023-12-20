import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../components/Headers/Header/Header'

const Bookmarks = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <Text>Bookmarks</Text>
      </View>
    </View>
  )
}

export default Bookmarks

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20
  },
  container: {
    flex:1
  }
})