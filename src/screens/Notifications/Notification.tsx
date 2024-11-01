import React, { useContext } from 'react'
import { COLOR, FONTSIZE } from '@constants/constants'
import Header from '@components/Headers/Header'
import { AppContext } from '@helpers/context/AppContext'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import NotificationCard from '@components/Cards/NotificationCard'
import { FONT_NAMES } from '@fonts'
// import { clearLocalData } from '@utils/localStorageFunctions'

const Notification = () => {

  // notifications 
  const { notifications } = useContext(AppContext);
  // clearLocalData('notifications');
  return (
    <View style={styles.container}>
      <Header title='Notifications' />
      {notifications.length > 0 ?
        <View style={styles.scrollContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {
              notifications.map(({ notification_data: { title, id, expiryDate, model }, status }, index) =>
                <NotificationCard
                  id={id}
                  key={index}
                  title={title}
                  expiryDate={expiryDate}
                  model={model}
                  status={status}
                />
              )
            }
          </ScrollView>
        </View>
        :
        <View style={styles.noNotification}>
          <Text style={styles.noTextStyle}>You have no notifications.</Text>
        </View>
      }
    </View>
  )
}

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  noTextStyle: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    color: COLOR.SECONDARY_75
  },
  noNotification: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 5
  },
})