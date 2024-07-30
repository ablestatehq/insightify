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
import {CompleteProfile, OpportunityItem, ProductCard, SeeMore, TipCard, XPpoint, Fragment} from '../../components';
import {AppContext} from '../../helper/context/AppContext';
import {ProductData, RootStackParamList} from '../../utils/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { isProfileComplete } from '../../helper/functions/functions';

const renderTip = ({item, index}:{item: any, index: number}) =>
  <TipCard
    key={index}
    title={item?.title}
    description={item?.details}
    views={0}
    tagLine={item?.tags}
  />

const Home = () => {
  const {opportunities, codeTips, isLoggedIn, user} = useContext(AppContext);
  const opportunityIndex = Math.floor(Math.random() * ((opportunities.length - 1) - 0 + 1)) + 0;
  const [showCompleteProfile, setShowCompleteProfile] = useState(true);
  const [product, setProduct] = useState<ProductData>({
    verified: false,
    name: 'Insightify',
    developer: 'Ablestate',
    description: `Insightify is mobile application designed to empower individuals in the field of technology. It offers a wealth of resources aimed at helping users realize their full potential in the dynamic world of coding and development. Through informative hints, hands-onopportunities, and curated learning paths, Insightify enables developers of all skill levels to flourish and grow.`, 
    image: 'undefined',
    demo: 'string',
    views: 0,
    tagLine: ['react-native', 'strapi.js', 'express.js'],
  });

  // Call this function to start monitoring network changes
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <XPpoint number={5} />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* Product showcase section  */}
        <Fragment
          Component={ProductCard}
          onPress={() => navigation.navigate('ProductList')}
          title={'Featured Product'}
          {...product}
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
            keyExtractor={(item, index) => item?.id.toString()}
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