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
        <FontAwesome name="user-circle-o" size={40} color={COLOR.SECONDARY_300} />
      ) : (
        <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
      )}
      <View style={styles.profileTextContainer}>
        {isLoggedIn ?
          <Text style={styles.profileText}>
            {userProfile.completed}
          </Text> :
          <Text style={styles.profileText}>Guest</Text>}
        <Pressable onPress={userProfile.operations}>
          <Text style={styles.editText}>
            Edit Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR.NEUTRAL_1,
    gap: DIMEN.CONSTANT.SM,
    borderRadius: 100,
    alignItems: 'center',
    padding: DIMEN.PADDING.LG,
    marginTop: DIMEN.MARGIN.SM,
    marginHorizontal: DIMEN.CONSTANT.ME,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 80,
  },
  profileTextContainer: {
  },
  profileText: {
    fontSize: FONTSIZE.BODY,
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
  },
  editText: {
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Body,
    color: COLOR.PRIMARY_300,
    textDecorationLine: 'underline',
    lineHeight: 12
  }
});

export default ProfileSection;