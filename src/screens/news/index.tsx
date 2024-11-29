import React, { useCallback, useContext, useEffect, useState } from 'react';
import * as Network from 'expo-network';
import { get_top_news } from '@api/grapiql';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import { Dialog, FloatingButton, PostDiscussion, SegmentedControl, Square, Stories } from '@src/components';
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { IDialogProps, NewsPost, PostDiscussionModal, RootStackParamList, Tab } from '@src/types';
import { StyleSheet, Text, View, AppState, AppStateStatus } from 'react-native';
import { usePosts } from '@src/hooks';
import { AppContext } from '@src/context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Index = () => {
  // Hooks 
  const { posts, setPost } = usePosts();
  const { isLoggedIn } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // State
  const [selectedTab, setSelectedTab] = useState<Tab>('Square');
  const [news, setNews] = useState<NewsPost[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [postModal, setPostModal] = useState<PostDiscussionModal>({
    visible: false,
    setPost,
    close() {
      setPostModal(prev => ({ ...prev, visible: false }));
    }
  });
  const [dialog, setDialog] = useState<IDialogProps>({
    title: 'You are a guest',
    message: 'Login to be able to start a discussion',
    visible: false,
    acceptText: 'Login',
    onAccept() { navigation.navigate('Login', {}) },
    cancelText: 'Cancel',
    onReject: () => setDialog(prev => ({ ...prev, visible: false }))
  });

  // Memoized fetch data function
  const fetchData = useCallback(async () => {
    if (!isOnline) return;

    setLoading(true);
    try {
      const data = await get_top_news();
      if (data?.news) {
        setNews(data.news as NewsPost[]);
      }
    } catch (error) {
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [isOnline]);

  // Check network state
  const checkNetworkState = useCallback(async () => {
    try {
      const state = await Network.getNetworkStateAsync();
      const newOnlineStatus = !!state.isConnected;

      // Only refetch if online status changes from offline to online
      if (!isOnline && newOnlineStatus) {
        fetchData();
      }

      setIsOnline(newOnlineStatus);
    } catch (error) {
      console.error('Network state check failed:', error);
      setIsOnline(false);
    }
  }, [isOnline, fetchData]);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkNetworkState();
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    checkNetworkState();

    return () => {
      appStateSubscription.remove();
    };
  }, [checkNetworkState]);

  // Handlers
  const handleFloatingButtonPress = () => {
    if (isLoggedIn) {
      setPostModal(prev => ({ ...prev, visible: true }));
    } else {
      setDialog(prev => ({ ...prev, visible: true }));
    }
  };

  const handleTabChange = (value: 'Square' | 'Stories') => {
    setSelectedTab(value);
  };

  // fetch initial data when component mounts and online
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.title}>News</Text>
      </View>
      <View style={styles.mainContent}>
        <SegmentedControl
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
        {selectedTab === 'Stories' && (
          <Stories
            stories={news}
            loading={loading}
            onRefresh={fetchData}
          />
        )}
        {selectedTab === 'Square' && <Square discussions={posts} />}
      </View>
      {selectedTab === 'Square' && (
        <FloatingButton
          press={handleFloatingButtonPress}
          buttonPosition={{ bottom: 70, right: 10 }}
        />
      )}
      <PostDiscussion {...postModal} />
      <Dialog {...dialog} />
    </View>
  );
};

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
  },
  offlineIndicator: {
    color: COLOR.DANGER,
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL
  }
});