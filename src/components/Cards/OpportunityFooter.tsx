import React from 'react'
import Icons from '../../assets/icons';
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, View, Text} from 'react-native';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {resourceAge} from '../../helper/functions/functions';

interface OpportunityFooterProps {
  link: string
  location: string
  bookmarked: boolean
  handleBookmark: () => void
  showReportModal: () => void
  publishedDate?: string
}
const OpportunityFooter: React.FC<OpportunityFooterProps> = ({bookmarked, handleBookmark, link, showReportModal, publishedDate, location}) => {
  
  const opportunityLifeSpan = resourceAge(publishedDate as unknown as Date);

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <View style={{ paddingBottom: 10 }}>
          <Text style={{ ...styles.text, color: COLOR.SECONDARY_300 }}>
            {/* <Text style={styles.location}>Location:</Text> */}
            {location}
          </Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
      }}>
        <Text style={{ opacity: 0.5, textTransform: 'capitalize' }}>{opportunityLifeSpan}</Text>
        {!bookmarked && <Ionicons
          name="heart-outline"
          size={20}
          color={COLOR.PRIMARY_300}
          onPress={handleBookmark} />}
        {bookmarked && <Ionicons
          name='heart'
          size={20}
          color={COLOR.PRIMARY_300}
          onPress={handleBookmark}
        />}
        <Icons name={'report'} size={20} press={showReportModal} />
      </View>
    </View>
  );
}

export default OpportunityFooter

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingVertical: 5,
    gap: 20,
    borderTopWidth: 0.5,
    borderTopColor:COLOR.SECONDARY_50
  },
  mentionStyle: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLOR.SECONDARY_50,
    alignItems: 'center',
    borderRadius: 5
  },
  imageView: {
    width: 20,
    height: 20
  },
  image: {
    width: 20,
    height: 20
  },
  mentionInput: {
    flex: 1
  },
  footer: {
    borderTopColor: COLOR.SECONDARY_50,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingLeft: 10
  },
  text: {
    fontSize: FONTSIZE.BODY,
    fontFamily: 'RalewayMedium',
  },
})