import React, { useContext } from 'react'
import { COLOR, FONTSIZE } from "../constants/contants"
import { Pressable, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppContext } from '../helper/context/AppContext'

interface FloatingButtonProps {
  title?: string
}
const FloatingButton: React.FC<FloatingButtonProps> = ({ title }) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { isLoggedIn } = useContext(AppContext);
  return (
    <Pressable
      style={styles.container}
      onPress={function () {
        if (isLoggedIn) {
          navigation.navigate('Share');
        } else {
          navigation.navigate('Login');
        }
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default FloatingButton

const styles = StyleSheet.create({
  container: {
    right: 20,
    bottom: 20,
    padding: 10,
    elevation: 3,
    borderRadius: 20,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: "flex-start",
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
    // backgroundColor:COLOR.ORANGE_200
  },
  text: {
    fontFamily: 'RalewayBold',
    fontSize: FONTSIZE.TITLE_2,
    // color:COLOR.WHITE
  }
})