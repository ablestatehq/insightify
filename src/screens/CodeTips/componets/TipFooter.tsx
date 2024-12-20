import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';

import OpenLink from '@utils/OpenLink';
import IconLabelPair from '../../../components/common/IconLabelPair';
import { COLOR, FONTSIZE } from '@constants/constants';
import Comments from '../../../components/Comments/Comments';

interface TipFooterProps {
  id?: number
  source_url_text?: string
  source_url?: string
  isCodeTip?: boolean
  bookmarked: boolean
  handleBookmark: () => void
  onSubmitReport?: () => void
  comments?: any[]
}

const TipFooter: React.FC<TipFooterProps> = ({
  id,
  source_url_text,
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
    if (onSubmitReport) {
      onSubmitReport()
    }
  }

  const handleOpenComments = function () {
    setOpenComments(!openComments)
  }
  return (
    <View>
      <View style={[styles.footer, { justifyContent: source_url_text ? 'space-evenly' : 'flex-end' }]}>
        {!bookmarked && <IconLabelPair
          iconName='heart-outline'
          iconLabel='Save'
          press={handleBookmark}
          color={COLOR.PRIMARY_300}
          size={13}
        />}

        {bookmarked && <IconLabelPair
          iconName='heart'
          iconLabel='Saved'
          press={handleBookmark}
          color={COLOR.PRIMARY_300}
          size={13}
        />}
        {onSubmitReport && <IconLabelPair
          iconName='report'
          iconLabel={'Report'}
          size={13}
          color={COLOR.PRIMARY_300}
          press={handleSubmit}
        />}

        <IconLabelPair
          iconLabel='Comment'
          iconName='message'
          size={11}
          press={handleOpenComments}
          color={COLOR.PRIMARY_300}
        />
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
    fontSize: FONTSIZE.SMALL
  }
})