import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DIMEN, FONTSIZE } from '@constants/constants';
import { FONT_NAMES } from '@fonts';

interface SeeMoreSectionProps {
  title: string;
  text?: string;
  onPress?: () => void;
}
const Index = ({ title, onPress, text}: SeeMoreSectionProps) => {
  return (
    <View style={styles.seeMoreContainer}>
      <Text style={styles.eventText}>{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.seeMoreText}>See more {text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  seeMoreText: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
  },
  seeMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: DIMEN.MARGIN.XXSM,

  },
  eventText: {
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Title
  },
});
