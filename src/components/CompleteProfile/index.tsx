import React from 'react'
import Button from '../Button';
import {Pressable, StyleSheet, Text, View} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons';
import {COLOR, FONTSIZE} from '../../constants/constants';
import {Ionicons} from '@expo/vector-icons';
import {FONT_NAMES} from '../../assets/fonts/fonts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';

interface CompleteProfileProps {
  handleClose: () => void;
}
const Index = ({handleClose}: CompleteProfileProps) => {
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Pressable style={styles.close} onPress={handleClose}>
        <Ionicons name="close" size={24} color={COLOR.SECONDARY_200} />
      </Pressable>
      <View style={styles.pictureView}>
        <View style={styles.halfBorderOverlay}>
          <MaterialIcons name="account-circle" size={70} color={COLOR.SECONDARY_100} />
          {/* <View style={styles.halfBorderOverlay} /> */}
        </View>
        <View style={styles.textView}>
          <Text style={styles.title}>Complete your profile</Text>
          <Text style={styles.description}>Complete a few missing steps to have a greate profile</Text>
        </View>
      </View>
      <Button
        btn={styles.button}
        textStyle={styles.buttonText}
        title='Continue'
        handlePress={() => navigation.navigate('More')}
      />
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLOR.SECONDARY_50,
    padding: 10,
    elevation: 1,
    marginVertical: 10,
  },
  pictureView: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
    margin: 5,
  },
  avatar_view: {
    borderWidth: 5,
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex:1,
  },
  title: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_1,
  },
  description: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.TITLE_2,
  },
  buttonText: {
    fontFamily: FONT_NAMES.Title,
    textAlign: 'center',
    fontSize: FONTSIZE.BODY
  },
  halfBorderOverlay: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderTopColor: COLOR.SECONDARY_100,
    borderBottomColor: COLOR.WHITE,
    borderRightColor: COLOR.WHITE,
    borderLeftColor: COLOR.SECONDARY_100,
    borderRadius: 100,
  },
  button: {
    borderRadius: 5,
    // backgroundColor: COLOR.GREY_100,
    backgroundColor: COLOR.WHITE,
    padding: 10,
    // alignSelf: 'flex-start',
    // paddingHorizontal:10
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5
  }
})