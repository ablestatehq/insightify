import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import {EmptyState} from '@components/index';
import TipItem from '../TipItem'

import {FONT_NAMES} from '@fonts';
import {COLOR, DIMEN, FONTSIZE} from '@constants/constants';

const {SCREENWIDTH} = DIMEN;

interface CorouselProps {
  data: any[],
  tips: any[],
  setTips: React.Dispatch<React.SetStateAction<any>>;
  comments: any[],
}


function Index({data, tips, setTips, comments}: CorouselProps) {
  const renderTtem = ({item}: {item: any}) => (
    <TipItem
      {...item}
      comments={comments}
      setTips={setTips}
      tips={tips}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={renderTtem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListEmptyComponent={<EmptyState />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DIMEN.PADDING.ME,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  navText: {
    fontSize: 20,
  },
  currentIndex: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  codeTipsContainer: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY_50,
  },
  renderItemView: {
    width: SCREENWIDTH - 30,
    margin: 5,
    elevation: 0.5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  tipContent: {
    lineHeight: 30,
    color: COLOR.SECONDARY_300,
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.HEADING_5,
  },
  heading: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    // paddingBottom: DIMEN.PADDING.ME,
    // flex: 1,
    flexGrow: 1,
  },
});

export default Index;