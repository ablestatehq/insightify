import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import Icons from '../../assets/icons';
import OpenLink from '../../utils/OpenLink';
import {COLOR} from '../../constants/contants';

interface TipFooterProps {
  source_url_text?: string
  source_url?: string
  isCodeTip?: boolean
  bookmarked: boolean
  handleBookmark: () => void
  onSubmitReport: () => void
}
const TipFooter: React.FC<TipFooterProps> = ({
  source_url_text,
  isCodeTip = false,
  bookmarked,
  handleBookmark,
  source_url,
  onSubmitReport
}) => {
  {/* footer  */ }
  const openSourceLink = () => {
    OpenLink(source_url as string)
  }
  const handleSubmit = () => {
    onSubmitReport()
  }
  return (
    <View style={styles.footer}>
      {!bookmarked && <Ionicons
        name="heart-outline"
        size={30}
        color={COLOR.PRIMARY_300}
        onPress={handleBookmark} />}
      {bookmarked && <Ionicons
        name='heart'
        size={25}
        color={COLOR.PRIMARY_300}
        onPress={handleBookmark}
      />}
      {/* A user should be able to report anthing wrong with the tip/opportunity.*/}
      <Icons name='report' press={handleSubmit} size={25}/>
      {source_url &&
        <View>
          <Pressable style={styles.inputView} onPress={openSourceLink}>
            <Text style={styles.text}>{source_url_text}</Text>
          </Pressable>
        </View>}
    </View>
  );
}

export default React.memo(TipFooter)

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    marginTop: 20
  },
  inputView: {
    borderWidth: 1,
    borderColor: COLOR.PRIMARY_300,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: COLOR.PRIMARY_50
  },
  inputText: {
    flex: 1,
    // padding:5 
  },
  text: {
    color: COLOR.PRIMARY_300
  }
})