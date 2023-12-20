import { Platform, Linking } from "react-native"

const contactPressed = (contactProvider: string) => {
  switch (contactProvider) {
    case 'tel':
      let number = ''
      if (Platform.OS === 'ios') {
        number = 'telprompt:${+256756085187}'
      } else {
        number = 'tel:${+256756085187}'
      }
      // Linking.openURL(number)
      break
    case 'youtube':
      // console.log("Youtube")
      Linking.openURL('youtube://@ablestatehq')
        .catch(() => {
          Linking.openURL('https://www.youtube.com/@ablestate');
        });
      break
    case 'email':
      // console.log("Email")
      break
    case 'twitter':
      // console.log('Twitter')
      Linking.openURL('twitter://@ablestatehq')
        .catch(() => {
          Linking.openURL('https://twitter.com/ablestatehq')
        });
      break
    case 'linkedIn':
      // console.log('LinkedIn')
      Linking.openURL('linkedin://@ablestatehq')
        .catch(() => {
          Linking.openURL('https://www.linkedin.com/company/ablestatehq/posts/?feedView=all');
        })
      break
    case 'instagram':
      // console.log('instagram')
      Linking.openURL('instagram://@ablestatehq')
        .catch(() => {
          Linking.openURL('https://www.instagram.com/ablestatehq/');
        })
      break
    default:
      break
  }
}

export {
  contactPressed
}