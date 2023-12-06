import React from 'react'
import Button from './Button'
import OpenLink from '../utils/OpenLink'
import { Feather } from '@expo/vector-icons'
import { handleLinkPress } from '../utils/onShare'
import { COLOR, FONTSIZE } from '../constants/contants'
import { OpportunityItemCardProps } from '../utils/types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const OpportunityItemCard: React.FC<OpportunityItemCardProps> =
  ({
    title,
    description,
    link,
    expireDate,
    type,
    location,
    createdAt
  }) => {

    return (
      <View style={styles.container}>
        <View style={styles.headSection}>
          <View>
            <Text style={styles.heading}>{title}</Text>
            <TouchableOpacity onPress={() => OpenLink(link)}>
              <Text style={styles.linkText}>Apply on: {link}</Text>
            </TouchableOpacity>
          </View>
          <Feather
            name="bookmark"
            size={20}
            // color={COLOR.WHITE}
            // color={COLOR.ORANGE_300}
          />
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>Location: {location}</Text>
          <Button
            title='apply now'
            btn={styles.btn}
            textStyle={styles.btnText}
            handlePress={() => handleLinkPress(link)}
          />
        </View>
      </View>
    )
  }

export default OpportunityItemCard

const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 0.5,
    marginBottom: 10,
    borderRadius:0.5
  },
  headSection: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingHorizontal: 10,
    alignItems: 'center'
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
    color:COLOR.ORANGE_300
  }
})