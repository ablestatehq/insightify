import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { SegmentedControlProps } from '@src/types';
import { COLOR, DIMEN } from '@src/constants/constants';
import { Tab } from '@src/types/news';

const TABS: Tab[] = ['Square', 'Stories'];

const Index = ({ selectedTab, onTabChange }: SegmentedControlProps) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab: Tab, _: number) => (
        <Pressable style={{
          ...styles.pressable,
        }}
          onPress={() => onTabChange(tab)}
        >
          <Text style={{
            ...styles.text,
            color: selectedTab === tab ? COLOR.PRIMARY_300 : COLOR.SECONDARY_300,
            borderBottomWidth: selectedTab === tab ? 4 : 0,
            borderBottomColor: selectedTab === tab ? COLOR.PRIMARY_300 : ''
          }}>{tab}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 5,
  },
  pressable: {
    flex: 1,
    alignItems: 'center',
    // alignItems: 'flex-start',
    padding: DIMEN.PADDING.ES,
  },
  text: {
    textAlign: 'center',
    lineHeight: 25,
  }
})