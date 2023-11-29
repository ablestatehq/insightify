import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View,Text } from 'react-native';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { DrawerActions, useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string
  iconName?: any
}


const Header = (
  {
    title,
    iconName,
  }: HeaderProps
) => {
  const navigation = useNavigation();
  
  // open drawer 
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }
  return (
    <View
      style={styles.container}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          gap:30
        }}
      >
        <Ionicons
          name="menu"
          size={30}
          color={COLOR.B_300}
          onPress={openDrawer}
        />
        <Text style={styles.text}>{title}</Text>
      </View>

    </View >
  );
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.GREY_50,
    paddingVertical:10
  },
  text: {
    color: COLOR.B_300,
    fontSize: FONTSIZE.HEADING_5,
    marginRight: 10
  }
})