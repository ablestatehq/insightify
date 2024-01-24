import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { retrieveLocalData, storeToLocalStorage } from '../../../utils/localStorageFunctions'
import { AppContext } from '../../../helper/context/AppContext'

interface NotificationCardProps {
  id?:string
  title: string
  // status: string
  model: string
  // desciption?: string
  expiryDate?: string
}
const NotificationCard: React.FC<NotificationCardProps> = (
  {
    id,
    title,
    expiryDate,
    model
  }) => {
  const { setNotifications } = useContext(AppContext);
  return (
    <Pressable
      style={{
        ...styles.notificationCard,
        // backgroundColor: status == 'READ' ? COLOR.ORANGE_75 : COLOR.ORANGE_300,
        // borderRadius: 5
      }}
      onPress={async function () {
        const notifications = await retrieveLocalData('notifications');

        const findNotification = notifications.find((notification: any) => notification.notification_data.data.entry.id == id);
        const index = notifications.indexOf(findNotification);
        findNotification.status = 'READ'
        notifications[index] = findNotification;

        storeToLocalStorage('notifications', notifications);
        setNotifications(prev => {
          return [...notifications]
        });
      }}
    >
      {/* <View style={styles.textContainer}> */}
      <Text style={styles.modelText}>{model}</Text>
      {/* <Text numberOfLines={2} style={styles.text}>{desciption}</Text> */}
      {/* </View> */}
        <Text style={styles.textHeading}>{title}</Text>
      <View style={styles.textContainer}>
        <View />
        {expiryDate && <Text style={{
          ...styles.textHeading,
          opacity: 0.5,
          fontSize: FONTSIZE.SMALL,
          textAlignVertical: 'bottom',
          color: COLOR.WHITE
        }}>Expiring on {expiryDate}</Text>}
      </View>
    </Pressable>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  notificationCard: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor:COLOR.B_75
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10
  },
  cardFooter: {

  },
  textHeading: {
    fontFamily: 'ComfortaaBold',
    color:COLOR.WHITE
  },
  text: {
    fontFamily: 'RalewaySemiBold'
  },
  modelText: {
    paddingBottom: 5,
    borderRadius: 5,
    color: COLOR.WHITE,
    fontSize: FONTSIZE.TITLE_1,
    textTransform:'capitalize'
  }
})