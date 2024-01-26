import { COLOR } from '../../../constants/contants'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../helper/context/AppContext'
import OpportunityDetails from '../../../components/OpportunityDetails'
import { StyleSheet, View, ScrollView, StatusBar, Text } from 'react-native'
import { OpportunityCard, OpportunityHeader, FloatingButton, FilterCard } from '../../../components'

const OpportunityList = () => {

  const { opportunities, notifications } = useContext(AppContext);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const showFilterCard = () => {
    setShowCard(!showCard)
  }

  const handleShowModal = (title: string, desc: string, link: string) => {
    setTitle(title)
    setDescription(desc)
    setLink(link)
    setShowModal(!showModal)
  }
  const filteredOpportunities = opportunities.filter((opp) => filteredItems.includes(opp.Category));

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.WHITE} />
      {/* search section  */}
      <View style={styles.searchContainer}>
        <OpportunityHeader showFilterCard={showFilterCard} />
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
                  id={_.id}
                  key={index}
                  location={_.location}
                  createdAt={_.publishedAt}
                  type={_.Category}
                  link={_.URL}
                  title={_.Title}
                  expireDate={_.expiring}
                  description={_.Description[0].children[0].text}
                  bookmarked={_.bookmarked}
                  showModal={() => { handleShowModal(_.Title, _.Description[0].children[0].text, _.URL) }}
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
                id={_.id}
                key={index}
                location={_.location ?? "Remote"}
                createdAt={_.publishedAt}
                type={_.Category}
                link={_.URL}
                title={_.Title}
                expireDate={_.expiring}
                description={_.Description[0].children[0].text}
                bookmarked={_?.bookmarked}
                showModal={() => { handleShowModal(_.Title, _.Description[0].children[0].text, _.URL) }}
              />
            ))}
            <OpportunityDetails
              visible={showModal}
              handleVisibility={() => handleShowModal('', '', '')}
              Title={title}
              description={description}
              link={link}
            />
          </ScrollView>
        }
        <FloatingButton title='Add Opportunity' />
        {/* filter card  */}
        {showCard && <FilterCard
          handleCardVisibility={showFilterCard}
          setFilteredItems={setFilteredItems}
          filteredItems={filteredItems}
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