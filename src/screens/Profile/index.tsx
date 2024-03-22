import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ProfileForm} from '../../components'
import Header from '../../components/Headers/Header'

const Index = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProfileForm
        handleClose={function () { console.log('works') } }
        visible={false} profilePhoto={undefined} setProfilePhoto={function (value: React.SetStateAction<string | undefined>): void {
          throw new Error('Function not implemented.')
        } } />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container:{flex:1}
})