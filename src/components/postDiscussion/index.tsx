import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import {COLOR, DIMEN, FONTSIZE} from '@src/constants/constants';
import {PostDiscussionModal} from '@src/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import {FONT_NAMES} from '@src/assets/fonts/fonts';
import { storeData } from '@api/strapiJSAPI';
import { AppContext } from '@src/context';

const Titles = [
  'Ask a question to the community',
  'Ask for feedback',
  'Share what you are working on',
];

const Index = ({ visible, close, setPost }: PostDiscussionModal) => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const {jwt, user} = useContext(AppContext);

  const handlePost = async () => {
    const topic_response = await (await storeData('topics', {name: topic}, jwt));
    const topic_id = topic_response?.data?.id;
    if (topic_id) {
      const post_response = await (await storeData('posts', {content, topics: topic_id, author: user.id}, jwt));
      const p_data = { id: post_response?.data?.id, ...post_response?.data?.attributes }
      setPost(prev => [p_data, ...prev]);
    }
    close()
  };

  useEffect(() => {}, []);
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="close-outline" size={24} style={styles.closeButton} color="black" onPress={close} />
          <Text style={styles.headerTitle}>Post Square</Text>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>POST</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.topicContainer}>
          {/* <Text style={styles.topicLabel}>Set a topic</Text> */}
          <View style={styles.topicProfileSection}>
            {/* {!topic.trim() && <ProfileCard />} */}
            <TextInput
              style={styles.topicInput}
              placeholder="Title"
              value={topic}
              onChangeText={setTopic}
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* <Text style={styles.contentPrompt}>Ask a question to the community</Text> */}
          <Text style={styles.contentPrompt}>Details</Text>
          <TextInput
            style={styles.contentInput}
            placeholder={`Post details`}
            // placeholder={`Share more details about what you're working on here so the community can give feedback.\n\nYou can include specific challenges, goals, or any context that will help others understand your project.`}
            placeholderTextColor={COLOR.GREY_100}
            multiline={true}
            value={content}
            onChangeText={setContent}
            textAlign="left"
            textAlignVertical="top"
          />
        </View>
      </View>
    </Modal>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: DIMEN.PADDING.ME,
  },
  closeButton: {
    padding: DIMEN.PADDING.SM,
  },
  closeButtonText: {
    color: COLOR.WHITE,
    fontSize: FONTSIZE.BODY,
  },
  headerTitle: {
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Heading,
  },
  postButton: {
    padding: DIMEN.PADDING.SM,
  },
  postButtonText: {
    fontSize: FONTSIZE.TITLE_2,
    fontFamily: FONT_NAMES.Title,
  },
  topicContainer: {
    padding: DIMEN.PADDING.ME,
  },
  topicLabel: {
    color: COLOR.GREY_100,
    marginBottom: DIMEN.MARGIN.ME,
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.BODY,
    marginLeft: DIMEN.MARGIN.XXSM,
  },
  topicInput: {
    flex: 1,
    backgroundColor: COLOR.GREY_50,
    padding: DIMEN.PADDING.ME,
    borderRadius: DIMEN.CONSTANT.SM,
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
  },
  contentContainer: {
    padding: DIMEN.PADDING.ME,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: DIMEN.CONSTANT.XLG,
    marginRight: DIMEN.MARGIN.ME,
  },
  contentPrompt: {
    color: COLOR.GREY_100,
    marginBottom: DIMEN.MARGIN.SM,
    marginLeft: DIMEN.MARGIN.XXSM,
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.BODY,
  },
  contentInput: {
    backgroundColor: COLOR.GREY_50,
    padding: DIMEN.PADDING.ME,
    borderRadius: DIMEN.CONSTANT.ME,
    minHeight: 200,
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
  },
  topicProfileSection: {
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.SM
  }
});