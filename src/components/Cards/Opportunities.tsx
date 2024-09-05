import React, {SetStateAction} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import OpportunityItemCard from './OpportunityItemCard'

interface OpportunitiesProps{
  data: any[],
  category: string
  filter_:string[]
  handleShowModal: (Title: any, Description: any, URL: any, Category: any) => void
  showReportModal: () => void
  setFilteredCount: React.Dispatch<SetStateAction<number>>
}

const Opportunities:React.FC<OpportunitiesProps> = ({data, category, filter_, handleShowModal, showReportModal}) => {
  
  const filteredOpportunities = category == 'All'
    ? data.filter((opp) => filter_.includes(opp.Category))
    : category == 'Watching'
      ? data.filter((opp) => opp.bookmarked == true).filter((opp_) => filter_.includes(opp_.Category))
      : data.filter((opp) => filter_.includes(opp.Category));
  
  return (
    <View style={styles.container}>
      <FlatList
        data={filter_.length > 0 ? filteredOpportunities : data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <OpportunityItemCard
            id={item.id}
            key={index}
            location={item.location ?? "Remote"}
            createdAt={item.publishedAt}
            type={item.Category}
            link={item.URL}
            title={item.Title}
            expireDate={item.expiring}
            bookmarked={item?.bookmarked}
            description={item.Description}
            showModal={() => { handleShowModal(item.Title, item.Description, item.URL, item.Category) }}
            showReportModal={showReportModal}
          />
        )}
        contentContainerStyle={styles.scrolllOpp}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.noTextStylesContainer}>
            <Text style={styles.noMatcheStyle}>
              {filter_.length == 0 ? `${category === 'All'
                ? "We Couldn't Find Any Matches"
                : category === 'Saved'
                  ? "No saved opportunities"
                  : "You have not been invited or recommended for Opportunities"}`
                : 'We Couldn\'t Find Any Matches\nTry adjusting your search'
              }
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default React.memo(Opportunities)

const styles = StyleSheet.create({
  container: {},
  scrolllOpp: {},
  noTextStylesContainer: {},
  noMatcheStyle:{}
})

function useState<T>(arg0: never[]): [any, any] {
  throw new Error('Function not implemented.')
}
{/* <View style={styles.opportunityListContainer}>
        {filteredItems.length > 0 ?
          filteredOpportunities?.length ?
            <ScrollView
              contentContainerStyle={styles.scrolllOpp}
              showsVerticalScrollIndicator={false}
            >
              {filteredOpportunities?.map((_: any, index: number) => (
                <OpportunityCard
                  id={_.id}
                  key={index}
                  location={_.location}
                  createdAt={_.publishedAt}
                  type={_.Category}
                  link={_.URL}
                  title={_.Title}
                  expireDate={_.expiring}
                  bookmarked={_.bookmarked}
                  description={_.Description}
                  showModal={() => { handleShowModal(_.Title, _.Description, _.URL); }}
                  showReportModal={function (): void { setShowReportModal(true) }}
                />
              ))}
            </ScrollView>
            : (
              <View style={styles.noTextStylesContainer}>
                <Text style={styles.noMatcheStyle}>We Couldn't Find Any Matches</Text>
                <Text style={styles.noMatcheStyle}>Try adjusting your search</Text>
              </View>
            )
          :
          <ScrollView
            contentContainerStyle={styles.scrolllOpp}
            showsVerticalScrollIndicator={false}
          >
            {category == 'All' ?
              opportunities.map((_, index: number) => (
                <OpportunityCard
                  id={_.id}
                  key={index}
                  location={_.location ?? "Remote"}
                  createdAt={_.publishedAt}
                  type={_.Category}
                  link={_.URL}
                  title={_.Title}
                  expireDate={_.expiring}
                  description={_.Description}
                  bookmarked={_?.bookmarked}
                  showModal={() => { handleShowModal(_.Title, _.Description, _.URL, _.Category); }}
                  showReportModal={function (): void { setShowReportModal(true) }}
                />
              ))
              : category == 'Saved' ?
                (
                  opportunities.filter((opp: any) => opp.bookmarked == true).length > 0
                    ?
                    opportunities.filter((opp: any) => opp.bookmarked == true)
                      .map((_, index: number) => (
                        <OpportunityCard
                          id={_.id}
                          key={index}
                          location={_.location ?? "Remote"}
                          createdAt={_.publishedAt}
                          type={_.Category}
                          link={_.URL}
                          title={_.Title}
                          expireDate={_.expiring}
                          description={_.Description}
                          bookmarked={_?.bookmarked}
                          showModal={() => { handleShowModal(_.Title, _.Description, _.URL, _.Category); }}
                          showReportModal={function (): void { setShowReportModal(true) }}
                        />
                      ))
                    :
                    <View style={styles.noTextStylesContainer}>
                      <Text style={styles.noMatcheStyle}>No saved opportunities</Text>
                    </View>
                )
                :
                <View style={styles.noTextStylesContainer}>
                  <Text style={styles.noMatcheStyle}>You have not been invited or recommended for Opportunities</Text>
                </View>
            }
            <OpportunityDetails
              visible={showModal}
              handleVisibility={() => handleShowModal('', '', '')}
              Title={title}
              description={description}
              link={link}
              type={oppType}
            />
            <FormModal
              visible={showReportModal}
              resourceId={resourceId}
              type={'Opportunity'}
              author={user?.id}
              onSubmit={() => { setShowReportModal(!showReportModal) }}
            />
          </ScrollView>
        }
        
</View> */}