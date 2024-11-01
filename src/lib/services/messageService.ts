import {deteleteStrapiData, getStrapiData, storeData, updateStrapiData} from '@api/strapiJSAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchMessages = async (jwt: string, start = 0, limit = 25) => {
  return getStrapiData(`messages`, jwt, start, limit);
};

export const sendMessage = async (content: string, sender: number, jwt: string, replyTo: number | null) => {
  return  storeData('messages', {content, sender, status: 'sent', replyTo}, jwt)
};

export const sendReaction = async (content: string, userId: number, jwt: string, messageId: number) => {
  const emojiReactions: {[key: string]: string} = {
  '👍': 'like',
  '❤️': 'love',
  '😂': 'laugh',
  '😮': 'surprised',
  '😢': 'sad',
  '😡': 'angry'
  };
  return await storeData('message-reactions', {type: emojiReactions[content], user: userId, message: messageId}, jwt)
}

export const deleteMessageSearch = async (jwt: string, id: number) => {
  await deteleteStrapiData('messages', id, jwt);
};


export const updateMessage = async (id: number, data: any, jwt?: string) => {
  await updateStrapiData('messages', id, data, jwt);
}

export const saveMessagesToLocalStorage = async (messages: Map<string, any>) => {
  try {
    await AsyncStorage.setItem('cachedMessages', JSON.stringify(messages));
  } catch (error) {
  }
};

export const loadMessagesFromLocalStorage = async () => {
  try {
    const cachedMessages = await AsyncStorage.getItem('cachedMessages');
    return cachedMessages;
  } catch (error) {
    return;
  }
};