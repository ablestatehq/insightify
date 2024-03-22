import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR, FONTSIZE } from '../../../constants/contants';
import { DrawerActions, useNavigation } from '@react-navigation/native';


interface HeaderProps {
  title?: string
}

const Header: React.FC = (
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
          justifyContent: 'space-between'
        }}
      >
        <Ionicons
          name="menu"
          size={30}
          color={COLOR.SECONDARY_300}
          onPress={openDrawer}
        />
        {title && <Text style={styles.text}>{title}</Text>}
        <View style={styles.headerIcons}>
          {/* <View>
            <View style={styles.notificationDot}/>
            <Ionicons name="md-notifications-outline" size={30} color={COLOR.SECONDARY_300} />
          </View> */}
          <Ionicons
            name="person-circle-outline"
            color={COLOR.SECONDARY_300}
            size={30}
          />
        </View>
      </View>
    </View >
  );
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    borderBottomWidth: 0.9,
    borderBottomColor: COLOR.GREY_50,
    paddingVertical: 10
  },
  text: {
    color: COLOR.SECONDARY_300,
    fontSize: FONTSIZE.HEADING_5,
    marginRight: 10
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 5
  },
  notificationDot: {
    top: 4,
    width: 8,
    right: 7,
    zIndex: 1,
    height: 8,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: COLOR.DANGER,
  }
})