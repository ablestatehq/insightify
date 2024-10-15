import React from 'react'
import {StyleSheet, View} from 'react-native'

const CodeTipsSkelton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style={styles.placeholder} />
        <View style={styles.placeholder} />
      </View>
    </View>
  );
}

export default CodeTipsSkelton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    marginTop: 50,
  },
  placeholder: {
    backgroundColor: '#ccc',
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  }
});