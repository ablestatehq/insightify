import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View, Text, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLOR } from '../../../constants/constants';
import { RootStackParamList } from '../../../utils/types';
import { environments } from '../../../constants/environments';
import { FONT_NAMES } from '../../../assets/fonts/fonts';

const Index = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { opportunity } = props;
  const { id, Title, company_logo } = opportunity;
  const { BASE_URL } = environments;

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Offers', { tag: 'Recent' })}>
      <View style={styles.overlay} />
      <Image
        source={{
          uri: `${BASE_URL}${company_logo.data ?
            company_logo.data?.attributes?.url :
            '/uploads/join_us_eee8c7c677.jpg'}`
        }}
        resizeMethod="resize"
        resizeMode="repeat"
        style={styles.imageStyles}
      />
      <Text numberOfLines={3} style={styles.titleStyle}>
        {Title}
      </Text>
    </Pressable>
  );
}

export default Index

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageStyles: {
    width: '100%',
    // flex:1,
    height: 200,
    position: 'absolute',
    borderRadius: 5,
    // objectFit: 'scale-down',
  },
  overlay: {
    backgroundColor: COLOR.NEUTRAL_3,
    position: 'absolute',
    width: '100%',
    height: 200,
    zIndex: 3,
    borderRadius: 5
  },
  titleStyle: {
    marginVertical: 5,
    color: COLOR.WHITE,
    fontSize: 20,
    zIndex: 5,
    opacity: 0.8,
    fontFamily: FONT_NAMES.Heading
  },
});