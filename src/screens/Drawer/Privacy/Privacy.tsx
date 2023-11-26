import { SafeAreaView, StyleSheet, } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import Header from '../../NewsDetails/helperComponents/Header';

const Privacy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Privacy Policy'/>
        <WebView
          style={styles.webViewStyle}
        source={{ uri: "https://aluminum-machine-14c.notion.site/Insightify-Privacy-Policy-e7d50f64518648618d0d5ff4d17fc6bf?pvs=4"}}
        />
    </SafeAreaView>
  )
}

export default Privacy

const styles = StyleSheet.create({
  webViewStyle: {
    flex:1
  },
  container: {
    flex:1
  }
})