import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Ionicons, Octicons, AntDesign} from '@expo/vector-icons';
import {COLOR, FONTSIZE } from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {FONT_NAMES} from '../../assets/fonts/fonts';

interface HeaderProps {
  title?: string
  iconColor?: string,
  backgroundColor?: string;
  showMore?: boolean;
  // mgs: any;
  selected?: string
  onClose?: () => void;
  onReply?: (msgMapID: string) => void;
  onDelete?: (key: string) => void;
}
const Header = (
  {
    showMore=false,
    title = "",
    iconColor = "black",
    backgroundColor,
    onDelete=() => {},
    onReply=() => {},
    onClose=() => {},
    selected,
  }: HeaderProps
) => {

  const navigation = useNavigation();
  const handleBack = () => {navigation.goBack()};
  const handleDelete = () => {
    if (selected && selected.trim()) {
      onDelete(selected.trim());
      onClose();
    }
  };
  const handleReply = () => {
    if (selected && selected.trim()) {
      onReply(selected.trim());
      onClose()
    }
  };
  return (
    <View
      style={[styles.container, {backgroundColor}]}
    >
      <Ionicons
        name="arrow-back"
        size={20}
        color={iconColor}
        onPress={handleBack}
      />
      {!showMore ? (<Text
        style={[
          styles.text,
          {
            fontFamily: FONT_NAMES.Title
          }
        ]}
      >
        {title}
      </Text>) :
        (<View style={{flexDirection: 'row', gap: 10}}>
          <Octicons name="reply" size={15} color="black" onPress={handleReply} style={styles.icon} />
          <AntDesign name="delete" size={15} color="black" onPress={handleDelete} style={styles.icon} />
          {/* <AntDesign name="staro" size={15} color="black" /> */}
          {/* <AntDesign name="star" size={15} color="black" /> */}
          {/* <Feather name="more-vertical" size={15} color="black" /> */}
      </View>)}
      {!showMore && <View />}
    </View >
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLOR.NEUTRAL_2,
    paddingBottom: 5,
    // borderWidth: 1,
    // borderColor: COLOR.DANGER
  },
  text: {
    fontSize: FONTSIZE.TITLE_2,
    // paddingBottom: 2.5
  },
  icon: {
    padding: 2.5,
  }
})