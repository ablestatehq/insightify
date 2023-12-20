import React from 'react'
import { COLOR } from '../constants/contants';
import { StyleSheet, View } from 'react-native'

interface FilterProps{
  handlePress?: () => void
}

const Filter:React.FC<FilterProps> = ({handlePress}) => {
  return (
    <View style={styles.filterContainer}>
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({
  filterContainer: {
    // borderWidth: 1,
    // paddingVertical: 5,
    // paddingHorizontal:10 
  },
  text: {
    color: COLOR.B_300,
    fontFamily:'ComfortaaBold'
  }
})