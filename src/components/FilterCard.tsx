import React, { useContext } from 'react'
import Button from './Button';
import TagCard from './TagCard';
import { AntDesign } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../constants/contants';
import { Modal, StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../helper/context/AppContext';

interface FilterCardProps {
  cardVisible?: boolean
  handleCardVisibility?: () => void
  setFilteredItems: (data: any) => void
  filteredItems: string[]
}

const FilterCard: React.FC<FilterCardProps> =
  ({
    cardVisible,
    handleCardVisibility,
    setFilteredItems,
    filteredItems
  }) => {
  const { opportunities } = useContext(AppContext);
  const opportunityTags = opportunities.filter((opp: any) => opp.tag);

  const handlePress = () => {
    if (handleCardVisibility) {
      handleCardVisibility()
    }
  }

  const handleReset = () => {
    if (handleCardVisibility) {
      setFilteredItems([])
      handleCardVisibility();
    }
  }
  return (
    <Modal style={styles.container} visible={cardVisible} transparent>
      <View style={styles.nothingContainer} />
      <View style={styles.contentStyles}>
        <View style={styles.filterHeaderStyles}>
          <AntDesign name="arrowleft" size={24} color="black" onPress={handlePress} />
          <Text style={styles.filterText}>Filters</Text>
          <View />
        </View>
        {/* tags  */}
        <Text>Filter to suite your needs</Text>
        {
          opportunityTags.length > 0 ?
            <View style={styles.tagStyles}>
              {
                opportunityTags.map((_, index: number) => (
                  <TagCard
                    title={_}
                    key={index}
                    setActive={setFilteredItems}
                    filteredItems={filteredItems}
                    isActive={filteredItems.includes(_)} />
                ))
              }
            </View>
            :
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontFamily:'ComfortaaBold'}}>No tags available</Text>
            </View>
        }
        {/* buttons  */}
        {opportunityTags.length > 0 && <Button
          title='reset'
          handlePress={handleReset}
        />}
      </View>
    </Modal>
  )
}

export default FilterCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterHeaderStyles: {
    gap: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nothingContainer: {
    flex: 1
  },
  contentStyles: {
    flex: 4,
    backgroundColor: COLOR.WHITE,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    elevation: 5,
    gap: 25,
  },
  filterText: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: 'ComfortaaBold'
  },
  buttonStyles: {
    flexDirection: 'row',
  },
  tagStyles: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10
  }
})