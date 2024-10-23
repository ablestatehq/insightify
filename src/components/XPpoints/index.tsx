import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import {FontAwesome6} from '@expo/vector-icons';
import {COLOR, DIMEN} from '../../constants/constants';
import {FONT_NAMES} from '../../assets/fonts/fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../utils/types';


interface XPpointProps {
  number: number;
  navigation: NativeStackNavigationProp<RootStackParamList>
  inCommunity: boolean;
}
const Index = ({number, navigation, inCommunity}: XPpointProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.xpView}>
        <FontAwesome6 name="bolt" size={12} color={COLOR.GOLD} />
        <Text style={styles.points}>{number} XP</Text>
      </View>
      {inCommunity && <Ionicons
        name="chatbubbles-outline"
        size={15}
        color={COLOR.GOLD}
        style={styles.icon}
        onPress={() => navigation.navigate('ChatRoom')} />}
    </View>
  )
}

export default React.memo(Index);

const styles = StyleSheet.create({
  container: {
    gap: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    padding: 5,
  },
  xpView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.5
  },
  points: {
    fontFamily: FONT_NAMES.Title,
    color: COLOR.SILVER,
  },
  icon: {
    paddingLeft: DIMEN.PADDING.ME
  }
})