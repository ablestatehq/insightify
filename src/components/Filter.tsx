import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from '../constants/contants';
import { StyleSheet, View } from 'react-native'

interface FilterProps{
  handlePress?: () => void
}

const Filter:React.FC<FilterProps> = ({handlePress}) => {
  return (
    <View style={styles.filterContainer}>
      {/* <Ionicons name="color-filter-outline" size={24} color="black" /> */}
      <Ionicons name="filter-outline" size={20} color={COLOR.B_300} onPress={handlePress}/>
      {/* <Text style={styles.text}>Filter</Text> */}
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({
  filterContainer: {
    alignItems:'center'
  },
  text: {
    color: COLOR.B_300,
    fontFamily:'ComfortaaBold'
  }
})