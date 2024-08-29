import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, StatusBar, FlatList, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp } from '@react-navigation/native-stack';
import {COLOR } from '../../constants/constants';
import useFilter from '../../helper/customHooks/useFilter';
import {AppContext } from '../../helper/context/AppContext';
import {OpportunityListProps } from '../../utils/types';
import {FONT_NAMES } from '../../assets/fonts/fonts';
import {
  EmptyState, FloatingButton, FormModal, CategorySection,
  FilterCard, OpportunityCard, OpportunityHeader
} from '../../components';

const OpportunityList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { opportunities, user, isLoggedIn } = useContext(AppContext);
  const route = useRoute<OpportunityListProps>();
  const { tag } = route.params;

  const [category, setCategory] = useState<string>(tag || 'Recent');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showFilterCard, setShowFilterCard] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [resourceId, setResourceId] = useState<number>(0);

  const [filteredOpportunities, isLoading] = useFilter(category, opportunities, filteredItems);

  useEffect(() => {
    setCategory(tag || 'All');
    setFilteredItems([]);
  }, [tag]);

  const toggleFilterCard = () => setShowFilterCard(!showFilterCard);

  const renderOpportunity = useCallback(
    ({item }: { item: any }) => (
      <OpportunityCard
        opportunity={item}
        showReportModal={() => setShowReportModal(true)}
      />
    ),
    []
  );

  const handleFloatingButtonPress = () => {
    const targetScreen = isLoggedIn ? 'Share' : 'Login';
    const params = isLoggedIn ? {} : { title: 'Login to share\nan Opportunity' };
    navigation.navigate(targetScreen, params);
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
          keyExtractor={(item) => item?.id.toString()}
          renderItem={renderOpportunity}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
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
        buttonPosition={{bottom: 20, right: 10}}
      />

      {/* Filter Card */}
      {showFilterCard && (
        <FilterCard
          handleCardVisibility={toggleFilterCard}
          setFilteredItems={setFilteredItems}
          filteredItems={filteredItems}
          filteredCount={filteredOpportunities.length}
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
    paddingVertical: 0.5,
  },
  scrollContent: {
    // flex: 1,
    padding: 5,
    paddingBottom: 25,
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
});
