import React, { useContext } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR, FONTSIZE } from '../../constants/constants'
import { AppContext } from '../../helper/context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FONT_NAMES } from '../../assets/fonts/fonts'


interface OpportunityHeaderProps {
  showFilterCard: () => void
}

function OpportunityHeader({ showFilterCard }: OpportunityHeaderProps): JSX.Element {
  const { notifications } = useContext(AppContext)
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  // check the spacing 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Explore opportunities
      </Text>
      <View style={styles.iconContainer}>
        <Ionicons name="filter-outline" size={23} color={COLOR.SECONDARY_300} onPress={showFilterCard} />
        <View style={styles.searchMain}>
          <View style={{
            ...styles.badge,
            backgroundColor: notifications.some((notification: any) => notification.status == 'UNREAD') ? COLOR.PRIMARY_300 : COLOR.WHITE,
            zIndex: notifications.some((notification: any) => notification.status == 'UNREAD') ? 1 : 0,
          }} />
          <Ionicons
            size={20}
            color="black"
            name="notifications-outline"
            onPress={() => navigation.navigate('Notification')} />
        </View>
      </View>
    </View>
  )
};

export default React.memo(OpportunityHeader)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 10,
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  text: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: FONT_NAMES.Title,
    marginBottom: 5,
    marginTop: 5,
  },
  searchMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    top: 1,
    right: 3,
    width: 7,
    height: 7,
    borderRadius: 10,
    position: 'absolute',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

  }
})