import Button from './Button';
import TagCard from './TagCard';
import { Entypo } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../constants/contants';
import { AppContext } from '../helper/context/AppContext';
import { Modal, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

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
    const [opportunityTags, setOpportunityTags] = useState<string[]>([]);
    // load tags 
    useEffect(() => {
      setOpportunityTags(prevTags => {
        const updatedTags = opportunities.reduce((acc, opp) => {
          opp.tag.forEach((tag:string) => {
            if (!acc.includes(tag.toLowerCase())) {
              acc.push(tag.toLowerCase());
            }
          });
          return acc;
        }, [...prevTags]);

        updatedTags.sort((a:string, b:string) => a.length - b.length);

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
      <Modal style={styles.container} visible={cardVisible} transparent>
        <View style={styles.nothingContainer} />
        <View style={styles.contentStyles}>
          <View style={styles.filterHeaderStyles}>
            <Entypo
              name="chevron-thin-down"
              size={20}
              color={COLOR.B_300}
              onPress={handlePress}
            />
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
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'ComfortaaBold' }}>No tags available</Text>
              </View>
          }
          {/* buttons  */}
          {opportunityTags.length > 0 && <Button
            btn={styles.buttonStyles}
            textStyle={styles.textStyle}
            title='reset'
            handlePress={handleReset}
            
          />}
        </View>
        <StatusBar backgroundColor={COLOR.NEUTRAL_1} translucent />
      </Modal>
    )
  }

export default FilterCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR.WHITE
  },
  filterHeaderStyles: {
    gap: 25,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nothingContainer: {
    flex: 1,
    backgroundColor: COLOR.NEUTRAL_1,
  },
  contentStyles: {
    flex: 4,
    backgroundColor: COLOR.WHITE,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    // elevation: 5,
    gap: 25,
    top:-15
  },
  filterText: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: 'ComfortaaBold'
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
    textTransform:'uppercase'
  }
})