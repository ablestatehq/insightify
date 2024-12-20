import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
// import { ProfileForm } from '
import Header from '@src/components/headers/Header'
import { COLOR, DIMEN } from '@src/constants'

const Index = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.navigation}
      >
        <Header title='Profile' />
      </ImageBackground>
      <View style={{ flex: 3 }}>

      </View>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    padding: DIMEN.PADDING.SM,
  },
  navigation: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    borderWidth: 0.5,
    borderColor: COLOR.SECONDARY_50,
    borderRadius: DIMEN.PADDING.ME,
    elevation: 5,
    shadowColor: COLOR.SECONDARY_100,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex: 1,
    paddingVertical: DIMEN.PADDING.ME,
  }
})