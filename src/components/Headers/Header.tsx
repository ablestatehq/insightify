import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../../constants/constants';
import { useNavigation } from '@react-navigation/native';
import { FONT_NAMES } from '../../assets/fonts/fonts';

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
        name="arrow-back"
        size={20}
        color="black"
        onPress={() => {
          navigation.goBack()
        }}
      />
      <Text
        style={[
          styles.text,
          {
            fontFamily: FONT_NAMES.Title
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
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: COLOR.DANGER
  },
  text: {
    fontSize: FONTSIZE.TITLE_2,
    // paddingBottom: 2.5
  }
})