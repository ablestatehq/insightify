import React, {useContext} from 'react';
import {Pressable, StatusBar, StyleSheet, Switch, Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons';

import onShare from '../../utils/onShare';
import {COLOR, FONTSIZE} from '../../constants/constants';
import {AppContext} from '../../helper/context/AppContext';
import {getDataId, updateStrapiData} from '../../../api/strapiJSAPI';
import {retrieveLocalData, storeToLocalStorage} from '../../utils/localStorageFunctions';

import {FontAwesome5} from '@expo/vector-icons';
import {RootStackParamList} from '../../utils/types';
import {FONT_NAMES} from '../../assets/fonts/fonts';
import ProfileSection from '../../components/Cards/ProfileSection';


const SettingsScreen = () => {
  const {
    isNotificationEnabled,
    setIsNotificationEnabled,
    isLoggedIn,
  } = useContext(AppContext);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  return (
    <View style={styles.container}>
      {/* Account  */}
      <ProfileSection navigation={navigation} />

      <View style={styles.main}>
        {/* Notifications  */}
        <Text style={styles.textHeading}>Notification</Text>
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              size={15} color={COLOR.SECONDARY_100}
              name="notifications"
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

        {/* Support  */}
        <Text style={styles.textHeading}>Support</Text>
        <View style={styles.contentContainer}>
          <Pressable
            onPress={() => navigation.navigate('Talent')}
            style={styles.itemContainer}
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name="hire-a-helper" size={15} color={COLOR.SECONDARY_100} />
              <Text style={styles.text}>Hire</Text>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_100}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Contact')}
            style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="help-circle" size={18} color={COLOR.SECONDARY_100} />
              <Text style={styles.text}>Help</Text>
            </View>
            <Entypo
              size={13}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_100}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Contact')}
            style={styles.itemContainer}
          >
            <View style={styles.iconContainer}>
              <MaterialIcons name="headphones" size={16} color={COLOR.SECONDARY_100} />
              <Text style={styles.text}>Contact Us</Text>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_100}
            />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Feedback')}
            style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="feedback"
                size={15}
                color={COLOR.SECONDARY_100}
              />
              <Text style={styles.text}>Your voice matters</Text>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_100}
            />
          </Pressable>
        </View>

        <Text style={styles.textHeading}>Legal</Text>
        <View style={styles.contentContainer}>
          <Pressable
            onPress={() => navigation.navigate('Privacy')}
            style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="privacy-tip" size={13} color={COLOR.SECONDARY_100} />
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_100}
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
              <Entypo name="share" size={13} color={COLOR.SECONDARY_100} />
              <View>
                <Text style={styles.text}>Share</Text>
                {/* <Text style={{ fontSize: FONTSIZE.SMALL, fontFamily: FONT_NAMES.Heading }}>
                  Share this app with your friends
                </Text> */}
              </View>
            </View>
            <Entypo
              size={15}
              name="chevron-thin-right"
              color={COLOR.SECONDARY_100}
            />
          </Pressable>
        </View>
      </View>
      <StatusBar backgroundColor={COLOR.WHITE} />
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  main: { marginHorizontal: 10, marginVertical: 10 },
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
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeading: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_2,
    // opacity: 0.5,
    color: COLOR.SECONDARY_100,
    marginLeft: 10
  },
  text: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.BODY,
    // opacity: 0.5
    color: COLOR.SECONDARY_100
  },
  version: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    marginTop: 20
  },
  versionText: {
    opacity: 0.5,
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.BODY
  },
  showCaseProduct: {
    justifyContent: 'center',
    // alignItems: 'center'
  }
})