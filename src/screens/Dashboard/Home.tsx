import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';

// constants
import { COLOR, DIMEN } from '@constants/constants'
import {
  XPpoint,
  Fragment,
  TipCard,
  SeeMore,
  EmptyState,
} from '@src/components';
import HomeItem from './components/HomeItemCard'
import CompleteProfile from './components/CompleteProfile';
import ProfileForm from '../profile/components/ProfileForm';

import { isProfileComplete } from '@src/helper/functions';
import useHomeLogic from './hooks/useHomeLogic';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONT_NAMES } from '@fonts';


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
    handleCompleteProfile,
    setCodeTips,
    opportunities,
  } = useHomeLogic();

  return (
    <SafeAreaView style={styles.container}>
      {products.length > 0 && opportunities.length > 0 ? (
        <>
          <XPpoint number={xp} navigation={navigation} inCommunity={user && user.isMember} />
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* Product showcase section  */}
            <SeeMore title={''} text='products' onPress={() => navigation.navigate('ProductList')} />
            <Fragment
              Component={HomeItem}
              onPress={() => navigation.navigate('AddProduct')}
              btn_text={'Publish Innovation'}
              btn_style={styles.p_btn_style}
              text_style={styles.btn_text_style}
              itemType='Innovation'
              item={products[randomIndex]}
              press={() => navigation.navigate('ProductDetail', { ...products[randomIndex] })}
            />
            {isLoggedIn && !isProfileComplete(user) && showCompleteProfile &&
              <CompleteProfile
                handleClose={toggleCompleteProfileCard}
                setShowProfileCard={setShowProfileCard}
              />}
            {/* Opprotunity section  */}
            <Fragment
              Component={HomeItem}
              onPress={() => navigation.navigate('Offers', {})}
              itemType={'Offer'}
              item={recentOffers[opportunityIndex]}
              btn_text={'See all'}
              btn_style={styles.o_btn_style}
              text_style={styles.btn_text_style}
              press={() => navigation.navigate('Offers', {})}
            />
            {/*Tech tips section */}
            <View style={styles.tipsView}>
              {codeTips.slice(0, 2).map((item, index) => (
                <TipCard
                  key={index}
                  {...item}
                  setTips={setCodeTips}
                  tips={codeTips}
                />
              ))}
            </View>
          </ScrollView>
        </>
      ):(
          <View style={styles.emptyState}>
            <EmptyState text='Check your internet and try again'/>
        </View>
      )}
      <ProfileForm
        visible={showProfileCard && isLoggedIn}
        handleClose={handleCompleteProfile}
        profilePhoto={profilePhoto}
        setProfilePhoto={() => { }}
      />
      <StatusBar backgroundColor={COLOR.WHITE} barStyle='dark-content' />
    </SafeAreaView >
  );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingHorizontal: DIMEN.PADDING.ME,
    paddingVertical: DIMEN.PADDING.SM,
  },
  headerContainer: {
    flex: 1,
  },
  tipsView: {
    flex: 1,
    paddingBottom: DIMEN.PADDING.LG,
    marginVertical: DIMEN.PADDING.LG,
    marginHorizontal: DIMEN.PADDING.ES
  },
  p_btn_style: {
    borderRadius: DIMEN.CONSTANT.XSM,
    borderWidth: 1,
    paddingVertical: DIMEN.PADDING.SM,
    alignItems: 'center',
    marginTop: DIMEN.MARGIN.SM,
  },
  o_btn_style: {
    width: 90,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: DIMEN.MARGIN.SM,
    paddingVertical: DIMEN.PADDING.SM,
    borderRadius: DIMEN.CONSTANT.XSM,
  },
  btn_text_style: {
    fontFamily: FONT_NAMES.Title,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})