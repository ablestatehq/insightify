import React, { useContext } from 'react'
import { COLOR, FONTSIZE } from '../../constants/contants'
import Header from '../../components/Headers/Header'
import { AppContext } from '../../helper/context/AppContext'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import NotificationCard from '../../components/Cards/NotificationCard'
// import { clearLocalData } from '../../utils/localStorageFunctions'

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
              notifications.map(function (item, index) {
                if (item?.notification_data?.data.model === 'opportunities') {
                  return <NotificationCard
                    id={item?.notification_data?.data?.entry?.id}
                    key={index}
                    title={item?.notification_data?.data?.entry?.Title}
                    // desciption={item.notification_data?.data?.entry?.Description[0]?.children[0]?.text}
                    expiryDate={'03/20/24'}
                    // status={item.status}
                    model={item?.notification_data?.data?.model} />
                } else {
                  return <NotificationCard
                    id={item?.notification_data?.data?.entry?.id}
                    key={index}
                    title={item?.notification_data?.data?.entry?.Title}
                    // status={item.status}
                    model={item?.notification_data?.data?.model} />
                }
              })
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

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  noTextStyle: {
    fontFamily: 'ComfortaaBold',
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