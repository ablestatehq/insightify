import {
  View,
  StatusBar,
  StyleSheet,
} from 'react-native'
import React from 'react'

// componets 
import { COLOR } from '../../constants/contants'
import NewsListContainer from '../../components/News/NewsListContainer/NewsListContainer'
import LatestNewsContainer from '../../components/News/LatestNews/LatestNewsContainer/LatestNewsContainer'

const HomeDisplay = () => {
  return (
    <View
      style={styles.container}
    >
      {/* container for latest news  */}
      <LatestNewsContainer />

      <NewsListContainer/>
      <StatusBar />
    </View>
  )
}

export default HomeDisplay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  }
})