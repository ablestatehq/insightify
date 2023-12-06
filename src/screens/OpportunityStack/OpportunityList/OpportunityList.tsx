import React, { useContext, useState } from 'react'
import { COLOR } from '../../../constants/contants'
import { AppContext } from '../../../helper/context/AppContext'
import { StyleSheet, View, ScrollView, StatusBar, Text } from 'react-native'
import { Filter, OpportunityCard, Search, FloatingButton, FilterCard } from '../../../components'


const OpportunityList = () => {

  const { opportunities } = useContext(AppContext);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showCard, setShowCard] = useState<boolean>(false);

  const showFilterCard = () => {
    setShowCard(!showCard);
  }

  const filteredOpportunities = opportunities.filter((opp) =>
    opp.tag.some((tag:string) => filteredItems.includes(tag))
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.WHITE} />
      {/* search section  */}
      <View style={styles.searchContainer}>
        <Search />
        <Filter handlePress={showFilterCard} />
      </View>

      <View style={styles.opportunityListContainer}>
        {filteredItems.length > 0 ?
          filteredOpportunities.length > 0 ?
            <ScrollView
              contentContainerStyle={styles.scrolllOpp}
              showsVerticalScrollIndicator={false}
            >
              {filteredOpportunities.map((_, index: number) => (
                <OpportunityCard
                  key={index}
                  location={_.location}
                  createdAt={_.createdAt}
                  type={_.type}
                  link={_.link}
                  title={_.title}
                  expireDate={_.expiryDate}
                  description={_.description}
                />
              ))}
            </ScrollView>
            : (
              <View style={styles.noTextStylesContainer}>
                <Text style={styles.noMatcheStyle}>We Couldn't Find Any Matches</Text>
                <Text style={styles.noMatcheStyle}>Try Adjusting Your Filters</Text>
              </View>
            )
          :
          <ScrollView
            contentContainerStyle={styles.scrolllOpp}
            showsVerticalScrollIndicator={false}
          >
            {opportunities.map((_, index: number) => (
              <OpportunityCard
                key={index}
                location={_.location}
                createdAt={_.createdAt}
                type={_.type}
                link={_.link}
                title={_.title}
                expireDate={_.expiryDate}
                description={_.description}
              />
            ))}
          </ScrollView>
        }
        <FloatingButton title='Add Opportunity' />
        {/* filter card  */}
        {showCard && <FilterCard
          handleCardVisibility={showFilterCard}
          setFilteredItems={setFilteredItems}
          filteredItems={filteredItems}
        />}
      </View>
    </View>
  )
}

export default OpportunityList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  opportunityListContainer: {
    flex: 1,
    padding: 10,
  },
  scrolllOpp: {
    padding: 5
  },
  opportunityHeaderStyles: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical:10
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  noMatcheStyle: {
    fontFamily:'ComfortaaBold'
  },
  noTextStylesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})