import React, { useContext, useEffect, useState } from 'react'
import { get_top_news } from '@api/grapiql';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import { Dialog, FloatingButton, PostDiscussion, SegmentedControl, Square, Stories } from '@src/components';
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { IDialogProps, NewsPost, PostDiscussionModal, RootStackParamList, Tab } from '@src/types';
import { StyleSheet, Text, View } from 'react-native';
import { usePosts } from '@src/hooks';
import { AppContext } from '@src/context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Index = () => {

  // hooks 
  const { posts, setPost } = usePosts();
  const { isLoggedIn } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  // state
  const [selectedTab, setSelectedTab] = useState<Tab>('Square');
  const [news, setNews] = useState<NewsPost[]>([]);
  const [postModal, setPostModal] = useState<PostDiscussionModal>({
    visible: false,
    setPost,
    close() {
      setPostModal({ ...postModal, visible: false })
    }
  });
  const [dialog, setDialog] = useState<IDialogProps>({
    title: 'You are a guest',
    message: 'Login to be able to start a discussion',
    visible: false,
    acceptText: 'Login',
    onAccept() { navigation.navigate('Login', {}) },
    cancelText: 'cancel',
    onReject: () => setDialog({ ...dialog, visible: false })
  })
  const [loading, setLoading] = useState<boolean>(true);

  const handleFloatingButtonPress = () => {
    if (isLoggedIn) {
      setPostModal({ ...postModal, visible: true });
    } else {
      setDialog({ ...dialog, visible: true })
    }
  }

  const handleTabChange = (value: 'Square' | 'Stories') => {
    setSelectedTab(value);
  };

  useEffect(() => {
    const fetch_data = async () => {
      setLoading(true);
      try {
        const data = await get_top_news();
        if (data) {
          setNews(data?.news as NewsPost[]);
        }
      } catch (error) {

      } finally {
        setLoading(false);
      }
    }
    fetch_data();
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.title}>News</Text>
        {/* <Icons name='notifications' /> */}
      </View>
      <View style={styles.mainContent}>
        <SegmentedControl
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
        {selectedTab === 'Stories' && <Stories stories={news} loading={loading} />}
        {selectedTab === 'Square' && <Square discussions={posts} />}
      </View>
      {selectedTab === 'Square' &&
        <FloatingButton
          press={handleFloatingButtonPress}
          buttonPosition={{ bottom: 70, right: 10 }} />}
      <PostDiscussion {...postModal} />
      <Dialog {...dialog} />
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