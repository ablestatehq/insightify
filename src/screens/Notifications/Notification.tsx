import React from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../NewsDetails/helperComponents/Header'
import { COLOR } from '../../constants/contants'

const Notification = () => {
  return (
    <View style={styles.container}>
      <Header title='Notifications'/>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR.WHITE
  },
  
})