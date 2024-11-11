import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants'
import { FONT_NAMES } from '@src/assets/fonts/fonts'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@src/types'
import { AppContext } from '@src/context'

const SupportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isLoggedIn } = useContext(AppContext);
  const handleTalent = () => {
    if (isLoggedIn) {
      navigation.navigate('Talent');
    } else {
      navigation.navigate('Login', {});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.heroView}>
        <View style={styles.headerView}>
          <Ionicons
            size={20}
            color="black"
            name="arrow-back-sharp"
            onPress={() => navigation.goBack()} />
          <Text style={styles.screen_title}>Support</Text>
          <View />
        </View>
        <View style={styles.support_image_view}>
          <Text style={styles.helloText}>Hello, How can we help you?</Text>
        </View>
      </View>
      <View style={styles.main}>
        {/**Hire */}
        <View style={styles.itemCard}>
          <View style={styles.item_view_left}>
            <Ionicons
              name="person-add-outline"
              size={15}
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.itemText}>Hire</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={handleTalent}
          />
        </View>
        {/**Help */}
        <View style={styles.itemCard}>
          <View style={styles.item_view_left}>
            <Ionicons name="help-circle-outline" size={18} color={COLOR.SECONDARY_100} />
            <Text style={styles.itemText}>Contact us for help</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={() => navigation.navigate('Contact')}
          />
        </View>
        {/**Your voice matters */}
        <View style={styles.itemCard}>
          <View style={styles.item_view_left}>
            <Ionicons
              name="chatbox-outline"
              size={15}
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.itemText}>Your voice matters</Text>
          </View>
          <Entypo
            size={15}
            name="chevron-thin-right"
            color={COLOR.SECONDARY_100}
            onPress={() => navigation.navigate('Feedback')}
          />
        </View>
      </View>
    </View>
  )
}

export default SupportScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DIMEN.PADDING.ME,
    backgroundColor: COLOR.WHITE,
  },
  heroView: {
    flex: 1,
  },
  screen_title: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    textAlign: 'center'
  },
  helloText: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: FONT_NAMES.Heading,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    flex: 1,
  },
  support_image_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: DIMEN.CONSTANT.SM,
    padding: DIMEN.PADDING.LG,
    backgroundColor: COLOR.WHITE,
    elevation: 1,
    marginVertical: DIMEN.MARGIN.SM
  },
  item_view_left: {
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.SM,
    alignItems: 'center',
  },
  itemText: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
  },
});