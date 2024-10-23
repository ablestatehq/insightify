import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';

// constants
import {COLOR, DIMEN} from '../../constants/constants'
import {
  SeeMore, TipCard, XPpoint, Fragment,
  CompleteProfile, OpportunityItem, ProductCard,
  ProfileForm,
} from '../../components';

import {isProfileComplete} from '../../helper/functions/functions';
import useHomeLogic from './useHomeLogic';

const renderTip = ({item, index}:{item: any, index: number}) =>
  <TipCard
    key={index}
    title={item?.title}
    description={item?.details}
    views={0}
    tagLine={item?.tags}
  />

const Home = () => {
  const {
    // context
    xp,
    user,
    isLoggedIn,
    navigation,
    recentOffers,
    products,
    codeTips,
    // consts
    profilePhoto,
    randomIndex,
    opportunityIndex,
    // state
    showCompleteProfile,
    showProfileCard,
    setShowProfileCard,
    // handlers
    toggleCompleteProfileCard,
    handleCompleteProfile
  } = useHomeLogic();
  return (
    <View style={styles.container}>
      <XPpoint number={xp} navigation={navigation} inCommunity={user && user.isMember} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product showcase section  */}
          <Fragment
            Component={ProductCard}
            onPress={() => navigation.navigate('ProductList')}
            title={'Featured Product'}
            {...products[randomIndex]}
          />
        {isLoggedIn && !isProfileComplete(user) && showCompleteProfile &&
          <CompleteProfile
          handleClose={toggleCompleteProfileCard}
          setShowProfileCard={setShowProfileCard}
          />}
        {/* Opprotunity section  */}
          <Fragment
            Component={OpportunityItem}
            opportunity={recentOffers[opportunityIndex]}
            targetIndex={opportunityIndex}
            title={"Featured Offer"}
          />

        <View style={styles.tipsView}>
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
      <ProfileForm
        visible={showProfileCard && isLoggedIn}
        handleClose={handleCompleteProfile}
        profilePhoto={profilePhoto}
        setProfilePhoto={() => {}}
      />
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
    // paddingHorizontal: 10,
    marginTop: 10,
  },
  tipsView: {
    flex: 1,
    paddingBottom: DIMEN.PADDING.LG,
    marginVertical: DIMEN.PADDING.LG,
    marginHorizontal: DIMEN.PADDING.ES
  }
})