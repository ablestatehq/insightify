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
      Linking.openURL(number)
      break
    case 'youtube':
      Linking.openURL('youtube://@ablestatehq')
        .catch(() => {
          Linking.openURL('https://www.youtube.com/@ablestate');
        });
      break
    case 'email':
      break
    case 'twitter':
      Linking.openURL('twitter://@ablestatehq')
        .catch(() => {
          Linking.openURL('https://twitter.com/ablestatehq')
        });
      break
    case 'linkedIn':
      Linking.openURL('linkedin://@ablestatehq')
        .catch(() => {
          Linking.openURL('https://www.linkedin.com/company/ablestatehq/posts/?feedView=all');
        })
      break
    case 'instagram':
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