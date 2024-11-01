import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR, FONTSIZE } from '@constants/constants'
import { retrieveLocalData, storeToLocalStorage } from '@utils/localStorageFunctions'
import { AppContext } from '@helpers/context/AppContext'
import { FONT_NAMES } from '@fonts'

interface NotificationCardProps {
  id?: string
  title: string
  status: string
  model: string
  // desciption?: string
  expiryDate?: string
}
const NotificationCard: React.FC<NotificationCardProps> = (
  {
    id,
    title,
    expiryDate,
    model,
    status,
  }) => {
  const { setNotifications } = useContext(AppContext);
  return (
    <Pressable
      style={{
        ...styles.notificationCard,
        backgroundColor: status == 'READ' ? COLOR.WHITE : COLOR.SECONDARY_75,
        borderRadius: 5,
        opacity: status == 'READ' ? 0.7 : 1,
        // borderWidth: 
      }}
      onPress={async function () {
        const notifications = await retrieveLocalData('notifications');

        const findNotification = notifications?.find((notification: any) => notification.notification_data.id == id);
        const index = notifications?.indexOf(findNotification);
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
          color: COLOR.SECONDARY_300
        }}>Expiring on {expiryDate}</Text>}
      </View>
    </Pressable>
  )
}

export default NotificationCard

const styles = StyleSheet.create({
  notificationCard: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.SECONDARY_50
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  cardFooter: {

  },
  textHeading: {
    fontFamily: FONT_NAMES.Heading,
    color: COLOR.SECONDARY_300
  },
  text: {
    fontFamily: FONT_NAMES.Title
  },
  modelText: {
    paddingBottom: 5,
    borderRadius: 5,
    color: COLOR.SECONDARY_300,
    fontSize: FONTSIZE.TITLE_1,
    textTransform: 'capitalize'
  }
})