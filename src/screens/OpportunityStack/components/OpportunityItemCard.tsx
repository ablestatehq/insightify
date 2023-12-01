import React from 'react'
import { Feather } from '@expo/vector-icons'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { StyleSheet, Text, View } from 'react-native'
import { OpportunityItemCardProps } from '../../../utils/types'
import { contentLifeSpan } from '../../../helper/functions/functions'

const OpportunityItemCard: React.FC<OpportunityItemCardProps> = ({ title, description, link, expireDate, type, location, createdAt }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headSection}>
        <View>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.linkText}>Apply on: {link}</Text>
        </View>
        <Feather
          name="bookmark"
          size={20}
          color="black"
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.text}>{description}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>Location: {location}</Text>
        <Text style={styles.text}>{contentLifeSpan(createdAt)}</Text>
      </View>
    </View>
  )
}

export default OpportunityItemCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.B_50,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  headSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  heading: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily:'RalewayBold'
  },
  description: {
    padding: 10
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLOR.B_75,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal:10
  },
  text: {
    fontSize: FONTSIZE.BODY,
    fontFamily:'RalewayMedium'
  },
  linkText: {
    fontFamily: 'RalewayLight',
    fontSize:FONTSIZE.SMALL
  }
})