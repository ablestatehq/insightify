import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';

import { EmptyState, ListFooter } from '@components/index';
import TipItem from '../TipItem';

import { DIMEN } from '@constants/constants';

const { SCREENWIDTH } = DIMEN;

interface TipData {
  id: string | number;
  [key: string]: any;
}

interface CarouselProps {
  data: TipData[];
  tips: any[];
  setTips: React.Dispatch<React.SetStateAction<any>>;
  comments: any[];
  handleEndReached: () => void
}

const Index: React.FC<CarouselProps> = ({
  data =[],
  tips = [],
  setTips,
  comments = [],
  handleEndReached=() => {}
}) => {
  // render
  const renderItem: ListRenderItem<TipData> = ({ item }) => (
    <TipItem
      comments={comments}
      setTips={setTips}
      tips={tips}
      id={item?.id as number}
      title={item?.title}
      details={item?.details}
    />
  )

  // Memoized key extractor for performance
  const keyExtractor = useCallback((item: TipData) =>
    item?.id.toString(), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListEmptyComponent={<EmptyState text='No tips found' />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<ListFooter loading={false} text="No more tips" isEmpty={data.length === 0} />}
        getItemLayout={(_, index) => ({
          length: SCREENWIDTH - 30,
          offset: (SCREENWIDTH - 30) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DIMEN.PADDING.ME,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
});

export default React.memo(Index);