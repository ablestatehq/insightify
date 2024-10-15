import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

const HomeSkelton = () => {
  return (
    <View style={styles.container}>
      <View>
        {/* This is the heading */}
      </View>
      <OpportunitySkelton />
      <OpportunitySkelton />
      <OpportunitySkelton />
    </View>
  )
}

export default HomeSkelton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
})