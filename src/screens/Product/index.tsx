import React from 'react'
import Header from '../../components/Headers/Header';

import {Ionicons, Octicons} from '@expo/vector-icons';
import {FONT_NAMES} from '../../assets/fonts/fonts'
import {RootStackParamList} from '../../utils/types'
import {COLOR, DIMEN, FONTSIZE} from '../../constants/constants'
import {environments} from '../../constants/environments'
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StyleSheet, View, ImageBackground, StatusBar, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const {BASE_URL} = environments;

const Index = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const {description, tagline, developers, name, media} = route.params;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (media?.data.length ? media?.data?.length : 0));
    }, 10000);

    return () => clearInterval(interval);
  }, [media?.data?.length]);

  const getImage = (url: string) => ({ uri: `${BASE_URL}${url}` });

  return (
    <ScrollView style={productStyles.container}>
      <View style={productStyles.header}>
        <TouchableOpacity style={productStyles.iconButton}>
          <Ionicons
            name="arrow-back"
            productImages={20}
            color={COLOR.PRIMARY_400}
            onPress={() => {
              navigation.goBack()
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={productStyles.iconButton}>
          <Ionicons
            name='heart-outline'
            productImages={20}
            color={COLOR.PRIMARY_400}
            onPress={() => {
              navigation.goBack()
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={productStyles.imageContainer}>
        <Image
          resizeMethod='resize'
          resizeMode='cover'
          source={getImage(media?.data[currentIndex].attributes?.url)}
          style={productStyles.productImage}
        />
        {/* <View style={productStyles.thumbnailContainer}>
          <Image
            resizeMethod='resize'
            resizeMode='cover'
            source={getImage(media?.data[0].attributes?.url)} style={productStyles.thumbnail} />
          <Image
            resizeMethod='resize'
            resizeMode='cover'
            source={getImage(media?.data[1].attributes?.url)} style={productStyles.thumbnail} />
          <Image
            resizeMethod='resize'
            resizeMode='cover'
            source={getImage(media?.data[2].attributes?.url)} style={productStyles.thumbnail} />
        </View> */}
      </View>

      <View style={productStyles.detailsContainer}>
        {/* <Text style={productStyles.productType}>Software product</Text> */}
        <Text style={productStyles.productType}>{name}</Text>

        {/* <View style={productStyles.tabContainer}>
          <TouchableOpacity style={productStyles.tabButton}>
            <Text style={productStyles.tabText}>Description</Text>
          </TouchableOpacity>
          <TouchableOpacity style={productStyles.tabButton}>
            <Text style={productStyles.tabText}>Review</Text>
          </TouchableOpacity>
        </View> */}

        <Text style={productStyles.productDescription}>
          {description}
        </Text>

        <Text style={productStyles.productName}>Developed by</Text>
        <View style={productStyles.developerInfor}>
          <Image source={getImage(media?.data[currentIndex].attributes?.url)} style={productStyles.storeImage} />
          <View>
            <Text style={productStyles.storeName}>Ablestate</Text>
            <Text style={productStyles.storeCertified}>verified</Text>
          </View>
          {/* <TouchableOpacity style={productStyles.followButton}>
            <Text style={productStyles.followText}>Following</Text>
          </TouchableOpacity> */}
        </View>

        <Text style={productStyles.productImagesLabel}>Gallery</Text>
        <View style={productStyles.productImagesContainer}>
          {media?.data?.map((productImage, index) => (
            <TouchableOpacity key={index} style={productStyles.productImagesButton}>
              {/* <Text style={productStyles.productImagesText}>{productImage}</Text> */}
              <Image
                resizeMethod='resize'
                resizeMode='cover'
                source={getImage(media?.data[2].attributes?.url)} style={productStyles.thumbnail} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={productStyles.buyButton}>
        <Text style={productStyles.buyButtonText}>Tour product</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: DIMEN.PADDING.ME,
  },
  iconButton: {
    padding: DIMEN.PADDING.ME,
  },
  icon: {
    width: 24,
    height: 24,
  },
  imageContainer: {
    flex: 1,
    // alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    // height: 200,
    flex: 1,
    borderWidth: 1,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  detailsContainer: {
    paddingHorizontal: DIMEN.PADDING.ELG,
  },
  productType: {
    fontSize: FONTSIZE.HEADING_5,
    fontWeight: 'bold',
    marginBottom: 5,
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
  storeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeCertified: {
    color: COLOR.GREY_100,
  },
  followButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  followText: {
    color: '#FFF',
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
    // padding: DIMEN.PADDING.ME,
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
    color: '#000',
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
  },
  buyButton: {
    backgroundColor: COLOR.GREY_200,
    padding: DIMEN.PADDING.ME,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});