import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native';

import Icon from '../../assets/icons';
import OpenLink from '../../utils/OpenLink';
import IconLabelPair from '../IconLabelPair';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {CommentSection} from '..';
import Comments from '../Comments/Comments';

interface TipFooterProps {
  id?: number
  source_url_text?: string
  source_url?: string
  isCodeTip?: boolean
  bookmarked: boolean
  handleBookmark: () => void
  onSubmitReport: () => void
  comments?: any[]
}

const TipFooter: React.FC<TipFooterProps> = ({
  id,
  source_url_text,
  isCodeTip = false,
  bookmarked,
  handleBookmark,
  source_url,
  onSubmitReport,
  comments
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

  return (
    <View>
      <View style={[styles.footer, { justifyContent: source_url_text ? 'space-evenly' : 'flex-end' }]}>
        {/* {!bookmarked && <Icon
        name="heart-outline"
        size={20}
        _color={COLOR.PRIMARY_300}
        press={handleBookmark} />}
      {bookmarked && <Icon
        name='heart'
        size={20}
        _color={COLOR.PRIMARY_300}
        press={handleBookmark}
      />} */}

        {!bookmarked && <IconLabelPair
          iconName='heart-outline'
          iconLabel='Save'
          press={handleBookmark}
          color={COLOR.PRIMARY_300}
          size={15}
        />}

        {bookmarked && <IconLabelPair
          iconName='heart'
          iconLabel='Saved'
          press={handleBookmark}
          color={COLOR.PRIMARY_300}
          size={15}
        />}
        {/* A user should be able to report anthing wrong with the tip/opportunity. */}
        <IconLabelPair
          iconName='report'
          iconLabel={'Report'}
          size={15}
          color={COLOR.PRIMARY_300}
          press={handleSubmit}
        />

        <IconLabelPair
          iconLabel='Comment'
          iconName='message'
          size={13}
          press={function () {
            setOpenComments(!openComments)
          }}
          color={COLOR.PRIMARY_300}
        />
        {/* <Icon name='report' press={handleSubmit} size={20} /> */}
        {source_url &&
          <Pressable style={styles.inputView} onPress={openSourceLink}>
            <Text style={styles.text}>{source_url_text}</Text>
          </Pressable>
        }
      </View>
      <Comments
        wantsToComment={openComments}
        resourceId={id as number}
        comments={comments?.filter(comment => comment?.resourceId == id) ?? []} />
    </View>
  );
}

export default React.memo(TipFooter);

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
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