import React, { useCallback, useContext, useState } from 'react';
import { View, StatusBar, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLOR } from '@constants/constants';
import {useFilter} from '@src/hooks';
import { AppContext } from '@src/context/AppContext';
import {OpportunityListProps, RootStackParamList} from '@src/types';
import { FONT_NAMES } from '@fonts';
import {
  EmptyState, FloatingButton, FormModal, CategorySection,
  FilterCard, OpportunityCard, OpportunityHeader
} from '@components/index';


const OpportunityList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { opportunities, user, isLoggedIn } = useContext(AppContext);
  const route = useRoute<OpportunityListProps>();
  const { tag } = route.params;
  const [category, setCategory] = useState<string>(tag ?? 'Recent');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showFilterCard, setShowFilterCard] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [resourceId, setResourceId] = useState<number>(0);

  const [filteredOpportunities, isLoading] =
    useFilter(category, opportunities, filteredItems);

  const toggleFilterCard = () => {
    setShowFilterCard(!showFilterCard);
  };

  const renderOpportunity =
    ({ item }: { item: any }) => (
      <OpportunityCard
        {...item}
        showReportModal={() => setShowReportModal(true)}
      />
    );

  const handleFloatingButtonPress = useCallback(() => {
    if (isLoggedIn) {
      navigation.navigate('Share');
    } else {
      const params = { title: 'Offers' };
      navigation.navigate('Login', params);
    }
  }, []);

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
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
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
        buttonPosition={{ bottom: 20, right: 10 }}
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
    paddingVertical: 0.5,
  },
  scrollContent: {
    flexGrow: 1,
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
