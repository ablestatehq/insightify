import React, { useContext } from 'react'
import { COLOR, FONTSIZE } from '../../constants/contants'
import { Entypo, SimpleLineIcons, Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { AppContext } from '../../helper/context/AppContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DatabaseService from '../../appwrite/appwrite';
import { APPWRITE_DATABASE_ID, APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID } from '@env';
import { Query } from 'appwrite';
import { clearLocalData, retrieveLocalData, storeToLocalStorage } from '../../utils/localStorageFunctions';

const MoreDrawerScreen = () => {
  const { isLoggedIn, setIsLoggedIn, isNotificationEnabled, setIsNotificationEnabled } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const toggleSwitch = async () => {
    const { pushToken, isPushNotificationEnabled } = await retrieveLocalData('tokens');

    setIsNotificationEnabled(previousState => !previousState);

    // Save the current state of the setting.
    const saveToken = await storeToLocalStorage('tokens', { pushToken, isPushNotificationEnabled: isNotificationEnabled });

    const { total, documents } = await DatabaseService.databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID,
      [
        Query.equal('tokenValue', pushToken)
      ]
    )

    if (total > 0) {
      const response = await DatabaseService.databases.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_NOTIFICATION_TOKEN_COLLECTION_ID,
        documents[0].$id,
        {
          subscription: isNotificationEnabled
        }
      ).then(response => {
        console.log(response);
      }).catch((error: any) => {
        console.log(error.message)
      })
    }
  }

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
            <Text style={styles.text}>Give us your feedback</Text>
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