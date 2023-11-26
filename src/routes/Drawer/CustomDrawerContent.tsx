import React from 'react'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { COLOR, FONTSIZE } from '../../constants/contants'
import { View, Text, Image, StyleSheet } from 'react-native'

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={styles.drawerHeader}
      >
        <Image
          style={styles.headerImage}
          source={require('../../../assets/adaptive-icon.png')}
        />
        <Text style={styles.headerText}>Insightify</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap:20
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  headerText: {
    color: COLOR.B_300,
    fontSize:FONTSIZE.HEADING_5
  },
})