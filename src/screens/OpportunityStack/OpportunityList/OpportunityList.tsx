import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, View, StatusBar, Text, FlatList} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {COLOR} from '../../../constants/contants';
import useFilter from '../../../helper/customHooks/useFilter';
import {AppContext} from '../../../helper/context/AppContext';
import {
  OpportunityCard,
  OpportunityHeader,
  FloatingButton,
  FilterCard,
  CategorySection,
  FormModal
} from '../../../components';

const OpportunityList = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {opportunities, notifications, user, isLoggedIn} = useContext(AppContext);
  
  const [category, setCategory] = useState<string>('All');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const [resourceId, setResourceId] = useState<number>(0);

  const showFilterCard = () => {
    setShowCard(!showCard);
  }

  const renderOpportunity = useCallback(({item, index}: {item: any, index: number}) => (
    <OpportunityCard
      opportunity={item}
      key={index}
      showReportModal={function (): void {setShowReportModal(true)}}
    />
  ), []);

  const [opps, isLoading] = useFilter(category, opportunities, filteredItems);

  // console.log(opps);
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.WHITE} />
      {/* search section  */}
      <View style={styles.searchContainer}>
        <OpportunityHeader showFilterCard={showFilterCard} />
        <CategorySection setFilteredItems={setCategory} categories={['All', 'For you', 'Saved', 'Archived']} />
      </View>
      <View style={styles.opportunityListContainer}>
        <FlatList
          data={opps}
          keyExtractor={(item, _) => item?.id.toString()}
          renderItem={renderOpportunity}
          contentContainerStyle={styles.scrolllOpp}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.noTextStylesContainer}>
              <Text style={styles.noMatcheStyle}>
                No opportunities found
              </Text>
            </View>
          )}
        />
        <FormModal
          visible={showReportModal}
          resourceId={resourceId}
          type={'Opportunity'}
          author={user?.id}
          onSubmit={() => { setShowReportModal(!showReportModal) }}
        />
      </View>

      <FloatingButton
        press={function () {
          if (isLoggedIn) {
            navigation.navigate('Share');
          } else {
            navigation.navigate('Login', { title: 'Login to share\nan Opportunity' });
          }
        }}
        buttonPosition={{
          bottom: 20,
          right: 0,
          marginRight: 10
        }}
      />
      {showCard && <FilterCard
        handleCardVisibility={showFilterCard}
        setFilteredItems={setFilteredItems}
        filteredItems={filteredItems}
        filteredCount={opps?.length}
      />}
    </View>
  );
}

export default OpportunityList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.SECONDARY_50
  },
  opportunityListContainer: {
    flex: 1,
    paddingVertical: 0.5,
  },
  scrolllOpp: {
    padding: 5,
    paddingBottom: 25
  },
  opportunityHeaderStyles: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  searchContainer: {
    paddingHorizontal: 15,
    backgroundColor: COLOR.WHITE

  },
  noMatcheStyle: {
    fontFamily: 'RalewayRegular',
    textAlign: 'center',
    textAlignVertical:'center'
  },
  noTextStylesContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1
  }
})