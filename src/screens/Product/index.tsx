import {
  StyleSheet, View, Text, Image,
  StatusBar, ScrollView, TextInput,
  LayoutChangeEvent, Animated, FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, DIMEN, FONTSIZE } from "@constants/constants";
import { environments } from "@constants/environments";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { AppContext } from "@helpers/context/AppContext";
import awardXP from "@utils/awardXP";
import { RootStackParamList } from "@utils/types";
import { FONT_NAMES } from "@fonts";
import onShare, { handleLinkPress } from "@utils/onShare";
import { handleBookmark } from "@helpers/functions/handleFunctions";

const { BASE_URL } = environments;
const AWARD = {
  'FIRST': 5,
  'SECOND': 3,
  'THIRD': 1
}
interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}

function Index() {
  const scrollViewRef = useRef<ScrollView | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleBack = () => navigation.goBack();

  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const { description, name, media, id, url, meta } = route.params;
  const { user, jwt, setXp, setProducts, products } = React.useContext(AppContext);

  const [com, setCom] = useState<string>('');
  const [csLayout, setCsLayout] = useState<Layout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleShare = () => {
    if (url) {
      onShare(url);
    }
  }

  const handleComment = () => { }
  const handleVisit = () => {
    handleLinkPress(url as string);
  }
  React.useEffect(() => {
    awardXP(AWARD, id, jwt, user?.id).then(xps => {
      if (xps) {
        setXp(prev => prev + xps);
      }
    }).catch(error => { });
  }, []);

  const getCommentSectionLayout = (event: LayoutChangeEvent) => {
    setCsLayout(event.nativeEvent.layout);
  }
  // move the user to a given section in the scrollView
  const moveToComments = () => {
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current?.scrollTo({ y: csLayout.height, animated: true });
    }
  }

  const bookmark = () => {
    handleBookmark(
      id,
      products,
      setProducts,
      'products',
      'Product saved',
      'Product removed',
      jwt
    );
  };

  const renderImage = ({ item, index }: { item: any, index: number }) => (
    <Image
      key={index}
      resizeMode='stretch'
      resizeMethod='resize'
      source={getImage(item?.attributes?.url)}
      style={styles.thumbnail}
    />
  );

  const getImage = (url: string) => ({ uri: `${BASE_URL}${url}` });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={styles.navComp}>
        <View style={styles.navHeader}>
          <Ionicons
            name="arrow-back"
            size={20}
            color={COLOR.WHITE}
            onPress={handleBack}
          />
        </View >
        {/**Icon component */}
        <View style={styles.iconComp}>
          <Image
            style={styles.logoStyle}
            source={getImage(media?.data[0].attributes?.url)}
          />
        </View>
        <Text style={styles.pdttName}>{name}</Text>
        {/* {meta?.slogan && <Text style={styles.sloganText}>{meta?.slogan}</Text>} */}
      </Animated.View>
      <View style={styles.icons_section}>
        {/* <View style={styles.doubleStyle}> */}
        <Ionicons
          name="chatbubble-outline"
          size={20}
          color={COLOR.GREY_300}
          onPress={moveToComments}
        />
        <Ionicons
          name="open-outline"
          size={20}
          color={COLOR.GREY_300}
          onPress={handleVisit}
        />
        {/* </View> */}
        {/* <View style={styles.doubleStyle}> */}
        <Ionicons
          name={meta?.bookmarked ? "bookmark" : 'bookmark-outline'}
          size={20}
          color={COLOR.GREY_300}
          onPress={bookmark}
        />
        <Ionicons
          name="share-social-outline"
          size={20}
          color={COLOR.GREY_300}
          onPress={handleShare}
        />
        {/* </View> */}
      </View>
      <ScrollView style={styles.main} ref={scrollViewRef}>
        {/**Display the product images. */}
        <FlatList
          horizontal
          data={media?.data}
          renderItem={renderImage}
          showsVerticalScrollIndicator={false}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={2}
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pdtImages}
        />
        {/**Production description. */}
        <Text style={styles.description}>{description}</Text>
        {/**Developer of the product */}
        <View style={styles.developerSection}>
          <View style={styles.devProfile}>
            <FontAwesome
              size={20}
              name="user-circle-o"
              color={COLOR.SECONDARY_100}
            />
            <Text style={styles.devName}>{`Launched by ${meta?.lauchedBy?.companyName}`}</Text>
          </View>
          <Text style={styles.devDescription}>
            {meta?.lauchedBy?.companyBio}
          </Text>
          {/**comments */}
          <View onLayout={getCommentSectionLayout}>
            <Text style={styles.commentTitle}>Comments</Text>
            {meta?.comments ? meta?.comments.map((_, index) => (
              <>
                <View style={styles.comments} key={index}>
                  <View style={styles.commentedBy}>
                    <View style={styles.devProfile}>
                      <FontAwesome
                        size={20}
                        name="user-circle-o"
                        color={COLOR.SECONDARY_100}
                      />
                      <Text style={styles.commentor}>{`Guest user`}</Text>
                    </View>
                    <View style={styles.dot} />
                    <Text style={styles.timeStamp}>{'5days ago'}</Text>
                  </View>
                  <Text>{'comment'}</Text>
                </View>
              </>
            )) :
              <Text style={styles.no_comments}>No comments</Text>
            }
          </View>
        </View>
      </ScrollView>
      {/**User comment section. */}
      <View style={styles.comment}>
        <FontAwesome
          size={25}
          name="user-circle-o"
          color={COLOR.SECONDARY_100}
        />
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          onChangeText={setCom}
        />
        {com.trim() &&
          <Ionicons
            name="send"
            size={25}
            color={COLOR.GREY_300}
            onPress={handleComment}
          />}
      </View>
      <StatusBar backgroundColor={COLOR.GREY_300} barStyle='light-content' />
    </SafeAreaView>
  );
}

