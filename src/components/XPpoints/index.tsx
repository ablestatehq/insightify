import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { COLOR, DIMEN, FONTSIZE } from '@constants/constants';
import { FONT_NAMES } from '@fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/types';


interface XPpointProps {
  number: number;
  navigation: NativeStackNavigationProp<RootStackParamList>
  inCommunity: boolean;
}
const Index = ({ number, navigation, inCommunity }: XPpointProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.xpView}>
        <FontAwesome6 name="bolt" size={12} color={COLOR.GREY_300} />
        <Text style={styles.points}>{number} XP</Text>
      </View>
      {inCommunity && <Ionicons
        name="chatbubbles-outline"
        size={15}
        color={COLOR.GREY_300}
        style={styles.icon}
        onPress={() => navigation.navigate('ChatRoom')} />}
    </View>
  )
}

export default React.memo(Index);

const styles = StyleSheet.create({
  container: {
    gap: DIMEN.CONSTANT.SM,
    borderRadius: DIMEN.CONSTANT.SM,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  xpView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.5,
    height: 25,
    width: 64,
  },
  points: {
    fontFamily: FONT_NAMES.Title,
    color: COLOR.GREY_200,
    flex: 1,
    // borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 18,
    padding: DIMEN.PADDING.SM,
    fontSize: FONTSIZE.BODY
  },
  icon: {
    paddingLeft: DIMEN.PADDING.ME
  }
})