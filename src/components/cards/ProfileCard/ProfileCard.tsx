import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '@constants/constants';
import { FontAwesome } from '@expo/vector-icons';

interface ProfileCardProps {
  imageUrl?: string;
  text?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      {!imageUrl && <FontAwesome
        size={50}
        name="user-circle-o"
        color={COLOR.SECONDARY_100}
      />}
      {/* <View style={styles.textContainer}>
        {text && <Text style={styles.text}>{text}</Text>}
      </View> */}
      {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} resizeMethod='resize' resizeMode='cover'/>}
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
  },
  textContainer: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 100,
    padding: 5,
  },
  text: {
    color: COLOR.SECONDARY_300,
  },
  image: {
    height: 50,
    width: 50,
    borderWidth: 50,
  }
});
