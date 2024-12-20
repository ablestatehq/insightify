<<<<<<< HEAD:src/screens/Offers/index.tsx
import React, {useCallback, useContext, useState} from 'react';
import {View, StatusBar, FlatList, StyleSheet, RefreshControl, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLOR, DIMEN} from '@constants/constants';
import {useFilter} from '@src/hooks';
import {AppContext} from '@src/context/AppContext';
import {OpportunityData, OpportunityListProps, RootStackParamList} from '@src/types';
import {FONT_NAMES} from '@fonts';
import {
  EmptyState, FloatingButton, FormModal, CategorySection,
  FilterCard, OpportunityCard, OpportunityHeader
} from '@components/index';
import { fetchNewItems, fetchNextBatch } from '@api/grapiql';
=======
import React, { useCallback, useContext, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StatusBar, FlatList, StyleSheet, RefreshControl } from 'react-native';

// constants
import { COLOR } from '@constants/constants';
import { useFilter } from '@src/hooks';
import { OpportunityData, OpportunityListProps, RootStackParamList } from '@src/types';
import { FONT_NAMES } from '@fonts';

// components
import {
  EmptyState, FloatingButton, FormModal, CategorySection,
  FilterCard, OpportunityHeader,
  ListFooter
} from '@src/components';
import OpportunityItemCard from '../components/OpportunityItemCard';
>>>>>>> new-structure:src/screens/Offers/Offer/index.tsx

// data and contexts
import { fetchNewItems } from '@api/grapiql';
import { AppContext } from '@src/context/AppContext';

const OpportunityList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
<<<<<<< HEAD:src/screens/Offers/index.tsx
  const { opportunities, user, isLoggedIn, setOpportunities, hasMoreOffers, setHasMoreOffers} = useContext(AppContext);
=======
  const { opportunities, user, isLoggedIn, setOpportunities, fetchAdditionalData} = useContext(AppContext);
>>>>>>> new-structure:src/screens/Offers/Offer/index.tsx
  const route = useRoute<OpportunityListProps>();
  const { tag } = route.params;
  const [category, setCategory] = useState<string>(tag ?? 'Recent');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showFilterCard, setShowFilterCard] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [resourceId, setResourceId] = useState<number>(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      const newOpps = await fetchNewItems('opportunities');
<<<<<<< HEAD:src/screens/Offers/index.tsx
      const updatedOpps = [...new Set([...newOpps, ...opportunities])];
      setOpportunities(updatedOpps);
=======
      setOpportunities(prev => {
        const existingIds = prev.map((item) => item.id);
        const new_opps = newOpps.filter((item: OpportunityData) => !existingIds.includes(item.id));
        return [...new_opps, ...prev];
      });
>>>>>>> new-structure:src/screens/Offers/Offer/index.tsx
    } catch (error) {
      console.error("Error refreshing opportunities:", error);
    } finally {
      setRefreshing(false);
    }
<<<<<<< HEAD:src/screens/Offers/index.tsx
  }, [opportunities]);
  
  const [filteredOpportunities, isLoading] =
    useFilter(category, opportunities, filteredItems);
=======
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  // filter data called when opportunities change or when category or filteredItems change
  const offers =
    useCallback(() =>
      useFilter(category, opportunities, filteredItems),
      [opportunities, category, filteredItems]);
  
  // call and set filtered data
  const [filteredOpportunities, isLoading] = offers();
>>>>>>> new-structure:src/screens/Offers/Offer/index.tsx

  const toggleFilterCard = () => {
    setShowFilterCard(!showFilterCard);
  };

