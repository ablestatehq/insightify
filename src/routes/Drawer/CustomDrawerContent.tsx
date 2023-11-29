import React from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../../constants/contants'
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SolutionsView from './components/SolutionsView';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePrivacy = () => {
    navigation.navigate('Privacy')
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
      }}>
        <Pressable style={styles.privacyContainer} onPress={handlePrivacy}>
          <Text style={styles.drawerText}>Privacy Policy</Text>
          <Feather name="arrow-up-right" size={20} color="black" />
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
    justifyContent: 'space-between',
    padding: 10
  },
  drawerText: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: "ComfortaaBold"
  }
})