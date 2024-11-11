import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR, DIMEN, FONTSIZE } from "@constants/constants";
import { FONT_NAMES } from '@fonts';
import { useProfile } from '@src/hooks';

const ProfileSection = () => {

  const {
    profilePhoto,
    userProfile,
    isLoggedIn
  } = useProfile();
  return (
    <View style={styles.profileContainer}>
      {!profilePhoto ? (
        <FontAwesome name="user-circle-o" size={80} color={COLOR.SECONDARY_300} />
      ) : (
        <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
      )}
      <Pressable onPress={userProfile.operations}>
        {isLoggedIn && <Text style={styles.profileText}>
          {userProfile.completed}
        </Text>}
        {!isLoggedIn && <Text style={styles.profileText}>Guest</Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: DIMEN.PADDING.SM,
    gap: DIMEN.CONSTANT.XXSM,
    marginTop: DIMEN.MARGIN.SM,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 35,
  },
  profileTextContainer: {
  },
  profileText: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: FONT_NAMES.Heading,
    textAlign: 'center',
    color: COLOR.SECONDARY_300,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  editIcon: {
    paddingHorizontal: 5,
  },
  logoutPressable: {
    marginBottom: DIMEN.PADDING.SM,
  },
  logoutText: {
    fontSize: FONTSIZE.SMALL,
    textAlign: 'center',
    fontFamily: FONT_NAMES.Title,
    color: COLOR.SECONDARY_300,
  },
  domainStyle: {
    textAlign: 'center',
  }
});

export default ProfileSection;