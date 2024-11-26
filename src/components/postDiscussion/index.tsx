import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { SuggestionsProvidedProps, TriggersConfig, useMentions } from 'react-native-more-controlled-mentions';

import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
import { PostDiscussionModal } from '@src/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import { get_users, storeData } from '@api/strapiJSAPI';
import { AppContext } from '@src/context';

// regex expression
const men_regex = /(@\w+)/g;
const hash_tag = /(#\w+)/g;


const triggersConfig: TriggersConfig<'mention' | 'hashtag'> = {
  mention: {
    trigger: '@',
    allowedSpacesCount: 0,
    isInsertSpaceAfterMention: true,
    textStyle: {
      color: COLOR.PRIMARY_200,
      fontSize: FONTSIZE.SMALL,
      fontWeight: 'bold'
    },
  },
  hashtag: {
    trigger: '#',
    allowedSpacesCount: 0,
    isInsertSpaceAfterMention: true,
    textStyle: {
      color: COLOR.PRIMARY_200,
      fontSize: FONTSIZE.SMALL,
      fontWeight: 'bold'
    },
  },
};

const Index = ({ visible, close, setPost }: PostDiscussionModal) => {
  // states
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [mentions, setMentions] = useState<number[]>([]);
  const [hashTag, setHashTag] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // context
  const { jwt, user } = useContext(AppContext);

  // post
  const handlePost = useCallback(async () => {
    const topic_response = await (await storeData('topics', { name: topic }, jwt));
    const topic_id = topic_response?.data?.id;
    if (topic_id) {
      const post_response = await
        (await storeData('posts', { content, topics: topic_id, author: user.id }, jwt));
      const p_data = { id: post_response?.data?.id, ...post_response?.data?.attributes }
      setPost(prev => [p_data, ...prev]);
    }
    close()
  }, []);

  // hooks
  const { textInputProps, triggers } = useMentions({
    value: content,
    onChange: setContent,
    triggersConfig,
  });

  const Suggestions: FC<SuggestionsProvidedProps> = ({
    keyword,
    onSelect
  }) => {
    if (keyword == null) {
      return null;
    }

    return (
      <FlatList
        contentContainerStyle={styles.suggestionsContainer}
        data={users.filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))}
        renderItem={({ item }) =>
          <Pressable onPress={() => {
            setMentions([...mentions, item.id]);
            onSelect(item)
          }}>
            <Text>{item.name}</Text>
          </Pressable>
        }
      />
    );
  };

  useEffect(() => {
    (async () => {
      const data = await get_users();
      setUsers(data);
    })();
  }, []);

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
          <View style={styles.topicProfileSection}>
            <TextInput
              style={styles.topicInput}
              placeholder="Title"
              value={topic}
              onChangeText={setTopic}
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.contentPrompt}>Details</Text>
          <Suggestions {...triggers.mention} />
          <TextInput
            style={styles.contentInput}
            placeholder={`Post details`}
            placeholderTextColor={COLOR.GREY_100}
            multiline
            {...textInputProps}
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
  },
  hash_tag: {},
  mention_style: {
    color: COLOR.PRIMARY_200,
    fontSize: FONTSIZE.SMALL,
    fontWeight: 'bold'
  },
  input_content: {
    color: COLOR.GREY_300,
    fontFamily: FONT_NAMES.Body,
  },
  suggestionsContainer: {
    // position: 'absolute',
    top: 0,
    backgroundColor: "#fff",
    // borderWidth: 1,
    borderRadius: 8,
    maxHeight: 150,
  },
});