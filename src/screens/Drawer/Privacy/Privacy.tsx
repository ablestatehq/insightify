import { SafeAreaView, ScrollView, StyleSheet, View, Text} from 'react-native'
import React, { useEffect } from 'react';
import Header from '../../NewsDetails/helperComponents/Header';
import { COLOR } from '../../../constants/contants';
import { STRAPI_BASE_URL } from '@env';

const Privacy = () => {
  const [content, setContent] = React.useState('');
  useEffect(() => {
    const fetch_data = async () => {
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        }
      }

      const response = await fetch(`${STRAPI_BASE_URL}insightify-privacy-policy`, options)
        .then(response => response.json())
        .catch((error: any) => { console.log(error.message) });
      
      setContent(response?.data.attributes?.body)
    }

    fetch_data();
  }, [content]);
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Privacy Policy'/>
      <View style={styles.content}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>{content}</Text>
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
    backgroundColor:COLOR.WHITE
  },
  text: {
    textAlign: 'justify',
    fontFamily:'RalewayMedium'
  },
  scroll: {
    padding:10
  }
})