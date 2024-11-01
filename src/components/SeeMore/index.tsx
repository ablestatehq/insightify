import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FONTSIZE } from '@constants/constants';
import { FONT_NAMES } from '@fonts';

interface SeeMoreSectionProps {
  title: string;
  onPress?: () => void;
}
const Index = ({ title, onPress }: SeeMoreSectionProps) => {
  return (
    <View style={styles.seeMoreContainer}>
      <Text style={styles.eventText}>{title}</Text>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.seeMoreText}>see more</Text>
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
    textTransform: 'uppercase',
  },
  seeMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 5,
    // borderWidth: 1,
    // borderColor: COLOR.DANGER,
  },
  eventText: {
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Title
  },
});
