import Button from './Button';
import TagCard from './TagCard';
import { Entypo } from '@expo/vector-icons';
import { COLOR, FONTSIZE } from '../constants/contants';
import { AppContext } from '../helper/context/AppContext';
import React, { useContext, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, View, Animated } from 'react-native';

interface FilterCardProps {
  cardVisible?: boolean
  handleCardVisibility?: () => void
  setFilteredItems: (data: any) => void
  filteredItems: string[]
  scaleValue?: Animated.Value
  filteredCount?: number
}

const FilterCard: React.FC<FilterCardProps> =
  ({
    cardVisible,
    handleCardVisibility,
    setFilteredItems,
    filteredItems,
    scaleValue,
    filteredCount
  }) => {
    const { opportunities } = useContext(AppContext);
    const [opportunityTags, setOpportunityTags] = useState<any[]>([]);

    useEffect(() => {
      setOpportunityTags(prevTags => {
        const updatedTags = opportunities.reduce((acc, opp) => {
          opp.tag.forEach((tag: string) => {
            const findTag = acc.find((tagObject: any) => tagObject.tag == tag);
            if (!findTag) {
              acc.push({
                tag: tag.toLowerCase(),
                tagCount: 1
              });
            } else {
              findTag.tagCount = findTag.tagCount + 1
            }
          });
          return acc;
        }, [...prevTags]);

        updatedTags.sort((a: any, b: any) => a?.tag.length - b?.tag.length);

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
        <Animated.View style={
          [styles.modalContainer,
            // {transform: [{scale: scaleValue as Animated.Value}]}
          ]}>
          <Animated.View style={styles.nothingContainer} />
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
            <Text>Filter to suite your needs</Text>
            {
              opportunityTags.length > 0 ?
                <View style={styles.tagStyles}>
                  {
                    opportunityTags.map((_, index: number) => (
                      <TagCard
                        title={_.tag}
                        key={index}
                        setActive={setFilteredItems}
                        filteredItems={filteredItems}
                        isActive={filteredItems.includes(_.tag)}
                        itemCount={_.tagCount}
                      />
                    ))
                  }
                </View>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'ComfortaaBold' }}>No tags available</Text>
                </View>
            }
            <View style={styles.filterFooter}>
              {opportunityTags.length > 0 && <Button
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
    gap: 25,
    top: -15
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
    textTransform: 'uppercase'
  },
  filterFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})