export default Index;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  navComp: {
  },
  navHeader: {
    padding: DIMEN.PADDING.ME,
    backgroundColor: COLOR.GREY_300,
  },
  main: {
    // flexGrow: 1,
    paddingHorizontal: DIMEN.PADDING.ME
  },
  logoStyle: {
    width: 100,
    height: 100,
    borderRadius: DIMEN.PADDING.ME,
  },
  iconComp: {
    borderWidth: 2,
    borderColor: COLOR.WHITE,
    padding: DIMEN.PADDING.ES,
    borderRadius: DIMEN.PADDING.ME,
    marginTop: -DIMEN.MARGIN.XLG,
    alignSelf: 'center',
    backgroundColor: COLOR.WHITE,
    elevation: 2,
  },
  pdttName: {
    textAlign: 'center',
    fontSize: FONTSIZE.TITLE_2,
    marginTop: DIMEN.MARGIN.SM,
    fontFamily: FONT_NAMES.Heading,
  },
  sloganText: {
    textAlign: 'center',
    fontSize: FONTSIZE.BODY,
    marginBottom: DIMEN.MARGIN.ME,
    fontFamily: FONT_NAMES.Body,
    lineHeight: FONTSIZE.TITLE_2,
  },
  icons_section: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: DIMEN.MARGIN.XXSM,
    // marginHorizontal: DIMEN.MARGIN.ME,
    paddingVertical: DIMEN.PADDING.SM
  },
  doubleStyle: {
    flexDirection: 'row',
    gap: DIMEN.MARGIN.ME,
  },
  pdtImages: {
    marginVertical: DIMEN.MARGIN.SM,
    borderWidth: 1,
  },
  thumbnail: {
    width: DIMEN.SCREENWIDTH * 0.85,
    height: 150,
    borderRadius: DIMEN.MARGIN.ME,
    marginHorizontal: DIMEN.MARGIN.ME
  },
  description: {
    textAlign: 'left',
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Body,
  },
  developerSection: {
    marginVertical: DIMEN.MARGIN.SM
  },
  devProfile: {
    flexDirection: 'row',
    gap: DIMEN.MARGIN.SM,
  },
  devName: {
    textAlign: 'left',
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Title,
  },
  devDescription: {
    textAlign: 'left',
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Body,
  },
  commentTitle: {
    textAlign: 'left',
    fontSize: FONTSIZE.BODY,
    marginVertical: DIMEN.MARGIN.SM,
    fontFamily: FONT_NAMES.Title,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMEN.MARGIN.SM,
    backgroundColor: 'transparent',
    marginHorizontal: DIMEN.MARGIN.ME,
    marginVertical: DIMEN.MARGIN.SM,
  },
  comments: {

  },
  no_comments: {
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.SMALL,
    color: COLOR.GREY_100,
  },
  commentor: {
    textAlign: 'left',
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Title,
  },
  commentedBy: {
    flexDirection: 'row',
    gap: DIMEN.MARGIN.SM,
    alignItems: 'center',
  },
  dot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 10,
    backgroundColor: COLOR.GREY_100,
  },
  timeStamp: {
    textAlign: 'left',
    fontSize: FONTSIZE.SMALL,
    fontFamily: FONT_NAMES.Body,
    color: COLOR.GREY_100
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLOR.GREY_100,
    padding: DIMEN.PADDING.SM,
    borderRadius: DIMEN.MARGIN.XLG,
    paddingHorizontal: DIMEN.PADDING.ELG
  }
});