import React from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLOR, DIMEN, FONTSIZE } from "@constants/constants";
import { FONT_NAMES } from '@fonts';
import ProfileForm from '@components/ProfileForm';
import { Dialog, JoinCommunity } from '@components/index';
import {useProfile} from '@src/hooks';

const ProfileSection = () => {

  const {
    profilePhoto,
    userProfile,
    isLoggedIn,
    // navigation,
    setJoinVisible,
    joinVisible,
    showProfileCard,
    setShowProfileCard,
    handleJoinCommunity,
    dialog,
    handleSignoutPress
  } = useProfile();
  return (
    <View style={styles.contentContainer}>
      <View style={styles.profileContainer}>
        {!profilePhoto ? (
          <FontAwesome name="user-circle-o" size={50} color={COLOR.SECONDARY_300} />
        ) : (
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        )}
        <Pressable onPress={userProfile.operations}>
          <Text style={[styles.profileText, userProfile.completed === 'Complete Profile' && styles.underlineText]}>
            {userProfile.completed}
          </Text>
        </Pressable>
        {isLoggedIn && (
          <Pressable
            onPress={handleSignoutPress}
            style={styles.logoutPressable}>
            <Text style={styles.logoutText}>Sign out</Text>
          </Pressable>
        )}
      </View>
      <ProfileForm
        visible={showProfileCard}
        handleClose={() => setShowProfileCard(!showProfileCard)}
        profilePhoto={profilePhoto}
        setProfilePhoto={() => { }}
      />
      <Dialog {...dialog} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    elevation: 1,
    borderRadius: 5,
    backgroundColor: COLOR.SECONDARY_50,
  },
  profileContainer: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: DIMEN.PADDING.SM,
    gap: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileTextContainer: {
    // width: '100%',
    // borderWidth: 1,
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
  }
});

export default ProfileSection;