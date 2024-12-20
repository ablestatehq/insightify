import React from 'react';
import {Pressable, StatusBar, StyleSheet, Switch, Text, View} from 'react-native';
import {Entypo, Feather, Ionicons} from '@expo/vector-icons';

import useProfile from '@src/screens/profile/hooks/useProfile'
import onShare from '@utils/onShare';
import {COLOR, DIMEN, FONTSIZE} from '@constants/constants';

import { FONT_NAMES } from '@fonts';

// components 
import { Dialog, JoinCommunity } from '@src/components';
import ProfileForm from '../profile/components/ProfileForm'
import ProfileSection from './components/ProfileSection';


const SettingsScreen = () => {

  const { isNotificationEnabled, toggleSwitch,
    navigation, setJoinVisible, isLoggedIn,
    userProfile, joinVisible, dialog,
    showProfileCard, setShowProfileCard, profilePhoto,
    handleSignoutPress, handleChatPress } = useProfile();

  return (
    <View style={styles.container}>
        <Text style={styles.screen_title}>Settings</Text>
      {/* User profile section  */}
      <ProfileSection />

      <View style={styles.main}>
        {/**Account */}
        {isLoggedIn &&
          <Pressable
            style={styles.settingCard}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
          <View style={styles.setting_view_left}>
            <Ionicons
              name="person-outline"
              size={13}
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.settingText}>Account</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
          />
        </Pressable>}
        {/**Chat */}
        <View style={styles.settingCard}>
          <View style={styles.setting_view_left}>
            <Ionicons
              name="chatbubbles-outline"
              size={13}
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.settingText}>
              {`${isLoggedIn && userProfile.inCommunity ?
                'Community chat' :
                'Join community'}`}
            </Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={handleChatPress}
          />
        </View>
        {/**Create a learning path */}
        <View style={styles.settingCard}>
          <View style={styles.setting_view_left}>
            <Ionicons
              name="chatbubbles-outline"
              size={13}
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.settingText}>
              Learning path
            </Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={() => navigation.navigate('LearningPath')}
          />
        </View>
        {/**Support */}
        <View style={styles.settingCard}>
          <View style={styles.setting_view_left}>
            <Ionicons
              name="headset"
              size={13}
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.settingText}>Support</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={() => navigation.navigate('Support')}
          />
        </View>
        {/**Privacy */}
        <View style={styles.settingCard}>
          <View style={styles.setting_view_left}>
            <Ionicons
              name="shield-checkmark-outline"
              size={13}
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.settingText}>Privacy</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={() => navigation.navigate('Privacy')}
          />
        </View>
        {/**Share */}
        <View style={styles.settingCard}>
          <View style={styles.setting_view_left}>
            <Entypo name="share" size={13} color={COLOR.SECONDARY_100} />
            <Text style={styles.settingText}>Share</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={() => onShare('https://cutt.ly/insightify')}
          />
        </View>
        {/**Notification */}
        <View style={styles.settingCard}>
          <View style={styles.setting_view_left}>
            <Ionicons
              size={15}
              color={COLOR.SECONDARY_100}
              name="notifications-outline"
            />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: `${COLOR.SECONDARY_100}`, true: `${COLOR.PRIMARY_100}` }}
            thumbColor={isNotificationEnabled ? `${COLOR.PRIMARY_300}` : `${COLOR.SECONDARY_50}`}
            onValueChange={toggleSwitch}
            value={isNotificationEnabled}
            style={styles.switch}
          />
        </View>
        {/**Log out */}
        <Pressable
          style={styles.settingCard}
          onPress={() => {
            if (isLoggedIn) {
              handleSignoutPress()
            } else {
              navigation.navigate('Login', {});
            }
          }}
        >
          <View style={styles.setting_view_left}>
            {!isLoggedIn && <Feather
              size={15}
              color={COLOR.SECONDARY_100}
              name="log-out"
            />}
            {isLoggedIn && <Feather
              size={15}
              color={COLOR.SECONDARY_100}
              name="log-in"
            />}
            <Text style={styles.settingText}>{isLoggedIn ? 'Log out' : 'Login'}</Text>
          </View>
        </Pressable>
      </View>
      <JoinCommunity
        visible={joinVisible}
        setVisible={setJoinVisible}
        setIsInCommunity={() => navigation.navigate('AddProduct')}
      />
      <Dialog {...dialog} />
      <ProfileForm
        visible={showProfileCard}
        handleClose={() => setShowProfileCard(!showProfileCard)}
        profilePhoto={profilePhoto}
        setProfilePhoto={() => { }}
      />
      <StatusBar backgroundColor={COLOR.WHITE} />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DIMEN.PADDING.ME,
    backgroundColor: COLOR.WHITE,
  },
  screen_title: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    textAlign: 'center'
  },
  main: { marginHorizontal: 10, marginVertical: 10 },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: DIMEN.CONSTANT.SM,
    padding: DIMEN.PADDING.LG,
    backgroundColor: COLOR.WHITE,
    elevation: 1,
    marginVertical: DIMEN.MARGIN.SM
  },
  setting_view_left: {
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.SM,
    alignItems: 'center',
  },
  settingText: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
  },
  switch: {
    height: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});