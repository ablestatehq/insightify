import { View } from 'react-native'
import React from 'react'
import { COLOR, DIMEN } from '@src/constants/constants'

const Dot = () => {
  return <View style={{
      width: 2,
      height: 2,
      backgroundColor: COLOR.GREY_400,
      borderRadius: DIMEN.CONSTANT.LG,
      marginHorizontal: DIMEN.CONSTANT.XSM,
}} />
}

export default Dot