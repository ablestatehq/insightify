import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const Index = () => {
  const data  = { title: '', author:'', date:'', readTime:'', content:'', image:'' }
  const getImage = () => ({ uri: data.image });
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <Image source={getImage()} style={styles.articleImage} />
        <View style={styles.articleInfo}>
          <Text style={styles.articleTitle}>{data.title}</Text>
          <View style={styles.articleMeta}>
            <Text style={styles.articleAuthor}>{data.author}</Text>
            <Text style={styles.articleDate}>{data.date}</Text>
            <Text style={styles.articleReadTime}>{data.readTime} min read</Text>
          </View>
          <Text style={styles.articleContent}>{data.content}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    padding: 16,
  },
  articleInfo:{},
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  articleAuthor: {
    color: '#ccc',
    marginRight: 8,
  },
  articleDate: {
    color: '#ccc',
    marginRight: 8,
  },
  articleReadTime: {
    color: '#ccc',
  },
  articleContent: {
    color: '#fff',
    lineHeight: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
  },
  bottomButton: {
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
  },
});
