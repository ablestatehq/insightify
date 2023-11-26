import {
  Text,
  View,
  Image,
  Animated,
  StatusBar,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import React from 'react'

import Header from './helperComponents/Header'
import { COLOR, FONTSIZE } from '../../constants/contants'

import {
  useRoute,
  useNavigation,
} from '@react-navigation/native'

import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'

import onShare from '../../utils/onShare'

import {
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { DetailsScreenProps } from '../../utils/types';

const NewsDetails = () => {

  const router = useRoute<DetailsScreenProps>();
  const { params } = router;

  // const [open, setOpen] = React.useState<boolean>(false);
  // const [showMoreButton, setShowMoreButton] = React.useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // share article
  const message = `https://www.techinafrica.com/${params?.title}`;

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: "space-between",
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: COLOR.B_50
        }}
      >
        <Header/>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          }}
        >
          <MaterialCommunityIcons
            name="share-outline"
            size={30}
            color={COLOR.GREY_500}
            onPress={() => onShare(message)}
          />
        </View>
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 50
        }}
      >

        <Text
          style={{
            fontSize: FONTSIZE.TITLE_1,
            lineHeight: 25,
            fontFamily: 'RalewayRegular'
          }}
          numberOfLines={4}
        >
          {params?.title}
        </Text>
        <Text
          style={{
            color: COLOR.B_200,
            marginVertical: 10,
            lineHeight: 20,
            fontFamily: "RalewayRegular"
          }}
        >
          { params?.articleContent.match(/[^.!?]+[.!?]+/g)?.slice(0,2).join(" ")}
        </Text>

        <Image
          source={{ uri: params?.featured_image }}
          style={styles.image}
          resizeMethod='auto'
          resizeMode='cover'
        />
        {/* Author and time  */}
        <View>
          <Text>Source: {`Tech News Afica.`}</Text>
          {/* <Text>Source: {`Tech News Afica.`}</Text>
          <Text>Source: {`Tech News Afica.`}</Text> */}
        </View>
        <Text
          style={{
            color: COLOR.GREY_400,
            marginVertical: 10,
            lineHeight: 20,
            letterSpacing: 0.9,
            marginBottom: 10,
            fontFamily: "RalewayRegular",
          }}
          // numberOfLines={!open ? 15 : undefined}
          // onTextLayout={event => {
          //   if (event.nativeEvent.lines.length > 5) {
          //     setShowMoreButton(true)
          //   }
          // }}
        >
          <Text
            style={{
              fontSize: FONTSIZE.HEADING_5,
              lineHeight: 25,
            }}
          >{params?.articleContent.match(/[^.!?]+[.!?]+/g)?.slice(2).join(" ")[1]}</Text>
          {params?.articleContent.match(/[^.!?]+[.!?]+/g)?.slice(2).join(" ").slice(2,)}
        </Text >

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View />
          {/* <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setOpen(!open)
            }}
          >
            <Text
              style={{
                color: COLOR.ORANGE_300
              }}
            >
              {!open && showMoreButton ? "show more" : "show less"}
            </Text>
            {
              !open && showMoreButton ?
                <Entypo name="chevron-small-down" size={20} color={COLOR.B_300} /> :
                <Entypo name="chevron-small-up" size={20} color={COLOR.B_300} />
            }
          </Pressable> */}
        </View>

      </Animated.ScrollView >
      < StatusBar
        // hidden
        backgroundColor={COLOR.WHITE}
        translucent={false}
        barStyle='dark-content'
      />
    </SafeAreaView >
  );
}

export default NewsDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLOR.WHITE
  },
  techNewView: {
    alignSelf: "flex-start",
    backgroundColor: COLOR.B_300,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginVertical: 5,
    padding: 20
  },
  techText: {
    fontSize: FONTSIZE.TITLE_2,
    color: COLOR.WHITE
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10
  }
})