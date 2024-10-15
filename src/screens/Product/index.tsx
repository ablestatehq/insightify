import React from 'react';

import awardXP from '../../utils/awardXP';
import {Ionicons} from '@expo/vector-icons';
import {RootStackParamList} from '../../utils/types'
import {environments} from '../../constants/environments';
import {COLOR, DIMEN, FONTSIZE} from '../../constants/constants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ImageBackground} from 'react-native'
import {FONT_NAMES} from '../../assets/fonts/fonts';
import {AppContext} from '../../helper/context/AppContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const {BASE_URL} = environments;
const AWARD = {
  'FIRST': 5,
  'SECOND': 3,
  'THIRD': 1
}

const getImage = (url: string) => ({ uri: `${BASE_URL}${url}` });

const Index = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const {description, tagline, uploadedBy, name, media, status, id, totalViews} = route.params;
  const {user, jwt, setXp} = React.useContext(AppContext);

  React.useEffect(() => {
    awardXP(AWARD, id, jwt, user?.id).then(xps => {
      if (xps) {
        setXp(prev => prev + xps);
      }
    }).catch(error => {});
  }, []);
  return (
    <ScrollView contentContainerStyle={productStyles.container}>
      <View style={productStyles.imageContainer}>
        <ImageBackground
          resizeMethod='resize'
          resizeMode='cover'
          source={getImage(media?.data[0].attributes?.url)}
          style={productStyles.productImage}
        >
          <View style={productStyles.header}>
            <TouchableOpacity style={productStyles.iconButton}
              onPress={() => {
                navigation.goBack()
              }}>
              <Ionicons
                name="arrow-back"
                productImages={25}
                color={COLOR.WHITE}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={productStyles.iconButton}>
              <Ionicons
                name='heart-outline'
                productImages={25}
                color={COLOR.WHITE}
              />
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
      </View>

      <View style={productStyles.detailsContainer}>
        <Text style={productStyles.productType}>{name}</Text>
        {totalViews && <Text style={productStyles.totalViews}>{totalViews} views</Text>}
        <Text style={productStyles.productDescription}>
          {description}
        </Text>

        <Text style={productStyles.productName}>Technologies</Text>
        {tagline?.trim() && (
          <View style={productStyles.tagViewStyles}>
            {tagline?.split(',').map((tag, index) => (
              tag.trim() && <Text style={productStyles.productDescription} key={index}>#{tag.trim()}</Text>
            ))}
          </View>
        )}

        {uploadedBy && uploadedBy?.data && <>
          <Text style={productStyles.productName}>Developed by</Text>
          <View style={productStyles.developerInfor}>
            <Image source={getImage(media?.data[0].attributes?.url)} style={productStyles.developerImage} />
            <View>
              <Text style={productStyles.developerName}>Ablestate</Text>
              <Text style={productStyles.uploadedBytatus}>{status}</Text>
            </View>
          </View></>}

        <Text style={productStyles.productImagesLabel}>Gallery</Text>
        <View style={productStyles.productImagesContainer}>
          {media?.data?.map((productImage, index) => (
            <TouchableOpacity key={index} style={productStyles.productImagesButton}>
              <Image
                resizeMode='cover'
                resizeMethod='resize'
                source={getImage(productImage.attributes?.url)}
                style={productStyles.thumbnail}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* <TouchableOpacity style={productStyles.buyButton} onPress={() => {OpenLink()}}>
        <Text style={productStyles.buyButtonText}>Tour product</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );

}

export default Index;


const productStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  header: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: DIMEN.PADDING.ME,
    marginHorizontal: 5,
    backgroundColor: COLOR.NEUTRAL_1,
    borderRadius: 100,
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  productImage: {
    flex: 1,
    borderRadius: 10
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 5,
  },
  detailsContainer: {
    paddingHorizontal: DIMEN.PADDING.ELG,
  },
  productType: {
    fontSize: FONTSIZE.HEADING_5,
    fontWeight: 'bold',
    // marginBottom: 5,
  },
  productName: {
    fontSize: FONTSIZE.TITLE_2,
    marginBottom: 10,
    marginTop: 20,
  },
  developerInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  developerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  developerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  uploadedBytatus: {
    color: COLOR.GREY_100,
  },
  followButton: {
    backgroundColor: COLOR.GREY_400,
    padding: 5,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  followText: {
    color: COLOR.WHITE,
    fontSize: 14,
  },
  productImagesLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  productImagesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImagesButton: {
    borderWidth: 1,
    borderColor: COLOR.WHITE,
    borderRadius: 5,
    marginRight: 10,
  },
  productImagesText: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tabButton: {
    marginRight: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.GREY_400,
  },
  productDescription: {
    fontSize: 14,
    color: COLOR.GREY_100,
  },
  buyButton: {
    backgroundColor: COLOR.SECONDARY_400,
    padding: DIMEN.PADDING.SM,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
    alignSelf: 'flex-end'
  },
  buyButtonText: {
    color: COLOR.WHITE,
    fontSize: 18,
  },
  tagViewStyles: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap'
  },
  totalViews: {
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Body,
    opacity: 0.5,
    marginBottom: 10,
  }
});