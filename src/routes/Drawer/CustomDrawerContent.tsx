import React, { useContext } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import DatabaseService from '../../appwrite/appwrite';
import SolutionsView from './components/SolutionsView';
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { AppContext } from '../../helper/context/AppContext';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const handleLoginLogout = async () => {
    if (isLoggedIn) {
      await DatabaseService.logOut();
      setIsLoggedIn(false);
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <View style={styles.drawerContainer}>
      <View
        style={styles.drawerHeader}
      >
        <Image
          style={styles.headerImage}
          source={require('../../../assets/adaptive-icon.png')}
        />
        <Text style={styles.headerText}>Insightify</Text>
      </View>
      <DrawerContentScrollView {...props} style={{
        backgroundColor: COLOR.WHITE, borderTopLeftRadius: 5,
        borderTopRightRadius: 5
      }}>
        <DrawerItemList {...props} />
        <SolutionsView />
      </DrawerContentScrollView>
      <View style={{
        backgroundColor: COLOR.WHITE, padding: 5, borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
      }}
      >
        <Pressable style={styles.privacyContainer} onPress={handleLoginLogout}>
          {!isLoggedIn && <SimpleLineIcons name="login" size={24} color="black" />}
          {isLoggedIn && <SimpleLineIcons name="logout" size={24} color="black" />}
          <Text style={styles.drawerText}>{isLoggedIn ? 'Log out' : 'Login'}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: COLOR.NEUTRAL_2
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
    backgroundColor: COLOR.WHITE,
    borderRadius: 5
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  headerText: {
    color: COLOR.B_300,
    fontSize: FONTSIZE.HEADING_5
  },
  privacyContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 20,
    alignItems: 'center',
    
  },
  drawerText: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: "ComfortaaBold"
  }
})