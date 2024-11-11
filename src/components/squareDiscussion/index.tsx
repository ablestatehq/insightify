import {StyleSheet, View} from 'react-native'
import React from 'react'
import {SquareProps} from '@src/types';
import Animated from 'react-native-reanimated';
import EmptyState from '../EmptyState';

const Index = ({ discussions }: SquareProps) => {
  const renderDiscussion = ({item, index}:{item: any, index: number}) => {
    return (
      <View key={index}></View>
    )
  }
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={discussions}
        renderItem={renderDiscussion}
        ListEmptyComponent={<EmptyState text='Discussions' />}
        contentContainerStyle={styles.scrollStyle}
      />
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollStyle: {
    flexGrow: 1,
  }
});