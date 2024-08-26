import React from 'react';
import {Image, Pressable, Text, View, StyleSheet} from 'react-native';
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {COLOR, FONTSIZE} from "../../../constants/constants";
import {AppContext} from '../../../helper/context/AppContext';
import {isProfileComplete} from '../../../helper/functions/functions';
import {FONT_NAMES} from '../../../assets/fonts/fonts';
import ProfileForm from '../../ProfileForm';
import {CustomModal, JoinCommunity} from '../..';
import {clearLocalData, storeToLocalStorage} from '../../../utils/localStorageFunctions';

const LOGOUT_MESSAGE = "Are you sure you want to log out?";

interface ProfileSectionProps {
  navigation: any;
}

const ProfileSection = ({navigation}: ProfileSectionProps) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    user,
  } = React.useContext(AppContext);

  const [showProfileCard, setShowProfileCard] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [joinVisible, setJoinVisible] = React.useState<boolean>(false);

  const profilePhoto = user.photo ? `https://insightify-admin.ablestate.cloud${user.photo.url}` : undefined;

  const userProfile = React.useMemo(() => {
    if (isLoggedIn) {
      return {
        completed: isProfileComplete(user) ? `${user.firstName} ${user.lastName}` : 'Complete Profile',
        inCommunity: user?.isMember,
        operations: () => {
          if (!isProfileComplete(user)) {
            setShowProfileCard(true);
          }
        },
      };
    } else {
      return {
        completed: 'Sign in',
        inCommunity: false,
        operations: () => navigation.navigate('Login', { title: '' }),
      };
    }
  }, [isLoggedIn, user]);

  const handleLoginLogout = async () => {
    await clearLocalData('user_token');
    await clearLocalData('isMember');
    setModal(false);
    setUser({});
    setIsLoggedIn(false);
  };

  const handleJoinCommunity = () => {
    setUser((prev: any) => ({...prev, isMember: true}));
    storeToLocalStorage('isMember', {isMember: true});
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.profileContainer}>
        {!profilePhoto ? (
          <FontAwesome name="user-circle-o" size={50} color={COLOR.SECONDARY_300} />
        ) : (
          <Image source={{uri: profilePhoto }} style={styles.profileImage} />
        )}
        <View style={styles.profileTextContainer}>
          <Pressable style={styles.profilePressable} onPress={userProfile.operations}>
            <Text style={[styles.profileText, userProfile.completed === 'Complete Profile' && styles.underlineText]}>
              {userProfile.completed}
            </Text>
            {isLoggedIn && (
              <MaterialCommunityIcons
                name="account-edit"
                size={15}
                color={COLOR.SECONDARY_300}
                style={styles.editIcon}
                onPress={() => setShowProfileCard(true)}
              />
            )}
          </Pressable>
          {isLoggedIn && (
            <Pressable onPress={() => setModal(true)} style={styles.logoutPressable}>
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          )}
        </View>
      </View>

      {userProfile.inCommunity ? (
        <Pressable style={styles.communityButton} onPress={() => navigation.navigate('ChatRoom')}>
          <Text style={styles.communityButtonText}>Community Chat</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.joinButton} onPress={() => setJoinVisible(!joinVisible)}>
          <Text style={styles.joinButtonText}>Join our Community</Text>
        </Pressable>
      )}

      <ProfileForm
        visible={showProfileCard}
        handleClose={() => setShowProfileCard(!showProfileCard)}
        profilePhoto={profilePhoto}
        setProfilePhoto={() => { }}
      />

      <JoinCommunity
        visible={joinVisible}
        setVisible={setJoinVisible}
        setIsInCommunity={handleJoinCommunity}
      />

      <CustomModal
        title={isLoggedIn ? 'Logout' : ''}
        message={isLoggedIn ? LOGOUT_MESSAGE : ''}
        cancel={() => setModal(false)}
        accept={handleLoginLogout}
        visibility={modal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 5,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: COLOR.SECONDARY_50,
    elevation: 1,
  },
  profileContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileTextContainer: {
    width: '100%',
  },
  profilePressable: {
    gap: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: FONTSIZE.TITLE_2,
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
    marginBottom: 10,
  },
  logoutText: {
    fontSize: FONTSIZE.SMALL,
    textAlign: 'center',
    fontFamily: FONT_NAMES.Heading,
    color: COLOR.SECONDARY_300,
  },
  communityButton: {
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: COLOR.SECONDARY_50,
    backgroundColor: COLOR.SECONDARY_300,
  },
  communityButtonText: {
    textAlign: 'center',
    color: COLOR.WHITE,
    padding: 2,
  },
  joinButton: {
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: COLOR.SECONDARY_50,
    backgroundColor: COLOR.SECONDARY_300,
  },
  joinButtonText: {
    textAlign: 'center',
    color: COLOR.WHITE,
    padding: 2,
  },
});

export default ProfileSection;
