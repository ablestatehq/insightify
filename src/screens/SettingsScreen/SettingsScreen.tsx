import React, {useContext,useMemo, useState} from 'react';
import {Image, Pressable, StatusBar, StyleSheet, Switch, Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Entypo, SimpleLineIcons, Ionicons, Feather, MaterialIcons, FontAwesome} from '@expo/vector-icons';

import onShare from '../../utils/onShare';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {AppContext} from '../../helper/context/AppContext';
import {getDataId, updateStrapiData} from '../../../api/strapiJSAPI';
import {CustomModal, JoinCommunity, ProfileForm} from '../../components';
import {clearLocalData, retrieveLocalData, storeToLocalStorage} from '../../utils/localStorageFunctions';

import {MaterialCommunityIcons} from '@expo/vector-icons';

const LOGOUT_MESSAGE = "Are you sure you want to log out?";

const SettingsScreen = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    isNotificationEnabled,
    setIsNotificationEnabled,
    setUser, user,
  } = useContext(AppContext);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [modal, setModal] = useState<boolean>(false);
  const [joinVisible, setJoinVisible] = useState<boolean>(false);
  const [showProfileCard, setShowProfileCard] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = React.useState<string | undefined>(user.photo ?
    `https://insightify-admin.ablestate.cloud${user?.photo?.url}` : undefined);

  const toggleSwitch = async () => {
    setIsNotificationEnabled(!isNotificationEnabled);
    const tokens = await retrieveLocalData('tokens');
    if (tokens) {
      const {pushToken, isPushNotificationEnabled} = tokens;

      const id = await getDataId('notification-tokens', 'tokenID', pushToken);

      if (id) {
        await storeToLocalStorage('tokens', { pushToken, "isPushNotificationEnabled": !isPushNotificationEnabled });
        await updateStrapiData('notification-tokens', id[0]?.id, { subscription: !isPushNotificationEnabled });
      }
    }
  }

  const userProfile = useMemo(function () {
    if (isLoggedIn)
      return {
        completed: (!user.firstName || !user.lastName) ? 'Complete Profile' : user.firstName + ' ' + user.lastName,
        inCommunity: user?.isMember,
        operations: function () {
          if (userProfile.completed == 'Complete Profile') {
            setShowProfileCard(true);
          }
        }
      }
    else
      return {
        completed: 'Sign in',
        inCommunity: false,
        operations: function () {
          navigation.navigate('Login', {title: '' });
        }

      }
  }, [isLoggedIn, user]);

  const handleLoginLogout = async () => {
    await clearLocalData('user_token');
    await clearLocalData('isMember');
    setProfilePhoto(undefined)
    setModal(false);
    setUser({});
    setIsLoggedIn(false);
  };

  const handleJoinCommunity = () => {
    setUser((prev: any) => ({ ...prev, isMember: true }));
    storeToLocalStorage('isMember', { isMember: true });
  }

  return (
    <View style={styles.container}>
      {/* Account  */}
      <View style={[styles.contentContainer,
        {
          elevation: 1,
          margin: 5,
          marginHorizontal: 10,
          backgroundColor: COLOR.SECONDARY_50
        }]}>
        <View style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {!profilePhoto && (
            <FontAwesome name="user-circle-o" size={50} color={COLOR.SECONDARY_300} />
          )}
          {profilePhoto && (
            <Image source={{uri: profilePhoto}} style={{width: 70, height: 70, borderRadius: 35}} />
          )}
          <View style={{width: '100%'}}>
            <Pressable
              style={{
                gap: 5,
                marginVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={userProfile.operations}>
              <Text
                style={{
                  textDecorationLine: (!userProfile?.completed || !isLoggedIn) ? 'underline' : 'none',
                  fontSize: FONTSIZE.TITLE_2,
                  textAlign: 'center',
                  color: COLOR.SECONDARY_300,
                }}>
                {userProfile.completed}
              </Text>
              {(userProfile.completed && isLoggedIn) &&
                <MaterialCommunityIcons name="account-edit"
                  style={{paddingHorizontal: 5}}
                  size={15}
                  color={COLOR.SECONDARY_300}
                  onPress={() => { setShowProfileCard(true) }}
                />}
            </Pressable>
            {isLoggedIn &&
              (<Pressable onPress={function () {setModal(true) }} style={{}}>
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: FONTSIZE.SMALL,
                  textAlign: 'center',
                  fontFamily: 'ComfortaaBold',
                  color: COLOR.SECONDARY_300
                }}>Logout</Text>
              </Pressable>)
            }
          </View>
        </View>
        {!user?.isMember ?
          (<Pressable
            style={({pressed}) => [
              {
                padding: 5, borderTopWidth: 1,
                borderTopColor: COLOR.SECONDARY_50,
                backgroundColor: pressed ? COLOR.SECONDARY_100 : COLOR.SECONDARY_300,
              }
            ]}
            onPress={() => setJoinVisible(!joinVisible)}>
            {({ pressed }) => <Text
              style={{
                textAlign: 'center',
                color: COLOR.WHITE,
                padding: 2,
                opacity: pressed ? 0.5 : 1
              }}>Join our Community</Text>}
          </Pressable>) :
          (<Pressable
            style={({pressed}) => [
              {
                padding: 5, borderTopWidth: 1,
                borderTopColor: COLOR.SECONDARY_50,
                backgroundColor: pressed ? COLOR.SECONDARY_100 : COLOR.SECONDARY_300,
              }
            ]}
            onPress={() => navigation.navigate('ChatRoom')}>
            {({pressed}) => <Text
              style={{
                textAlign: 'center',
                color: COLOR.WHITE,
                padding: 2,
                opacity: pressed ? 0.5 : 1
              }}>Community Chat</Text>}
          </Pressable>)
        }
      </View>
      <View style={{ marginHorizontal: 10 }}>
        {/* Notifications  */}
        <Text style={styles.textHeading}>Notification</Text>
        {/* <View > */}
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              size={15} color={COLOR.SECONDARY_300}
              name="notifications-outline"
            />
            <Text style={styles.text}>Push notifications</Text>
          </View>
          <Switch
            trackColor={{ false: `${COLOR.SECONDARY_100}`, true: `${COLOR.PRIMARY_100}` }}
            thumbColor={isNotificationEnabled ? `${COLOR.PRIMARY_300}` : `${COLOR.SECONDARY_50}`}
            onValueChange={toggleSwitch}
            value={isNotificationEnabled}
          />
        </View>
        {/* </View> */}

        {/* Support  */}
        <Text style={styles.textHeading}>Support</Text>
        <View style={styles.contentContainer}>
          <Pressable
            onPress={() => navigation.navigate('Contact')}
            style={styles.itemContainer}
          >
            <View style={styles.iconContainer}>
              <SimpleLineIcons name="earphones" size={13} color={COLOR.SECONDARY_300} />
              <Text style={styles.text}>Contact Us</Text>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_300}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Contact')}
            style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Feather
                name="help-circle"
                size={15}
                color={COLOR.SECONDARY_300}
              />
              <Text style={styles.text}>Help</Text>
            </View>
            <Entypo
              size={13}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_300}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Feedback')}
            style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="feedback"
                size={15}
                color={COLOR.SECONDARY_300}
              />
              <Text style={styles.text}>Your voice matters</Text>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_300}
            />
          </Pressable>
        </View>

        <Text style={styles.textHeading}>Legal</Text>
        <View style={styles.contentContainer}>
          <Pressable
            onPress={() => navigation.navigate('Privacy')}
            style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="privacy-tip" size={13} color={COLOR.SECONDARY_300} />
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_300}
            />
          </Pressable>
        </View>

        <Text style={styles.textHeading}>About</Text>
        {/* Share mobile application. */}
        <View style={styles.contentContainer}>
          <Pressable
            onPress={() => onShare('https://cutt.ly/insightify')}
            style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Entypo name="share" size={13} color={COLOR.SECONDARY_300} />
              <View>
                <Text style={styles.text}>Share</Text>
                <Text style={{ fontSize: FONTSIZE.SMALL, fontFamily: 'ComfortaaLight' }}>Share this app with your friends</Text>
              </View>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_300}
            />
          </Pressable>
        </View>

      </View>
      <CustomModal
        title={isLoggedIn ? 'Logout' : ''}
        message={isLoggedIn ? LOGOUT_MESSAGE : ''}
        cancel={function (): void { setModal(false) }}
        accept={handleLoginLogout}
        visibility={modal} />

      <JoinCommunity
        visible={joinVisible}
        setVisible={setJoinVisible}
        setIsInCommunity={handleJoinCommunity}
      />

      <ProfileForm
        visible={showProfileCard}
        handleClose={function () { setShowProfileCard(!showProfileCard) }}
        profilePhoto={profilePhoto}
        setProfilePhoto={setProfilePhoto}
      />
      <StatusBar backgroundColor={COLOR.WHITE} />
    </View>
  );
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    borderRadius: 5,
    paddingTop: 10,
    marginVertical: 10,
    backgroundColor: COLOR.WHITE,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 3,
  },
  iconContainer: {
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeading: {
    fontFamily: 'RalewayBold',
    fontSize: FONTSIZE.TITLE_2,
    opacity: 0.5,
    marginLeft: 10
  },
  text: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.BODY,
    color: COLOR.SECONDARY_300,
  },
  version: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    marginTop: 20
  },
  versionText: {
    opacity: 0.5,
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.BODY
  }
})