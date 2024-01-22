import React from 'react'
import Button from './Button';
import onShare from '../utils/onShare';
import OpenLink from '../utils/OpenLink';
import { COLOR } from '../constants/contants'
import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons';
import { Modal, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'

interface OpportunityDetailsProps{
  visible: boolean
  handleVisibility: () => void,
  Title: string
  description: string
  link: string
}
const OpportunityDetails: React.FC<OpportunityDetailsProps> = (
  {
    visible,
    handleVisibility,
    Title,
    description,
    link
  }
) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={handleVisibility}
    >
      <View style={styles.container}>
        {/* <View style={styles.nothingContain} /> */}
        <View style={styles.innerContainer}>
          <View style={styles.titleStyle}>
            <Ionicons name="arrow-back" size={24} color="black" onPress={handleVisibility}/>
            <Text style={styles.titleText}>{Title}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentStyle}>
              <Text style={styles.descriptionStyle}>{description}</Text>
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            {/* <Text>Footer</Text> */}
          </View>

          <Pressable onPress={() => onShare(link)} style={styles.buttonStyle}>
            <Entypo name="share" size={15} color={COLOR.WHITE} />
            <Text style={styles.btnStyle}>Share</Text>
          </Pressable>
          {/* <Button title='DETAIL' textStyle={styles.btnStyle} btn={styles.buttonStyle} handlePress={() => OpenLink(link)}/> */}
        </View>
      </View>
    </Modal>
  )
}

export default OpportunityDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.NEUTRAL_1,
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    borderWidth:10
  },
  modal: {
    flex: 1,
  },
  innerContainer: {
    flex:1,
    backgroundColor: COLOR.WHITE,
    padding:10,
    borderRadius:10,
  },
  titleStyle: {
    flexDirection: 'row',
    alignItems:'center'
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'RalewayBold',
    marginHorizontal:10
  },
  contentStyle: {
    borderRadius: 2,
    borderWidth: 0.1,
    marginTop: 50,
    padding: 5,
  },
  modalFooter: {
    
  },
  descriptionStyle: {
    fontFamily:'ComfortaaSemiBold'
  },
  buttonStyle: {
    paddingVertical: 5,
    backgroundColor: COLOR.ORANGE_300,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:10
  },
  btnStyle: {
    textAlign: 'center',
    color: COLOR.WHITE,
    fontFamily:'ComfortaaBold'
  }
})