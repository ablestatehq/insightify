import React, {useContext, useMemo, useState} from 'react';
import {Image, Pressable, StatusBar, StyleSheet, Switch, Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Entypo, SimpleLineIcons, Ionicons, Feather, MaterialIcons} from '@expo/vector-icons';

import onShare from '../../utils/onShare';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {AppContext} from '../../helper/context/AppContext';
import {getDataId, updateStrapiData, uploadImage} from '../../../api/strapiJSAPI';
import {CustomModal, JoinCommunity, ProfileForm} from '../../components';
import {clearLocalData, retrieveLocalData, storeToLocalStorage} from '../../utils/localStorageFunctions';

import {MaterialCommunityIcons} from '@expo/vector-icons';

const LOGOUT_MESSAGE = "Are you sure you want to log out?"
const MoreDrawerScreen = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    isNotificationEnabled,
    setIsNotificationEnabled,
    setUser, user, isInCommunity,
    setIsInCommunity,
  } = useContext(AppContext);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [modal, setModal] = useState<boolean>(false);
  const [joinVisible, setJoinVisible] = useState<boolean>(false);
  const [showProfileCard, setShowProfileCard] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = React.useState<string | undefined>(user?.photo);

  /**
   * @name toggleSwitch
   * This function toggles the subscription of push notifications for a device.
   * when ever the user toggles the switch button for notification, update the database table for subscriptions.
   */
  const toggleSwitch = async () => {
    setIsNotificationEnabled(!isNotificationEnabled);
    const tokens = await retrieveLocalData('tokens');
    if (tokens) {
      const {pushToken, isPushNotificationEnabled} = tokens;

      const id = await getDataId('notification-tokens', 'tokenID', pushToken);

      if (id) {
        await storeToLocalStorage('tokens', {pushToken, "isPushNotificationEnabled": !isPushNotificationEnabled});
        await updateStrapiData('notification-tokens', id[0]?.id, {subscription: !isPushNotificationEnabled});
      }
    }
  }

  /**
   * @name handleLoginLogout
   * This function handles the login/logout button functionality.
   */

  const userProfile = useMemo(function () {
    if (isLoggedIn)
      return {
        completed: (!user.firstName || !user.lastName) ? 'Complete Profile' : user.firstName + ' ' + user.lastName,
        inCommunity: isInCommunity,
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
          navigation.navigate('Login', {title: ''});
        }
      
      }
  }, [isLoggedIn, user, isInCommunity]);

  const handleLoginLogout = async () => {
    await clearLocalData('user_token');
    setProfilePhoto(undefined)
    setModal(false);
    setUser({});
    setIsLoggedIn(false);
  };
  
  return (
    <View style={styles.container}>
      {/* Account  */}
      <View style={[styles.contentContainer, {elevation:1, margin:5, marginHorizontal:10}]}>
        <View style={{
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* {!profilePhoto && (
            <FontAwesome name="user-circle-o" size={50} color={COLOR.SECONDARY_300} />
          )}
          {profilePhoto && (
            <Image source={{ uri: profilePhoto }} style={{ width: 70, height: 70, borderRadius: 35 }} />
          )} */}
          <View>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 5,
                gap:5
              }}
              onPress={userProfile.operations}>
              <Text style={{
                textDecorationLine: (!userProfile?.completed || !isLoggedIn) ? 'underline' : 'none',
                fontSize: FONTSIZE.TITLE_2, textAlign: 'center',
                color:COLOR.SECONDARY_300,
              }}>
                {userProfile.completed}
              </Text>
              {(userProfile.completed && isLoggedIn) && <MaterialCommunityIcons name="account-edit" size={15} color={COLOR.SECONDARY_300} onPress={()=>{setShowProfileCard(true)}}/>}
            </Pressable>
            {isLoggedIn &&
              (<Pressable onPress={function () {setModal(true) }} style={{}}>
                <Text style={{marginBottom: 10, fontSize: FONTSIZE.SMALL, textAlign: 'center', fontFamily:'ComfortaaBold', color:COLOR.SECONDARY_300}}>Logout</Text>
              </Pressable>)
            }
          </View>
        </View>
        {!isInCommunity ?
          (<Pressable style={{ padding: 5, borderTopWidth: 1, borderTopColor: COLOR.SECONDARY_50 }} onPress={() => setJoinVisible(!joinVisible)}>
            <Text style={{ textAlign: 'center', color: COLOR.SECONDARY_300 }}>Join our Community</Text>
          </Pressable>):
          (<View>
            {/* <Text style={{textAlign:'center'}}>Ablestate community member</Text> */}
          </View>)
        }
      </View>
      {/* Verson number */}
      <View style={{ marginHorizontal:10, marginBottom:10}}>
        <Text style={{ fontSize: FONTSIZE.SMALL, fontFamily: 'ComfortaaLight', opacity: 0.5, textAlign: 'center' }}>Version 0.0.9.1 Beta</Text>
      </View>
      <View style={{marginHorizontal:10}}>
        {/* Notifications  */}
        <Text style={styles.textHeading}>Notification</Text>
        <View >
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                size={15} color={COLOR.SECONDARY_300}
                name="ios-notifications-outline"
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
        </View>

        {/* Support  */}
        <Text style={styles.textHeading}>Support</Text>
        <View style={styles.contentContainer}>
          <Pressable
            onPress={() => navigation.navigate('Contact')}
            style={styles.itemContainer}
          >
            <View style={styles.iconContainer}>
              <SimpleLineIcons name="earphones" size={15} color={COLOR.SECONDARY_300} />
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
              size={15}
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
              <MaterialIcons name="privacy-tip" size={15} color={COLOR.SECONDARY_300} />
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
              <Entypo name="share" size={15} color={COLOR.SECONDARY_300} />
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
        cancel={function (): void {setModal(false)}}
        accept={handleLoginLogout}
        visibility={modal} />
      
      <JoinCommunity
        visible={joinVisible}
        setVisible={setJoinVisible}
        setIsInCommunity={setIsInCommunity}
      />

      <ProfileForm
        visible={showProfileCard}
        handleClose={function () {setShowProfileCard(!showProfileCard)}}
        profilePhoto={profilePhoto}
        setProfilePhoto={setProfilePhoto}
      />
      <StatusBar backgroundColor={COLOR.WHITE}/>
    </View>
  );
}

export default MoreDrawerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    margin: 10,
    backgroundColor: COLOR.WHITE,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    alignSelf:'center',
    marginTop: 20
  },
  versionText: {
    opacity: 0.5,
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.BODY
  }
})