import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '@constants/constants';

interface ProfileCardProps {
  imageUrl?: string;
  text?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
      {imageUrl && <Image source={{ uri: imageUrl }} />}
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: COLOR.PRIMARY_400,
    // padding: DIMEN.PADDING.SMALL,
  },
  textContainer: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 100,
    padding: 5,
  },
  text: {
    color: COLOR.SECONDARY_300,
  },
});
