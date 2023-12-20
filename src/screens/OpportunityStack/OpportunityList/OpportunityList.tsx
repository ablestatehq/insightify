import { COLOR } from '../../../constants/contants'
import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../../helper/context/AppContext'
import { StyleSheet, View, ScrollView, StatusBar, Text, Animated } from 'react-native'
import { OpportunityCard, OpportunityHeader, FloatingButton, FilterCard } from '../../../components'


const OpportunityList = () => {

  const { opportunities, notifications } = useContext(AppContext);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showCard, setShowCard] = useState<boolean>(false);

  const scaleValue = useRef(new Animated.Value(0)).current;

  const showFilterCard = () => {
    setShowCard(!showCard)
  }

  // const filteredOpportunities = opportunities.filter((opp) =>
  //   opp.Category.some((category: string) => filteredItems.includes(category.toLowerCase()))
  // );

  const filteredOpportunities = opportunities.filter((opp) => filteredItems.includes(opp.Category));
    
  console.log(notifications)
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.WHITE} />
      {/* search section  */}
      <View style={styles.searchContainer}>
        <OpportunityHeader
          showFilterCard={showFilterCard}
        />
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
                  id={_.$id}
                  key={index}
                  location={_.location}
                  createdAt={_.publishedAt}
                  type={_.Category}
                  link={_.URL}
                  title={_.Title}
                  expireDate={_.expiring}
                  description={_.Description[0].children[0].text}
                  bookmarked={_.bookmarked}
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
                id={_.$id}
                key={index}
                location={_.location}
                createdAt={_.publishedAt}
                type={_.Category}
                link={_.URL}
                title={_.Title}
                expireDate={_.expiring}
                description={_.Description[0].children[0].text}
                bookmarked={_.bookmarked}
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
          scaleValue={scaleValue}
          filteredCount={filteredOpportunities.length}
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
    padding: 5,
    paddingBottom: 25
  },
  opportunityHeaderStyles: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  noMatcheStyle: {
    fontFamily: 'ComfortaaBold'
  },
  noTextStylesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})