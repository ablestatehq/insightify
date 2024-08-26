import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';

// constants
import {COLOR} from '../../constants/constants'
import {
  SeeMore, TipCard, XPpoint, Fragment,
  CompleteProfile, OpportunityItem, ProductCard,
} from '../../components';

import {AppContext} from '../../helper/context/AppContext';
import {RootStackParamList} from '../../utils/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {isProfileComplete} from '../../helper/functions/functions';

const renderTip = ({item, index}:{item: any, index: number}) =>
  <TipCard
    key={index}
    title={item?.title}
    description={item?.details}
    views={0}
    tagLine={item?.tags}
  />

const Home = () => {
  const {opportunities, codeTips, isLoggedIn, user, products, xp} = useContext(AppContext);

  const opportunityIndex = Math.floor(Math.random() * ((opportunities.length - 1) - 0 + 1)) + 0;
  const [showCompleteProfile, setShowCompleteProfile] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  return (
    <View style={styles.container}>
      <XPpoint number={xp} />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* Product showcase section  */}
        <Fragment
          Component={ProductCard}
          onPress={() => navigation.navigate('ProductList')}
          title={'Featured Product'}
          {...products[0]}
        />
        {isLoggedIn && !isProfileComplete(user) && showCompleteProfile &&
          <CompleteProfile handleClose={() => {setShowCompleteProfile(false)}} />}
        {/* Opprotunity section  */}
        <Fragment
          Component={OpportunityItem}
          onPress={() => navigation.navigate('Explore', {})}
          opportunity={opportunities[opportunityIndex]}
          targetIndex={opportunityIndex}
          title={"Featured Opportunities"}
        />

        <View style={{flex: 1}}>
          <View style={styles.techTipStyle}>
            <SeeMore title='Tech tips' />
          </View>
          {/*Tech tips section */}
          <FlatList
            data={codeTips.slice(0, 3)}
            renderItem={renderTip}
            keyExtractor={(item) => item?.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={COLOR.WHITE} barStyle='dark-content'/>
    </View >
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
  },
  techTipStyle: {
    paddingHorizontal: 10,
    marginTop: 10,
  }
})