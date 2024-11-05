import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { ProductData, RootStackParamList } from "@src/types";
import { COLOR, FONTSIZE } from "@constants/constants";
import { environments } from "@constants/environments";

const ProductItem = (props: ProductData) => {
  const {
    id,
    verified,
    name,
    uploadedBy,
    description,
    media,
    totalViews,
    tagline,
    status
  } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetail', {
        id,
        verified,
        name,
        uploadedBy,
        description,
        media,
        totalViews,
        status,
        tagline
      })}>
      <View style={styles.mainstyle}>
        <View style={styles.contentStyle}>
          <Text numberOfLines={3} style={styles.titleStyle}>
            {name}
          </Text>
          <Text numberOfLines={3} style={styles.descriptionStyle}>
            {description}
          </Text>
        </View>
        <View style={styles.imageViewStyle}>
          {media && media?.data?.length > 0 ? <Image
            source={{
              uri: `${environments.BASE_URL}${media?.data[0]?.attributes.url}`,
            }}
            style={styles.imageStyle}
            resizeMethod="resize"
            resizeMode="cover"
          /> : null}
        </View>
      </View>
      {/* <View style={styles.footerStyle}>
        <View style={styles.footText}>
          <Text style={styles.text}>{views} views</Text>
          {verified ?
            <Icons name="verified" size={13} _color={COLOR.GREY_500} /> :
            <Icons name="unverified" size={13} _color={COLOR.PRIMARY_300} />}
        </View>
        <View style={styles.iconViewStyle}>
          {!bookmarked && <Ionicons
            name="heart-outline"
            size={15}
            color={COLOR.PRIMARY_300}
            // onPress={handleBookmark}
          />}
          {bookmarked && <Ionicons
            name='heart'
            size={15}
            color={COLOR.PRIMARY_300}
            // onPress={handleBookmark}
          />}
        </View>
      </View> */}
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    padding: 5,
    margin: 5,
    borderRadius: 5,
    elevation: 1
  },
  dateStyle: { color: COLOR.SECONDARY_300, textTransform: 'uppercase' },
  titleStyle: {
    color: COLOR.GREY_400,
    paddingVertical: 5,
  },
  descriptionStyle: {
    color: COLOR.GREY_100
  },
  imageStyle: {
    width: '100%',
    height: 80,
    borderRadius: 5,
  },
  contentStyle: {
    flex: 1,
  },
  mainstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignContent: 'flex-start',
  },
  dotStyle: {
    width: 4,
    height: 4,
    backgroundColor: COLOR.DANGER,
    borderRadius: 10,
  },
  footerStyle: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 5,
    // marginVertical: 5,
  },
  imageViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginRight: 10,
  },
  footText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  text: {
    fontSize: FONTSIZE.SMALL,
  }
});