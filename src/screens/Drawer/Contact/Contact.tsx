import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, View, Text, Pressable } from 'react-native'
import { Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

import { contactPressed } from '../handlers';
import { COLOR, FONTSIZE } from '../../../constants/contants';
import Header from '../../NewsDetails/helperComponents/Header';

const Contact = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={styles.safeAreaContainer}
    >
      <Header title='Contact us' />
      <View style={styles.contactContainer}>
        <Text style={styles.introText}>
          Get in touch with us!
        </Text>
        <Pressable
          onPress={() => contactPressed('tel')}
          style={styles.contactView}>
          <Feather
            name="smartphone"
            size={20}
            color={COLOR.B_300}
          />
          <Text style={styles.contactText}>
            +256756085187
          </Text>
        </Pressable>
        <Pressable
          onPress={() => contactPressed('email')}
          style={styles.contactView}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color={COLOR.B_300}
          />
          <Text style={styles.contactText}>
            hello@theablestate.com
          </Text>
        </Pressable>

        <View style={styles.socialMediaContainer}>
          <View style={styles.socialMediaTitleView}>
            <Text style={styles.socialText}>
              Social media
            </Text>
          </View>
          <Pressable
            onPress={() => contactPressed('twitter')}
            style={styles.socialContainer}>
            <Feather
              name="twitter"
              size={20}
              color={COLOR.B_300}
            />
            <Text style={styles.socialText}>
              Twitter{'\n'}
              <Text style={styles.handleText}>@ablestatehq</Text>
            </Text>
          </Pressable>
          <Pressable
            onPress={() => contactPressed('linkedIn')}
            style={styles.socialContainer}>
            <SimpleLineIcons
              name="social-linkedin"
              color={COLOR.B_300}
              size={20}
            />
            <Text style={styles.socialText}>
              LinkedIn{'\n'}
              <Text style={styles.handleText}>@ablestatehq</Text>
            </Text>
          </Pressable>
          <Pressable
            onPress={() => contactPressed('youtube')}
            style={styles.socialContainer}>
            <Feather
              name="youtube"
              size={20}
              color={COLOR.B_300}
            />
            <Text style={styles.socialText}>
              YouTube{'\n'}
              <Text style={styles.handleText}>@ablestatehq</Text>
            </Text>
          </Pressable>
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
    backgroundColor: COLOR.WHITE,
  },
  contactContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: COLOR.WHITE
  },
  contactText: {
    fontFamily: 'ComfortaaSemiBold',
    fontSize: FONTSIZE.TITLE_2
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
    elevation: 1
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
    color: COLOR.B_300,
  },
  socialMediaContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLOR.WHITE,
    elevation: 1
  },
  socialMediaTitleView: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.GREY_50,
  },
  handleText: {
    fontSize: FONTSIZE.SMALL
  },
  introText: {
    fontFamily: 'RalewayBold',
    fontSize: FONTSIZE.HEADING_5,
    marginBottom: 20
  }
})