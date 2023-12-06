import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
// import { WebView } from "react-native-webview";
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLOR, FONTSIZE } from '../../../constants/contants';
import { Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

const Contact = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
    >
      <View style={styles.contactContainer}>
        <View style={styles.contactView}>
          <Feather
            name="smartphone"
            size={25}
            color={COLOR.B_300}
          />
          <Text style={styles.contactText}>
            +256756085187
          </Text>
        </View>
        <View style={styles.contactView}>
          <MaterialCommunityIcons
            name="email-outline"
            size={25}
            color={COLOR.B_300}
          />
          <Text style={styles.contactText}>
            theablestate@gmail.com
          </Text>
        </View>

        <View style={styles.socialMediaContainer}>
          <View style={styles.socialMediaTitleView}>
            <Text style={styles.socialText}>
              Social media
            </Text>
          </View>
          <View style={styles.socialContainer}>
            <Feather
              name="twitter"
              size={30}
              color={COLOR.B_300}
            />
            <Text style={styles.socialText}>
              Twitter{'\n'}
              <Text style={styles.handleText}>@ablestatehq</Text>
            </Text>
          </View>
          <View style={styles.socialContainer}>
            <SimpleLineIcons
              name="social-linkedin"
              color={COLOR.B_300}
              size={30}
            />
            <Text style={styles.socialText}>
              LinkedIn{'\n'}
              <Text style={styles.handleText}>@ablestatehq</Text>
            </Text>
          </View>
          <View style={styles.socialContainer}>
            <Feather
              name="youtube"
              size={30}
              color={COLOR.B_300}
            />
            <Text style={styles.socialText}>
              YouTube{'\n'}
              <Text style={styles.handleText}>@ablestatehq</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Contact

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: 5,
  },
  contactContainer: {
    flex: 1,
    padding: 20
  },
  contactText: {
    fontFamily: 'ComfortaaSemiBold',
    fontSize: FONTSIZE.TITLE_1
  },
  contactView: {
    gap: 25,
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: COLOR.WHITE,
  },
  socialContainer: {
    gap: 20,
    marginBottom: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    flexDirection: 'column',
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: "ComfortaaSemiBold",
    color:COLOR.B_300,
  },
  socialMediaContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLOR.WHITE,
  },
  socialMediaTitleView: {
    paddingBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.GREY_50,
  },
  handleText: {
    fontSize:FONTSIZE.SMALL
  }
})