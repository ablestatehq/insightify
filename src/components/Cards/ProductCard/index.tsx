import React from 'react'
import {Octicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {FONT_NAMES} from '../../../assets/fonts/fonts';
import {environments} from '../../../constants/environments';
import {COLOR, FONTSIZE} from '../../../constants/constants';
import {ProductData, RootStackParamList} from '../../../utils/types';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


const Index = (props: ProductData) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {description, tagline, developers, name, tutorial, media} = props;
  
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('ProductDetail', {...props})}>
      <View style={styles.verifiedSection}>
        <Octicons name="verified" size={10} color={COLOR.WHITE} style={{padding: 5}} />
      </View>
      {media ?
        <Image
          source={{uri: `${environments.BASE_URL}${media?.data[0]?.attributes.url}`}}
          resizeMethod="resize"
          resizeMode="cover"
          style={styles.imageStyles}
        /> :
        null}
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.titleStyle}>
          {name}
        </Text>
        <Text numberOfLines={2} style={styles.descriptionStyle}>
          {description}
        </Text>
      </View>
    </Pressable>
  );
}

export default Index

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: COLOR.P_TRANSPARENT_10,
    borderRadius: 5,
    flexDirection: 'column',
  },
  imageStyles: {
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  content: {
    flexGrow: 1,
    width: '100%',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    // left: 5,
    backgroundColor: COLOR.NEUTRAL_1,
  },
  dateStyle: {
    textTransform: 'uppercase',
    color: COLOR.SECONDARY_500,
  },
  verifiedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  locationStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
  },
  titleStyle: {
    marginVertical: 5,
    color: COLOR.WHITE,
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: FONT_NAMES.Heading
  },
  verifiedText: {
    color: COLOR.WHITE,
    fontSize: FONTSIZE.SMALL,
    textTransform: 'uppercase',
    opacity: 0.5
  },
  descriptionStyle: {
    color: COLOR.WHITE,
    textAlign: 'left',
    fontFamily: FONT_NAMES.Body
  },
});