import React, {useContext, useEffect} from 'react';

import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

// constants
import {COLOR} from '../../constants/contants'
import OpportunityList from '../OpportunityStack/OpportunityList/OpportunityList';
import {CodeTipSkelton} from '../../components/Skelton';

const Home = () => {

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View
        style={styles.headerContainer}
      >
        <OpportunityList />
      </View>
      
    </SafeAreaView >
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  headerContainer: {
    flex: 1,
  }
})