
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  ImageBackground
} from 'react-native'
import React from 'react'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { Raleway_400Regular } from '@expo-google-fonts/raleway'
import { Comfortaa_700Bold } from '@expo-google-fonts/comfortaa'

import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// icons 
import { Ionicons, Fontisto, AntDesign, MaterialCommunityIcons, } from '@expo/vector-icons';

interface DetailsContainerProps {
  featured_image: string,
  title: string
  excerpt: string
  articleContent: string
  publishedAt: string
}

const DetailsContainer = (
  {
    title,
    excerpt,
    featured_image,
    articleContent,
    publishedAt
  }: DetailsContainerProps
) => {

  const [like, setLike] = React.useState<boolean>(false);
  const [dislike, setDislike] = React.useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const [fontsLoaded] = useFonts({
    ComfortaaBold: Comfortaa_700Bold,
    RalewayRegular: Raleway_400Regular,
  });

  const bookmarkArticle = () => {

  }

  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: featured_image }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.NEUTRAL_1,
            flex: 1,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color={COLOR.WHITE}
              onPress={() => navigation.goBack()}
            />
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={COLOR.WHITE}
              onPress={bookmarkArticle}
            />
          </View>
          {/* Title  */}
          <View
            style={{
              bottom: 10,
              position: 'absolute',
              paddingHorizontal: 10
            }}
          >
            <Text
              style={{
                 : "ComfortaaBold",
                fontSize: FONTSIZE.HEADING_4,
                color: COLOR.WHITE
              }}
              numberOfLines={4}
            >
              {title}
            </Text>
            {/* Author and date  */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/news-image.jpg')}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 25
                    }}
                    resizeMethod='resize'
                    resizeMode='cover'
                  />
                </View>
                <Text
                  style={{
                    color: COLOR.WHITE
                  }}
                >By Tech News Africa</Text>
              </View>
              <View>
                <Text
                  style={{
                    color: COLOR.WHITE
                  }}
                >
                  {new Date(publishedAt).toDateString().split(" ").slice(1).join(", ")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: COLOR.B_200,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
          }}
        >
          {like &&
            <AntDesign
              name="like1"
              size={25}
            color={COLOR.GREY_50}
            style={{
              opacity:0.5
            }}
            />}
          {!like &&
            <AntDesign
              name="like2"
              size={25}
            color={COLOR.GREY_50}
            style={{
              opacity: 0.5
            }}
            />}
          {dislike &&
            <AntDesign
              name="dislike1"
              size={25}
            color={COLOR.GREY_50}
            style={{
              opacity: 0.5
            }}
            />}
          {!dislike &&
            <AntDesign
              name="dislike2"
              size={25}
            color={COLOR.GREY_50}
            style={{
              opacity: 0.5
            }}
            />}
          <Fontisto
            name="share-a"
            size={24}
            color={COLOR.GREY_50}
            style={{
              opacity: 0.5
            }}
          />
          <MaterialCommunityIcons
            name="message-outline"
            size={24}
            color={COLOR.GREY_50}
            style={{
              opacity: 0.5
            }}
          />
        </View>
        <Animated.ScrollView
          contentContainerStyle={{
            backgroundColor: COLOR.WHITE,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}
        >
          <View
            style={{
              padding: 20
            }}
          >
            <Text
              style={{
                 : "ComfortaaBold",
                fontSize: FONTSIZE.TITLE_1
              }}
              numberOfLines={7}
            >
              {excerpt}
            </Text>
          </View>
          <View
            style={{
              padding: 20
            }}
          >
            <Text
              style={{
                 : "RalewaySemiBold",
                color: COLOR.GREY_400,
                marginVertical: 10,
                fontSize: FONTSIZE.BODY
              }}
            >
              {articleContent}
            </Text>
            <View
              style={{
                backgroundColor: COLOR.B_300,
                alignSelf: 'flex-start',
                paddingHorizontal: 10,
                paddingVertical: 2
              }}
            >
              <Text
                style={{
                  color: COLOR.WHITE,
                   : 'ComfortaaBold'
                }}
              >Tech News Africa</Text>
            </View >
          </View >
        </Animated.ScrollView >
      </View >
    </ImageBackground >
  );
}

export default DetailsContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLOR.NEUTRAL_3
  },
});