<<<<<<< HEAD:src/screens/Offers/index.tsx

  const loadMoreOpportunities = useCallback(async () => {
    // console.log('More offers: ',hasMoreOffers);
    if (loading || !hasMoreOffers) return;
    try {
      setLoading(true);
      // console.log('Batch-',opportunities.length)
      const newOpportunities = await fetchNextBatch('opportunities', opportunities.length);
      if (newOpportunities.data) {
        const newArr = [...new Set([...opportunities, ...newOpportunities.data])];
        setOpportunities(newArr);
        setHasMoreOffers(newOpportunities.hasMore);
      }
    } catch (error) {
      // console.error("Error loading more opportunities:", error);
    } finally {
      setLoading(false);
    }
  }, [hasMoreOffers]);

  const renderOpportunity = useCallback(({ item, index }: { item: OpportunityData, index: number }) => (
    <OpportunityCard
      {...item}
      // key={`${item.id}-${index}`}
      showModal={() => { }}
      showReportModal={() => setShowReportModal(true)} />
  ), []);
=======
  // handle end of list
  const handleEndReached = useCallback(async () => {
    setLoading(true);
    try {
      await fetchAdditionalData('opportunities', opportunities.length);
      
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  }, [opportunities.length]);
  const renderOpportunity =
    ({ item, index }: { item: OpportunityData, index: number }) => (
      <OpportunityItemCard
        {...item}
        key={item.id}
        showModal={() => { }}
        showReportModal={() => setShowReportModal(true)} />
    );
>>>>>>> new-structure:src/screens/Offers/Offer/index.tsx

  const handleFloatingButtonPress = useCallback(() => {
    if (isLoggedIn) {
      navigation.navigate('Share');
    } else {
      const params = {title: 'Offers'};
      navigation.navigate('Login', params);
    }
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{paddingBottom: 30}} size="small" color={COLOR.PRIMARY_300} />;
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.WHITE} />
      {/* Search and Category Section */}
      <View style={styles.searchContainer}>
        <OpportunityHeader showFilterCard={toggleFilterCard} />
        <CategorySection
          initialCategory={category}
          setFilteredItems={setCategory}
          categories={['Recent', 'For you', 'Saved', 'All']}
        />
      </View>

      {/* Opportunity List */}
      <View style={styles.opportunityListContainer}>
        <FlatList
          data={filteredOpportunities}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderOpportunity}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
<<<<<<< HEAD:src/screens/Offers/index.tsx
          ListEmptyComponent={<EmptyState />}
          ListFooterComponent={renderFooter}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          onEndReached={loadMoreOpportunities}
          onEndReachedThreshold={0.5}
          removeClippedSubviews
=======
          ListEmptyComponent={<EmptyState text='No opportunities found'/>}
          ListFooterComponent={<ListFooter
            loading={loading}
            text='No more opportunities'
            isEmpty={filteredOpportunities.length === 0}
          />}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
>>>>>>> new-structure:src/screens/Offers/Offer/index.tsx
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLOR.PRIMARY_300]}
            />
          }
        />

        <FormModal
          visible={showReportModal}
          resourceId={resourceId}
          type="Opportunity"
          author={user?.id}
          onSubmit={() => setShowReportModal(false)}
        />
      </View>

      {/* Floating Button */}
      <FloatingButton
        press={handleFloatingButtonPress}
        buttonPosition={{ bottom: 70, right: 10 }}
      />

      {/* Filter Card */}
      {showFilterCard && (
        <FilterCard
          handleCardVisibility={toggleFilterCard}
          setFilteredItems={setFilteredItems}
          filteredItems={filteredItems}
          filteredCount={filteredOpportunities?.length}
        />
      )}
    </View>
  );
};

export default OpportunityList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY_50,
  },
  searchContainer: {
    paddingHorizontal: 15,
    backgroundColor: COLOR.WHITE,
  },
  opportunityListContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
<<<<<<< HEAD:src/screens/Offers/index.tsx
    paddingBottom: DIMEN.PADDING.ELG,
=======
    paddingBottom: 50,
>>>>>>> new-structure:src/screens/Offers/Offer/index.tsx
  },
  noTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMatchText: {
    fontFamily: FONT_NAMES.Body,
    textAlign: 'center',
  },
  list_footer: {
    height: 200,
  }
});
