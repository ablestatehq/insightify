import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, EvilIcons } from '@expo/vector-icons';

const SignUpWith:React.FC = () => {
  return (
    <View style={styles.loginAuth2Container}>
      <View style={styles.signUpWithContainer}>
        <View style={styles.view} />
        <Text>Sign up with</Text>
        <View style={styles.view } />
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="google" size={22} color="black" />
        <EvilIcons name="sc-facebook" size={30} color="black" />
        <EvilIcons name="sc-github" size={30} color="black" />
        <EvilIcons name="sc-twitter" size={30} color="black" />
      </View>
    </View>
  )
}

export default SignUpWith

const styles = StyleSheet.create({
  loginAuth2Container: {
    marginTop:50
  },
  signUpWithContainer: {
    gap: 5,
    alignItems:'center',
    flexDirection: "row",
  },
  view: {
    borderBottomWidth: 1,
    flex:1
  },
  iconContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:15
  }
})