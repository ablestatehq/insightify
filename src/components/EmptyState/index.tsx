import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_NAMES } from '../../assets/fonts/fonts';
import { COLOR, FONTSIZE } from '../../constants/constants';

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
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    color: COLOR.SECONDARY_75,
    textAlign: 'center',
  },
});
