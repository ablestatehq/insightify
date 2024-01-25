import React, { useContext } from 'react';
import DatabaseService from '../../appwrite/appwrite';
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { AppContext } from '../../helper/context/AppContext';
import { getDataId, updateStrapiData } from '../../../api/strapiJSAPI';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { retrieveLocalData, storeToLocalStorage } from '../../utils/localStorageFunctions';
import { Entypo, SimpleLineIcons, Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';

const MoreDrawerScreen = () => {
  const { isLoggedIn, setIsLoggedIn, isNotificationEnabled, setIsNotificationEnabled } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  /**
   * @name toggleSwitch
   * This function toggles the subscription of push notifications for a device.
   * when ever the user toggles the switch button for notification, update the database table for subscriptions.
   */
  const toggleSwitch = async () => {
    const tokens = await retrieveLocalData('tokens');

    if (tokens) {
      const { pushToken, isPushNotificationEnabled } = tokens;
      const id = await getDataId('notification-tokens', 'tokenID', pushToken);
      
      if (id) { // if the pushToken exists in the notifications collections
        setIsNotificationEnabled(previousState => !previousState);
        const updateStrapi = await updateStrapiData('notification-tokens', id, { subscription: isNotificationEnabled })
        if (updateStrapi) {
          console.log("strapiJS updated data.",updateStrapi);
        }
        await storeToLocalStorage('tokens', { pushToken, isPushNotificationEnabled: isNotificationEnabled });
      }
    } else {
      // The pushNotification should be saved 
      // in from the App.jsx file when the app was starting 
    }
  }

  /**
   * @name handleLoginLogout
   * This function handles the login/logout button functionality.
   */
  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      await DatabaseService.logOut();
      setIsLoggedIn(false);
    } else {
      navigation.navigate('Login', { title: '' })
    }
  }

  return (
    <View style={styles.container}>

      {/* Account  */}
      {/* <Text style={styles.textHeading}>Account</Text>
      <View style={styles.contentContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text>Edit profile</Text>
          </View>
          <Entypo name="chevron-thin-right" size={15} color={COLOR.B_300} />
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Feather name="lock" size={24} color="black" />
            <Text>Change password</Text>
          </View>
          <Entypo name="chevron-thin-right" size={15} color={COLOR.B_300} />
        </View>
      </View> */}

      {/* Notifications  */}
      <Text style={styles.textHeading}>Notification</Text>
      <View style={styles.contentContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              size={24} color={COLOR.B_300}
              name="ios-notifications-outline"
            />
            <Text style={styles.text}>Push notifications</Text>
          </View>
          <Switch
            trackColor={{ false: `${COLOR.B_100}`, true: `${COLOR.ORANGE_100}` }}
            thumbColor={isNotificationEnabled ? `${COLOR.ORANGE_300}` : `${COLOR.B_50}`}
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
            <SimpleLineIcons name="earphones" size={20} color={COLOR.B_300} />
            <Text style={styles.text}>Contact Us</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.B_300}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Contact')}
          style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Feather
              name="help-circle"
              size={24}
              color={COLOR.B_300}
            />
            <Text style={styles.text}>Help</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.B_300}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Feedback')}
          style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="feedback"
              size={24}
              color={COLOR.B_300}
            />
            <Text style={styles.text}>Your voice matters</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.B_300}
          />
        </Pressable>
      </View>

      <Text style={styles.textHeading}>Legal</Text>
      <View style={styles.contentContainer}>
        <Pressable
          onPress={() => navigation.navigate('Privacy')}
          style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="privacy-tip" size={24} color={COLOR.B_300} />
            <Text style={styles.text}>Privacy Policy</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.B_300}
          />
        </Pressable>
      </View>


      {/* Sign in or out  */}
      <View style={{
        ...styles.itemContainer,
        marginTop: 20,
        borderRadius: 10,
      }}>
        <Pressable style={styles.iconContainer}
          onPress={handleLoginLogout}
        >
          <AntDesign name={isLoggedIn ? "logout" : "login"} size={25} color={COLOR.B_300} />
          <Text
            style={{
              ...styles.text,
              fontSize: FONTSIZE.TITLE_1
            }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MoreDrawerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLOR.WHITE,
    paddingTop: 50
  },
  contentContainer: {
    borderRadius: 10,
    paddingVertical: 5,
    margin: 10,
    backgroundColor: COLOR.WHITE,
    elevation: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeading: {
    fontFamily: 'RalewayBold',
    fontSize: FONTSIZE.TITLE_1,
    opacity: 0.5,
    marginLeft: 10
  },
  text: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.TITLE_2
  }
})