import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { DrawerActions, useNavigation } from '@react-navigation/native';


interface HeaderProps {
  title?: string
}

const Header = (
  {
    title,
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
          gap: 30,
          // justifyContent:'space-between'
        }}
      >
        <Ionicons
          name="menu"
          size={30}
          color={COLOR.B_300}
          onPress={openDrawer}
        />
        {title && <Text style={styles.text}>{title}</Text>}
        {/* <View style={styles.headerIcons}>
          <View>
            <View
              style={{
                width: 6,
                right: 0,
                height: 6,
                borderRadius: 6,
                position: 'absolute',
                backgroundColor: COLOR.DANGER,
              }}
            />
            <Ionicons name="md-notifications-outline" size={25} color={COLOR.B_300} />
          </View>
          <Ionicons name="person-circle-outline" size={25} color={COLOR.B_300} />
        </View> */}
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
    paddingVertical: 10
  },
  text: {
    color: COLOR.B_300,
    fontSize: FONTSIZE.HEADING_5,
    marginRight: 10
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 5
  }
})