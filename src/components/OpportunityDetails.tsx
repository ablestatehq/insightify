import React from 'react';
//renderer 
import RenderHtml from 'react-native-render-html';
import onShare from '../utils/onShare';
import { COLOR, FONTSIZE } from '../constants/contants';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import OpenLink from '../utils/OpenLink';

interface OpportunityDetailsProps {
  visible: boolean
  handleVisibility: () => void,
  Title: string
  description: string
  link: string
  type?: string
}

const OpportunityDetails: React.FC<OpportunityDetailsProps> = (
  {
    visible,
    handleVisibility,
    Title,
    description,
    link,
    type
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
        <View style={styles.nothingContain} />
        <View style={styles.innerContainer}>
          <View style={styles.titleStyle}>
            <Ionicons name="arrow-back" size={24} color="black" onPress={handleVisibility} />
            <Text style={styles.typeStyle}>{type}</Text>
            <View />
          </View>
          {/* Title  */}
          <Text style={styles.titleText}>{Title}</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentStyle}>
              <RenderHtml
                contentWidth={100}
                source={{ html: description }}
                defaultTextProps={{style: { fontFamily:'LatoRegular', fontSize: 16}}}
                tagsStyles={{
                  h1: { fontFamily: 'ComfortaaRegular', fontSize: FONTSIZE.TITLE_1, textAlign: 'justify', paddingVertical: 5 },
                  p: { fontFamily: 'ComfortaaRegular', fontSize: FONTSIZE.TITLE_1, textAlign: 'justify', paddingVertical: 5 },
                  b: { fontWeight: 'bold' },
                  ul: { listStyleType: 'none', paddingHorizontal: 5, paddingVertical: 1, textAlign: 'justify', },
                  li: { fontFamily: 'PoppinsRegular', fontSize: FONTSIZE.TITLE_1, lineHeight: 25, letterSpacing: 1.3 },
                  strong: { fontFamily: 'PoppinsBold', fontSize: FONTSIZE.TITLE_1, fontWeight: 'bold' },
                }}
              />
              {/* <Text style={styles.descriptionStyle}>{description}</Text> */}
            </View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <Pressable style={styles.visitStyle} onPress={() => OpenLink(link)}>
              <Text style={styles.visitText}>Visit Link</Text>
              <MaterialCommunityIcons name="open-in-new" size={20} color="black" />
            </Pressable>

            <Pressable onPress={() => onShare(link)} style={styles.buttonStyle}>
              <Entypo name="share" size={15} color={COLOR.WHITE} />
              <Text style={styles.btnStyle}>Share</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.nothingContain} />
      </View>
    </Modal>
  )
}

export default OpportunityDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    backgroundColor: COLOR.NEUTRAL_3,
  },
  modal: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLOR.WHITE,
  },
  titleStyle: {
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.SECONDARY_50,
    gap: 30,
    paddingHorizontal: 10
  },
  titleText: {
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    fontFamily: 'RalewayBold',
  },
  contentStyle: {
    padding: 5,
    marginTop: 10,
    borderRadius: 2,
    paddingHorizontal: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 20,
    alignItems: 'center'
  },
  descriptionStyle: {
    textAlign: 'justify'
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY_300,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    paddingBottom: 5,
    paddingRight: 12
  },
  btnStyle: {
    textAlign: 'center',
    color: COLOR.WHITE,
    fontFamily: 'ComfortaaBold'
  },
  visitText: {
    color: COLOR.SECONDARY_300,
  },
  visitStyle: {
    flexDirection: 'row',
    gap: 10
  },
  nothingContain: {
    flex: 0.1
  },
  typeStyle: {
    textAlign: 'center',
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: 'ComfortaaBold',
  }
})