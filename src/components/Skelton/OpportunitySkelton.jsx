import React from 'react'
import {StyleSheet, View} from 'react-native'

const OpportunitySkelton = () => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', gap:10, marginBottom:10}}>
        <View style={{height:50, width:50, backgroundColor:'#ccc',}} />
        <View style={{flex:1, gap:5, paddingTop:5}}>
          <View style={{height:5, backgroundColor:'#ccc',}} />
          <View style={{height:5, backgroundColor:'#ccc', width:'70%'}} />
          <View style={{height:5, backgroundColor:'#ccc', width:'40%'}} />
        </View>
      </View>
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
      <View style={styles.placeholder} />
    </View>
  );
}

export default OpportunitySkelton;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 50,
    marginBottom: 16,
    borderRadius: 13,
    backgroundColor: '#F6F6F6',
  },
  placeholder: {
    height: 7,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#ccc',
  },
});