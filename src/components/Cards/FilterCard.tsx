import Button from '../Button';
import TagCard from './TagCard';
import { Feather } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { AppContext } from '../../helper/context/AppContext';
import React, { useContext, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, Animated, ScrollView } from 'react-native';

interface FilterCardProps {
  cardVisible?: boolean
  handleCardVisibility?: () => void
  setFilteredItems: (data: any) => void
  filteredItems: string[]
  filteredCount?: number
}

const FilterCard: React.FC<FilterCardProps> =
  ({
    cardVisible,
    handleCardVisibility,
    setFilteredItems,
    filteredItems,
    filteredCount,
  }) => {
    const { opportunities } = useContext(AppContext);
    const [opportunityCategories, setOpportunityCategories] = useState<any[]>([]);

    useEffect(() => {
      setOpportunityCategories(prevTags => {
        const updatedTags = opportunities.reduce((acc, opp) => {
          const findCategory = acc.find((cate: any) => cate.category == opp.Category);
          if (!findCategory) {
            acc.push({
              category: opp.Category,
              categoryCount: 1
            });
          } else {
            findCategory.categoryCount = findCategory.categoryCount + 1;
          }

          return acc;
        }, [...prevTags]);

        return updatedTags;
      });
    }, [opportunities]);

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
      <Modal
        transparent
        visible={cardVisible}
        animationType='slide'
        hardwareAccelerated
        onRequestClose={handlePress}
        statusBarTranslucent
      >
        <Animated.View style={[styles.modalContainer]}>
          <Animated.View style={styles.nothingContainer} />
          <View style={styles.contentStyles}>
            <View style={styles.filterHeaderStyles}>
              <Feather
                name="x"
                size={20}
                color={COLOR.B_300}
                onPress={handlePress}
              />
              <Text style={styles.filterText}>Filter your search</Text>
              <View />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {
                opportunityCategories.length > 0 ?
                  <View style={styles.tagStyles}>
                    {
                      opportunityCategories.map((_, index: number) => (
                        <TagCard
                          title={_.category}
                          key={index}
                          setActive={setFilteredItems}
                          filteredItems={filteredItems}
                          isActive={filteredItems.includes(_.category)}
                          itemCount={_.categoryCount}
                        />
                      ))
                    }
                  </View>
                  :
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'ComfortaaBold' }}>No tags available</Text>
                  </View>
              }
            </ScrollView>
            <View style={styles.filterFooter}>
              {opportunityCategories.length > 0 && <Button
                title='reset'
                btn={styles.buttonStyles}
                textStyle={styles.textStyle}
                handlePress={handleReset}

              />}
              {(filteredCount as number) > 0 &&
                <Text
                  style={{
                    fontFamily: 'ComfortaaBold',
                    fontSize: FONTSIZE.TITLE_2
                  }}
                >{`Results(${filteredCount})`}
                </Text>}
            </View>
          </View>
        </Animated.View>
      </Modal>
    )
  }

export default FilterCard

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  filterHeaderStyles: {
    gap: 25,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10
  },
  nothingContainer: {
    flex: 2,
    backgroundColor: COLOR.NEUTRAL_1,
  },
  contentStyles: {
    flex: 4,
    backgroundColor: COLOR.WHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    gap: 25,
    top: -15
  },
  filterText: {
    // flex:1,
    // textAlign: 'center',
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: 'ComfortaaBold',
    marginLeft: 20
  },
  buttonStyles: {
    backgroundColor: COLOR.ORANGE_300,
    padding: 5,
    borderRadius: 50,
    alignSelf: 'flex-start',
    width: '40%',
    paddingBottom: 10,
  },
  tagStyles: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10
  },
  textStyle: {
    color: COLOR.WHITE,
    textAlign: 'center',
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.TITLE_2,
    textTransform: 'uppercase'
  },
  filterFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})