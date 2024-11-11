import { FONT_NAMES } from '@src/assets/fonts/fonts';
import Icons from '@src/assets/icons';
import { FloatingButton, PostDiscussion, SegmentedControl, Square, Stories } from '@src/components';
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { PostDiscussionModal, Tab } from '@src/types';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('Square');
  const [postModal, setPostModal] = useState<PostDiscussionModal>({
    visible: false,
    close() {
      setPostModal({ ...postModal, visible: false })
    }
  });

  const handleFloatingButtonPress = () => {
    setPostModal({ ...postModal, visible: true });
  }

  const handleTabChange = (value: 'Square' | 'Stories') => {
    setSelectedTab(value);
  };

  const posts: any[] = [
    // ... sample post data
  ];

  const featuredPosts: any[] = [
    // ... sample featured post data
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.title}>News</Text>
        <Icons name='notifications' />
      </View>
      <View style={styles.mainContent}>
        <SegmentedControl
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
        {selectedTab === 'Stories' && <Stories stories={[]} />}
        {selectedTab === 'Square' && <Square discussions={[]} />}
      </View>
      {selectedTab === 'Square' &&
        <FloatingButton
          press={handleFloatingButtonPress}
          buttonPosition={{ bottom: 70, right: 10 }} />}
      <PostDiscussion {...postModal} />
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    padding: DIMEN.PADDING.ME
  },
  mainContent: {
    flex: 1,
  },
  title: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DIMEN.MARGIN.SM,
    marginBottom: DIMEN.MARGIN.ME,
    alignItems: 'center'
  }
})