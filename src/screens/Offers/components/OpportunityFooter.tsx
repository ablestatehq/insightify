import React from 'react'
import Icons from '@icons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR, DIMEN, FONTSIZE } from '@constants/constants';
import { FONT_NAMES } from '@fonts';

interface OpportunityFooterProps {
  link: string
  location: string
  bookmarked: boolean
  handleBookmark: () => void
  showReportModal: () => void
  // publishedDate?: string
}
const OpportunityFooter: React.FC<OpportunityFooterProps> = ({
  bookmarked,
  handleBookmark,
  link,
  showReportModal,
  location,
}) => {

  return (
    <View style={styles.container}>
          <Text style={{ ...styles.text, color: COLOR.SECONDARY_300 }}>
            {location}
          </Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: DIMEN.PADDING.SM,
        // paddingHorizontal: DIMEN.PADDING.ME,
        // borderWidth: 1,
      }}>
        {/* <Text style={{ opacity: 0.5, textTransform: 'capitalize' }}>{opportunityLifeSpan}</Text> */}
        {!bookmarked && <Ionicons
          name="heart-outline"
          size={15}
          color={COLOR.PRIMARY_300}
          onPress={handleBookmark} />}
        {bookmarked && <Ionicons
          name='heart'
          size={15}
          color={COLOR.PRIMARY_300}
          onPress={handleBookmark}
        />}
        <Icons name={'report'} size={15} press={showReportModal} />
      </View>
    </View>
  );
}

export default OpportunityFooter

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: COLOR.SECONDARY_50,
    paddingHorizontal: DIMEN.PADDING.ME,
    alignItems: 'center',
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
    fontFamily: FONT_NAMES.Title,
  },
})