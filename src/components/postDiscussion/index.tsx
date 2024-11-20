import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import { COLOR, DIMEN, FONTSIZE } from '@src/constants/constants';
// import { MentionSuggestionsProps } from 'react-native-controlled-mentions'
import { PostDiscussionModal } from '@src/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONT_NAMES } from '@src/assets/fonts/fonts';
import { get_users, storeData } from '@api/strapiJSAPI';
import { AppContext } from '@src/context';

const Titles = [
  'Ask a question to the community',
  'Ask for feedback',
  'Share what you are working on',
];

interface Selection {
  start: number;
  end: number;
}

const men_regex = /(@\w+)/g;
const hash_tag = /(#\w+)/g;

const Index = ({ visible, close, setPost }: PostDiscussionModal) => {
  // states
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [mentions, setMentions] = useState<string[]>([]);
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

  const handle_change = (text: string) => {
    const mentions_ = text.match(men_regex);
    const hash_tags = text.match(hash_tag);
    if (mentions_) {
      setMentions([...mentions_]);
    }
    if (hash_tags) {
      setHashTag([...hash_tags]);
    }
    setContent(text);
  }
  // const renderSuggestions: FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress }) => {
  //   if (keyword == null) {
  //     return null;
  //   }
  //   return (
  //     <ScrollView>
  //       {users
  //         .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
  //         .map(one => (
  //           <Pressable
  //             key={one.id}
  //             onPress={() => onSuggestionPress(one)}

  //             style={{ padding: 12 }}
  //           >
  //             <Text>{one.name}</Text>
  //           </Pressable>
  //         ))
  //       }
  //     </ScrollView>
  //   );
  // };
  // const renderHashtagSuggestions: FC<MentionSuggestionsProps> = ({ keyword, onSuggestionPress }) => {
  //   if (keyword == null) {
  //     return null;
  //   }
  //   return (
  //     <ScrollView>
  //       {users
  //         .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
  //         .map(one => (
  //           <Pressable
  //             key={one.id}
  //             onPress={() => onSuggestionPress(one)}

  //             style={{ padding: 12 }}
  //           >
  //             <Text>{one.name}</Text>
  //           </Pressable>
  //         ))
  //       }
  //     </ScrollView>
  //   );
  // };

  const getPlainString = () => {

  }

  useEffect(() => {
    (async () => {
      const data = await get_users();
      setUsers(data);
    })();
  }, []);
  // console.log(content);
  // console.log(mentions)
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
            placeholderTextColor={COLOR.GREY_100}
            multiline
            onChangeText={handle_change}
            textAlign="left"
            textAlignVertical="top"
          >
            <Text style={styles.input_content}>
              {content.split(/([@#]\w+)/g).map((part, index) => (
                part.match(men_regex) ? (
                  <Text key={`mention-${index}`} style={styles.mention_style}>
                    {part}
                  </Text>
                ) : part.match(hash_tag) ? (
                    <Text style={styles.mention_style}>{part}</Text>
                ) : (
                  <Text key={`text-${index}`} style={styles.input_content}>{part}</Text>
                )
              ))}
            </Text>
          </TextInput>
          {/* <MentionInput
            value={content}
            onChange={setContent}
            partTypes={[{
              trigger: '@',
              renderSuggestions,
              isInsertSpaceAfterMention: true,
              textStyle: styles.mention_style,
              isBottomMentionSuggestionsRender: true,
              // getPlainString,
            }, {
              trigger: '#',
              renderSuggestions: renderHashtagSuggestions,
              textStyle: styles.mention_style,
            },]}
            multiline
            containerStyle={styles.contentInput}
            textAlign="left"
            textAlignVertical="top"
            placeholder={`Post details`}
          /> */}
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
    // color: 'blue',
    color: COLOR.PRIMARY_200,
    fontSize: FONTSIZE.SMALL,
    fontWeight: 'bold'
  },
  input_content: {
    color: COLOR.GREY_300,
    fontFamily: FONT_NAMES.Body,
  }
});