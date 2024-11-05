import React, { useContext } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR, DIMEN, FONTSIZE } from '@constants/constants'
import { AppContext } from '@src/context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FONT_NAMES } from '@fonts'


interface OpportunityHeaderProps {
  showFilterCard: () => void
}

function OpportunityHeader({ showFilterCard }: OpportunityHeaderProps): JSX.Element {
  const { notifications } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // check the spacing
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Opportunities
      </Text>
      <View style={styles.iconContainer}>
        <Ionicons name="filter-outline" size={15} color={COLOR.SECONDARY_300} onPress={showFilterCard} />
        <View style={styles.searchMain}>
          <View style={{
            ...styles.badge,
            backgroundColor: notifications.some((notification: any) => notification.status == 'UNREAD')
              ? COLOR.PRIMARY_300 : COLOR.WHITE,
            zIndex: notifications.some((notification: any) => notification.status == 'UNREAD')
              ? 1 : 0,
          }} />
          <Ionicons
            size={15}
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
    justifyContent: 'space-between',
    paddingVertical: DIMEN.PADDING.SM,
  },
  text: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: FONT_NAMES.Title,
    marginVertical: 10,
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