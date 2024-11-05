import React from 'react'
import Button from '../Button';
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '@constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { FONT_NAMES } from '@fonts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/types';

interface CompleteProfileProps {
  // setShowCompleteProfile: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void;
  setShowProfileCard: React.Dispatch<React.SetStateAction<boolean>>
}
const Index = ({ handleClose, setShowProfileCard }: CompleteProfileProps) => {

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
          <Text style={styles.title}>Unlock work opportunities</Text>
          <Text style={styles.description}>Complete a few missing steps to have a great profile.</Text>
        </View>
      </View>
      <Button
        btn={styles.button}
        textStyle={styles.buttonText}
        title='Continue'
        // handlePress={() => navigation.navigate('More')}
        handlePress={() => setShowProfileCard(true)}
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
    paddingHorizontal: 15
  },
  pictureView: {
    gap: 10,
    margin: 5,
    marginBottom: 15,
    flexDirection: 'row',
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
    flex: 1,
  },
  title: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
  },
  description: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
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
    backgroundColor: COLOR.WHITE,
    padding: 10,
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5
  }
})