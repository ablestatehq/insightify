// hooks/useChat.ts
import { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { fetchMessages, sendMessage } from '../../lib/services/messageService';

type Message = {
  id?: number;
  content: string;
  messageReactions?: { data: Array<any> };
  receiptDetails?: { data: Array<any> };
  replies?: { data: Array<any> };
  replyTo?: { data: Array<any> };
  sender: { data: { id: number } };
  status: string;
};

const useChat = (userId: number, jwt: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageMap, setMessageMap] = useState<{ [key: number]: any }>({});
  const flatListRef = useRef<FlatList | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasMoreMessages, setHasMoreMessages] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async (start = 0, limit = 25) => {
    try {
      const data = await fetchMessages(jwt, start, limit);
      const messagesMap = {};
      data.forEach((msg: Message) => {
        messagesMap[msg?.id] = msg;
      });
      setMessageMap((prev) => ({ ...prev, ...messagesMap}));
      setMessages((prev) => [...prev, ...data.reverse()]);
      setHasMoreMessages(data.length === limit);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setErrorMessage('Failed to load messages. Please check your internet connection.');
    }
  };

  const handleDeleteMessage = (id: number) => {
    setMessageMap((prev) => {
      const newMap = { ...prev };
      delete newMap[id];
      return newMap;
    });
    // Delete also from the server
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const temporaryId = Math.floor(Math.random() * 1000000);
    const newMsg: Message = {
      id: temporaryId,
      content: newMessage,
      messageReactions: { data: [] },
      receiptDetails: { data: [] },
      sender: { data: { id: userId } },
      status: 'sending',
    };

    setMessageMap((prev) => ({ ...prev, [temporaryId]: newMsg }));
    setNewMessage('');

    try {
      const savedMsg = await sendMessage(newMessage, userId, jwt);
      setMessageMap((prev) => {
        const newMap = { ...prev };
        delete newMap[temporaryId];
        newMap[savedMsg.id] = savedMsg;
        return newMap;
      });
    } catch (error) {
      setMessageMap((prev) => {
        const newMap = { ...prev };
        newMap[temporaryId].status = 'failed';
        return newMap;
      });
    }
  };

  const messageArray = Object.values(messageMap);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [messageArray]);

  return {
    messages: messageArray,
    newMessage,
    setNewMessage,
    handleSendMessage,
    handleDeleteMessage,
    flatListRef,
    errorMessage,
    hasMoreMessages,
    loadMessages,
  };
};

export default useChat;
