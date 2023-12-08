import React, { useContext } from 'react'
import Button from './Button'
import { OpenLink } from '../helper/functions/handleFunctions'
import { Ionicons } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../constants/contants'
import { OpportunityItemCardProps } from '../utils/types'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { retrieveLocalData, storeToLocalStorage } from '../utils/localStorageFunctions';
import { AppContext } from '../helper/context/AppContext';

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

    const { setOpportunities, opportunities } = useContext(AppContext)

    const handleBookmark = async () => {
      const updatedOpportunities = [...opportunities];
      const targetIndex = updatedOpportunities.findIndex(opportunity => opportunity.$id === id);

      if (targetIndex !== -1) {
        const targetOpportunity = updatedOpportunities[targetIndex];

        // Toggle bookmark status
        targetOpportunity.bookmarked = !targetOpportunity.bookmarked;

        updatedOpportunities[targetIndex] = targetOpportunity;

        setOpportunities(updatedOpportunities);

        // Update local storage
        try {
          const bookmarkedData = await retrieveLocalData('opportunities');
          const updatedBookmarkedData = bookmarkedData ? bookmarkedData.filter((oppId:string) => oppId !== id) : [];

          if (targetOpportunity.bookmarked) {
            updatedBookmarkedData.push(id);
          } else {
            updatedBookmarkedData.filter((removeId:string) => removeId !== id)
          }

          await storeToLocalStorage('opportunities', updatedBookmarkedData);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.headSection}>
          <View style={{ flex: 1, paddingTop: 10 }}>
            <Text style={styles.heading}>{title}</Text>
            <TouchableOpacity onPress={() => OpenLink(link)}>
              <Text style={styles.linkText}>Apply on: {link}</Text>
            </TouchableOpacity>
          </View>
          <Pressable
            style={{
              // padding: 5,
              backgroundColor:
                COLOR.GREY_50,
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
              onPress={handleBookmark}
            />}
            {!bookmarked && <Ionicons
              name="bookmark-outline"
              size={20}
              color={COLOR.B_300}
              onPress={handleBookmark}
            />}
          </Pressable>
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.footer}>
          <View style={{ paddingBottom: 10 }}>
            <Text style={{ ...styles.text, color: COLOR.B_75 }}><Text style={styles.location}>Location:</Text> {location}</Text>
          </View>
          <Pressable
            style={{ backgroundColor: COLOR.ORANGE_50, borderTopLeftRadius: 10, paddingHorizontal: 10, paddingBottom: 5 }}
            onPress={() => OpenLink(link)}
          >
            <Button
              title='Details'
              btn={styles.btn}
              textStyle={styles.btnText}
            // handlePress={}
            />
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
    color: COLOR.B_300
  }
})