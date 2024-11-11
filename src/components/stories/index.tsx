import {StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import {StoryProps} from '@src/types'
import {FONT_NAMES} from '@src/assets/fonts/fonts'
import {DIMEN, FONTSIZE} from '@src/constants/constants'

const Index = ({ stories }: StoryProps) => {
  const renderStory = ({item, index}:{item: any, index: number}) => {
    return (
      <View key={index}></View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Stories</Text>
      <FlatList
        data={stories}
        renderItem={renderStory}
        contentContainerStyle={styles.scrollStyle}
      />
      <Text style={styles.moreStories}>Featured Stories</Text>
      <FlatList
        data={stories}
        contentContainerStyle={styles.scrollStyle}
        renderItem={renderStory}
      />
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_1,
    marginVertical: DIMEN.MARGIN.ME,
  },
  moreStories: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.BODY,
  },
  scrollStyle: {
    flexGrow: 1,
  }
});

