import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_NAMES } from '@fonts';
import { COLOR, FONTSIZE } from '@constants/constants';

const Index = ({text = 'Items found'}: {text?: string}) => (
  <View style={styles.container}>
    <Text style={styles.noMatchText}>No {text}</Text>
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
    fontSize: FONTSIZE.SMALL,
    color: COLOR.SECONDARY_75,
  },
});
