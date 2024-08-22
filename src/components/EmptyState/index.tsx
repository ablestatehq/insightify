import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_NAMES } from '../../assets/fonts/fonts';

const Index = () => (
  <View style={styles.container}>
    <Text style={styles.noMatchText}>No opportunities found</Text>
  </View>
);

export default React.memo(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchText: {
    fontFamily: FONT_NAMES.Body,
    textAlign: 'center',
  },
});
