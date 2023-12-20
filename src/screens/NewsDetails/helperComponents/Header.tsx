import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FONTSIZE } from '../../../constants/contants';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string
}
const Header = (
  {
    title = ""
  }: HeaderProps
) => {

  const navigation = useNavigation();

  return (
    <View
      style={styles.container}
    >
      <Ionicons
        name="chevron-back"
        size={24}
        color="black"
        onPress={() => {
          navigation.goBack()
        }}
      />
      <Text
        style={[
          styles.text,
          {
            fontFamily:'ComfortaaBold'
          }
        ]}
      >
        {title}
      </Text>
      <View />
    </View >
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingVertical: 10,
    paddingHorizontal:20
  },
  text: {
    fontSize: FONTSIZE.TITLE_1
  }
})