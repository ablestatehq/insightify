import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { useNavigation } from '@react-navigation/native';
import { OpportunityItemCardProps } from '../../utils/types';
import { AppContext } from '../../helper/context/AppContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OpenLink, handleBookmark } from '../../helper/functions/handleFunctions';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const OpportunityItemCard: React.FC<OpportunityItemCardProps> =
  ({
    id,
    title,
    description,
    link,
    expireDate,
    type,
    location,
    createdAt,
    bookmarked
  }) => {

    const { setOpportunities, opportunities, isLoggedIn } = useContext(AppContext)
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
      <View style={styles.container}>
        <View style={styles.headSection}>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <Text style={styles.heading}>{title}</Text>
          </View>
          <Pressable
            style={{
              backgroundColor: COLOR.GREY_50,
              paddingLeft: 15,
              paddingRight: 10,
              alignSelf: 'flex-start',
              borderBottomLeftRadius: 20,
              paddingVertical: 5
            }}
          >
            {bookmarked && <Ionicons
              name="bookmark"
              size={20}
              color={COLOR.B_300}
              onPress={function () {
                if (isLoggedIn) {
                  handleBookmark(id, opportunities, setOpportunities)
                } else {
                  navigation.navigate('Login', { title: 'Login to \nsave an Opportunity', opportunityID: id })
                }
              }}
            />}
            {!bookmarked && <Ionicons
              name="bookmark-outline"
              size={20}
              color={COLOR.B_300}
              onPress={function () {
                if (isLoggedIn) {
                  handleBookmark(id, opportunities, setOpportunities);
                } else {
                  navigation.navigate('Login', { title: 'Login to save \nthis Opportunity', opportunityID: id })
                }
              }}
            />}
          </Pressable>
        </View>
        <View style={styles.description}>
          <Text
            style={styles.text}
            numberOfLines={3}
          >{description}</Text>
        </View>
        <View style={styles.footer}>
          <View style={{ paddingBottom: 10 }}>
            <Text style={{ ...styles.text, color: COLOR.B_300 }}><Text style={styles.location}>Location:</Text> {location}</Text>
          </View>
          <Pressable
            style={{ backgroundColor: COLOR.ORANGE_50, borderTopLeftRadius: 10, paddingHorizontal: 10, paddingBottom: 5 }}
            onPress={() => OpenLink(link)}
          >
            <Text style={styles.btnText}>Details</Text>
          </Pressable>
        </View>
      </View>
    )
  }

export default OpportunityItemCard

const styles = StyleSheet.create({
  container: {
    elevation: 0.5,
    marginBottom: 10,
    borderRadius: 0.5,
    paddingLeft: 10,
  },
  headSection: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  heading: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: 'RalewayBold',
  },
  description: {
    padding: 10
  },
  footer: {
    borderTopColor: COLOR.B_50,
    flexDirection: 'row',
    justifyContent: "space-between",
    // paddingHorizontal: 10,
    alignItems: 'center',
    paddingLeft: 10
  },
  text: {
    fontSize: FONTSIZE.BODY,
    fontFamily: 'RalewayMedium',
  },
  linkText: {
    fontFamily: 'RalewayLight',
    fontSize: FONTSIZE.SMALL,
  },
  btn: {
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  btnText: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.TITLE_2,
    textAlign: 'center',
    color: COLOR.ORANGE_300
  },
  location: {
    color: COLOR.B_75
  }
})