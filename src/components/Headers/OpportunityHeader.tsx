import React, { useContext } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR, FONTSIZE } from '../../constants/contants'
import { AppContext } from '../../helper/context/AppContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


interface OpportunityHeaderProps {
  showFilterCard: () => void
}

const OpportunityHeader: React.FC<OpportunityHeaderProps> = ({ showFilterCard }) => {
  const { notifications } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Opportunities
      </Text>
      <View style={styles.iconContainer}>
        <Ionicons name="filter-outline" size={23} color={COLOR.B_300} onPress={showFilterCard} />
        <View style={styles.searchMain}>
          <View style={{
            ...styles.badge,
            backgroundColor: notifications.some((notification:any) => notification.status == 'UNREAD') ? COLOR.DANGER : COLOR.WHITE,
            zIndex: notifications.some((notification: any) => notification.status == 'UNREAD') ? 1 : 0,
          }} />
          <Ionicons
            size={20}
            color="black"
            name="notifications-outline"
            onPress={()=>navigation.navigate('Notification')}
            />
        </View>
      </View>
    </View>
  )
}

export default OpportunityHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems:'center'
  },
  text: {
    fontSize: FONTSIZE.HEADING_5,
    fontFamily: 'RalewayBold',
    marginBottom: 5,
    marginTop:5

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