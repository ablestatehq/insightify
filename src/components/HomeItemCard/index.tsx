import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { COLOR, DIMEN, FONTSIZE } from '@constants/constants';
import { FONT_NAMES } from '@fonts';
import { Ionicons } from '@expo/vector-icons';
import { environments } from '@constants/environments';
import { OpportunityData, ProductData } from '@utils/types';

interface HomeItemProps {
  itemType: 'Innovation' | 'Offer'
  item: ProductData | OpportunityData
  press?: () => void
}
const Index = ({ itemType, item, press }: HomeItemProps) => {
  const getImage = (url: string) => ({ uri: `${environments.BASE_URL}${url}` });

  const title = itemType === 'Innovation' ?
    (item as ProductData).name :
    (item as OpportunityData).Title;

  const imageUrl = itemType === 'Innovation'
    ? (item as ProductData).media?.data[0]?.attributes?.url || ''
    : (item as OpportunityData).company_logo?.data?.attributes?.url || '';

  return (
    <ImageBackground
      style={styles.main}
      source={getImage(imageUrl)}
      resizeMethod='resize'
      resizeMode='cover'
    // resizeMode={itemType === 'Offer' ? 'contain' : 'cover'}
    >
      <View style={{
        ...styles.overlay,
        backgroundColor: imageUrl.trim() ? COLOR.NEUTRAL_2 : 'rgba(0, 0, 0, 0.01)'
      }} />
      <Text style={{
        ...styles.title_text,
        color: imageUrl.trim() ? COLOR.WHITE : COLOR.GREY_300,
      }}>{title}</Text>
      <View style={styles.featured_view}>
        <View style={styles.featured_txt_view}>
          <Text style={{
            ...styles.featured_txt,
            color: imageUrl.trim() ? COLOR.WHITE : COLOR.GREY_300,
          }}>
            Featured
          </Text>
          <Text style={{
            ...styles.prd_type_text,
            color: imageUrl.trim() ? COLOR.WHITE : COLOR.GREY_300,
          }}>{`${itemType}`}</Text>
        </View>
        {itemType === 'Innovation' &&
          <Ionicons
            name='chevron-forward'
            size={20}
            color={COLOR.WHITE}
            onPress={press}
          />
        }
      </View>
    </ImageBackground>
  );
}

export default Index;

const styles = StyleSheet.create({
  main: {
    padding: DIMEN.PADDING.LG,
    height: 220,
    justifyContent: 'space-between',
    borderRadius: DIMEN.CONSTANT.ME,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  featured_txt: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    color: COLOR.WHITE,
  },
  icon: {
    width: 20,
    height: 20,
    padding: DIMEN.PADDING.SM,
  },
  title_text: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    color: COLOR.WHITE,
  },
  featured_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featured_txt_view: {
    alignItems: 'flex-start'
  },
  prd_type_text: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.SMALL,
    lineHeight: FONTSIZE.TITLE_1 + 2,
    marginTop: -DIMEN.MARGIN.SM,
    color: COLOR.WHITE
  }
})