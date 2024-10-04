import React from 'react';
import {Image, Pressable, Text, View, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {COLOR, DIMEN, FONTSIZE} from "../../../constants/constants";
import {AppContext} from '../../../helper/context/AppContext';
import {isProfileComplete} from '../../../helper/functions/functions';
import {FONT_NAMES} from '../../../assets/fonts/fonts';
import ProfileForm from '../../ProfileForm';
import {Dialog, JoinCommunity} from '../..';
import {clearLocalData, storeToLocalStorage} from '../../../utils/localStorageFunctions';
import {IDialogBox} from '../../../utils/types';

const LOGOUT_MESSAGE = "Are you sure you want to log out?";

interface ProfileSectionProps {
  navigation: any;
}

const ProfileSection = ({ navigation }: ProfileSectionProps) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    user,
    setXp
  } = React.useContext(AppContext);

  const [showProfileCard, setShowProfileCard] = React.useState<boolean>(false);
  const [modal, setModal] = React.useState<boolean>(false);
  const [joinVisible, setJoinVisible] = React.useState<boolean>(false);
  const [dialog, setDialog] = React.useState<IDialogBox>({
    visible: false,
    title: '',
    message: '',
    acceptText: 'Logout',
    cancelText: 'Cancel',
    onReject() {setDialog({...dialog, visible: false})},
    onAccept() {
      handleLoginLogout();
    }
  })
  const profilePhoto = user.photo ?
    `https://insightify-admin.ablestate.cloud${user.photo.url}`:
    undefined;

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
        operations: () => navigation.navigate('Login', {title: 'Settings'}),
      };
    }
  }, [isLoggedIn, user]);

  const handleLoginLogout = async () => {
    await clearLocalData('user_token');
    await clearLocalData('isMember');
    setDialog({...dialog, visible: false})
    setXp(0);
    setUser({});
    setIsLoggedIn(false);
  };

  const handleJoinCommunity = () => {
    setUser((prev: any) => ({ ...prev, isMember: true }));
    storeToLocalStorage('isMember', { isMember: true });
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.profileContainer}>
        {!profilePhoto ? (
          <FontAwesome name="user-circle-o" size={50} color={COLOR.SECONDARY_300} />
        ) : (
          <Image source={{uri: profilePhoto}} style={styles.profileImage} />
        )}
        <View style={styles.profileTextContainer}>
          <Pressable style={styles.profilePressable} onPress={userProfile.operations}>
            <Text style={[styles.profileText, userProfile.completed === 'Complete Profile' && styles.underlineText]}>
              {userProfile.completed}
            </Text>
          </Pressable>
          {isLoggedIn && (
            <Pressable
              onPress={() =>
                setDialog((prev: IDialogBox) => ({
                  ...prev,
                  visible: true,
                  title: 'Log out',
                  message: LOGOUT_MESSAGE,
                }))}
              style={styles.logoutPressable}>
              <Text style={styles.logoutText}>Sign out</Text>
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.joinProductStyle}>
        {/* Add a product  */}
        {isLoggedIn && <Pressable
          onPress={() => { navigation.navigate('AddProduct') }}
          style={styles.communityButton}>
          <View style={styles.communityButtonText}>
            <Text style={styles.communityButtonText}>Add a product</Text>
          </View>
        </Pressable>}
        
       {isLoggedIn && <Pressable
          style={styles.communityButton}
          onPress={() => userProfile.inCommunity ?
            navigation.navigate('ChatRoom') :
            setJoinVisible(!joinVisible)}
        >
          <Text style={styles.communityButtonText}>
            {userProfile.inCommunity ?
              'Community Chat' :
              'Join our Community'}
          </Text>
        </Pressable>}

      </View>
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

      {/* <CustomModal
        title={isLoggedIn ? 'Logout' : ''}
        message={isLoggedIn ? LOGOUT_MESSAGE : ''}
        cancel={() => setModal(false)}
        accept={handleLoginLogout}
        visibility={modal}
      /> */}
      <Dialog {...dialog} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    elevation: 1,
    paddingTop: 15,
    paddingVertical: 5,
    borderRadius: 5,
    // marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: COLOR.SECONDARY_50,
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
    // backgroundColor: COLOR.SECONDARY_300,
    flex: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLOR.SECONDARY_100,
    marginHorizontal: DIMEN.PADDING.ME,
  },
  communityButtonText: {
    textAlign: 'center',
    color: COLOR.SECONDARY_300,
    padding: 2,
  },
  joinProductStyle: {
    flexDirection: 'row',
    gap: 10,
  }
});

export default ProfileSection;
