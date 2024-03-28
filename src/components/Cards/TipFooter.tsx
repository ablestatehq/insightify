import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native';

import Icon from '../../assets/icons';
import OpenLink from '../../utils/OpenLink';
import IconLabelPair from '../IconLabelPair';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {CommentSection} from '..';

interface TipFooterProps {
  id?: number
  source_url_text?: string
  source_url?: string
  isCodeTip?: boolean
  bookmarked: boolean
  handleBookmark: () => void
  onSubmitReport: () => void
}

const TipFooter: React.FC<TipFooterProps> = ({
  id,
  source_url_text,
  isCodeTip = false,
  bookmarked,
  handleBookmark,
  source_url,
  onSubmitReport,
}) => {
  // State
  const [openComments, setOpenComments] = React.useState<boolean>(false);

  // Footer functions
  const openSourceLink = () => {
    OpenLink(source_url as string)
  };

  const handleSubmit = () => {
    onSubmitReport()
  }

  // const fetchComments = React.useMemo(() => {
  //   const response = dataModal.getData('comments');
  //   return response;
  // }, [id]);

  React.useEffect(() => {
    
   }, []);
  return (
    <View style={[styles.footer]}>
      {!bookmarked && <Icon
        name="heart-outline"
        size={20}
        _color={COLOR.PRIMARY_300}
        press={handleBookmark} />}
      {bookmarked && <Icon
        name='heart'
        size={20}
        _color={COLOR.PRIMARY_300}
        press={handleBookmark}
      />}

      {/* {!bookmarked && <IconLabelPair iconName='heart-outline' iconLabel='Save' onPress={handleBookmark} />} */}
      {/* {bookmarked && <IconLabelPair iconName='heart' iconLabel='Saved' onPress={handleBookmark} />} */}

      {/* A user should be able to report anthing wrong with the tip/opportunity. */}
      {/* <IconLabelPair iconName='report' iconLabel={'Report'} size={20} onPress={handleSubmit} /> */}
      {/* <IconLabelPair iconLabel='Comment' iconName='message' size={17} onPress={function () { setOpenComments(true) }} /> */}
      <Icon name='report' press={handleSubmit} size={20} />
      {source_url &&
        <Pressable style={styles.inputView} onPress={openSourceLink}>
          <Text style={styles.text}>{source_url_text}</Text>
        </Pressable>
      }
    </View>
  );
}

export default React.memo(TipFooter);

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
    justifyContent:'flex-end'
  },
  inputView: {
    borderWidth: 1,
    borderColor: COLOR.PRIMARY_300,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: COLOR.PRIMARY_50
  },
  inputText: {
    flex: 1,
  },
  text: {
    color: COLOR.PRIMARY_300,
    fontSize:FONTSIZE.SMALL
  }
})