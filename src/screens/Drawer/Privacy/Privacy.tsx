import { STRAPI_BASE_URL } from '@env';
import React, { useEffect } from 'react';
import { COLOR } from '../../../constants/contants';
import Header from '../../../components/Headers/Header';
import RenderHtml from 'react-native-render-html';
import {retrieveLocalData, storeToLocalStorage} from '../../../utils/localStorageFunctions';
import {SafeAreaView, ScrollView, StyleSheet, View, Text, useWindowDimensions} from 'react-native';

const Privacy = () => {
  const [content, setContent] = React.useState('');

  useEffect(() => {
    const fetch_data = async () => {

      const local_privacy_content = await retrieveLocalData('privacy_content');

      if (local_privacy_content) {
        setContent(local_privacy_content);
      } else {
        const response = await fetch(`${STRAPI_BASE_URL}insightify-privacy-policy`)
        const results = await response.json()

        setContent(prev => {
          storeToLocalStorage('privacy_content', results?.data.attributes?.body)
          return local_privacy_content ?? results?.data.attributes?.body;
        })
      }

    }

    fetch_data();
  }, [content]);

  const {width} = useWindowDimensions();
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Privacy Policy' />
      <View style={styles.content}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* <Text>{content}</Text> */}
          <RenderHtml contentWidth={width - 100} source={{html: content}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Privacy;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  text: {
    textAlign: 'justify',
    fontFamily: 'RalewayMedium'
  },
  scroll: {
    padding: 10
  }
})