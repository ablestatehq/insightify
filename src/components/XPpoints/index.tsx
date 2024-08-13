import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesome6} from '@expo/vector-icons';
import {COLOR} from '../../constants/constants';
import {FONT_NAMES} from '../../assets/fonts/fonts';

interface XPpointProps {
  number: number
}
const Index = ({number}: XPpointProps) => {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="bolt" size={12} color={COLOR.GOLD} />
      <Text style={styles.points}>{number} XP</Text>
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    padding: 5,
    // backgroundColor: COLOR.P_TRANSPARENT_10,
  },
  points: {
    fontFamily: FONT_NAMES.Title,
    color: COLOR.SILVER,
  }
})