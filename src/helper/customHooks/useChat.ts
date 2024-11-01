import {useState, useEffect, useCallback} from 'react';
import {
  sendReaction,
  deleteMessageSearch,
  fetchMessages, sendMessage, updateMessage,
  loadMessagesFromLocalStorage,
  saveMessagesToLocalStorage
} from '@lib/services/messageService';
import {createClientSocket} from '@lib/socket';
import {Socket} from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Message = {
  id?: number;
  content: string;
  messageReactions?: {data: Array<any>};
  receiptDetails?: {data: Array<any>};
  replies?: {data: Array<any>};
  replyTo: {data: Array<any>} | null;
  sender: {data: {id: number}};
  status: string;
  createdAt: string;
};

const useChat = (userId: number, jwt: string) => {
  const [messageMap, setMessageMap] = useState<Map<string, any>>(new Map);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [selected, setSelected] = useState<string>('');


  // Store the latest 25 messages in AsyncStorage
  async function storeMessages(messages: Map<string, any>): Promise<void> {
    try {
      const latestMessages = Array.from(messages).slice(0, 25);
      await AsyncStorage.setItem('latestMessages', JSON.stringify(latestMessages));
    } catch (error) {
      console.error('Error storing messages: ', error);
    }
  }
  
  // Getting stored messages;
  async function getStoredMessages() {
    try {
      const storedMessages = await AsyncStorage.getItem('latestMessages');
      if (storedMessages !== null) {
      }
      // return null;
    } catch (error) {
      console.error('Error retrieving messages: ', error);
      // return null;
    }
  }
  
  const loadMessages = useCallback(async () => {
    try {
      // fetch messages from the server
      const response = await fetchMessages(jwt, start, 25);
      const messagesMap = new Map<string, any>();

      // Sort messages based on createdAt (latest first)
      response?.data?.sort((a: Message, b: Message) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      response?.data?.forEach((msg: Message) => {
        messagesMap.set(msg.createdAt, msg);
      });

      setMessageMap((prev) => new Map([
        ...Array.from(prev.entries()),
        ...Array.from(messagesMap.entries())
      ]));

      storeMessages(messageMap);
      if (response?.data.length === response?.total) {
        setHasMoreMessages(false);
      }
    } catch (error) {
      setErrorMessage('Failed to load messages. Please check your internet connection.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  const addToMessageMap = async (message: any) => {
    const key = message?.attributes?.createdAt;
    const msg = message?.attributes;
    setMessageMap((prev_map) => {
      const newMap = new Map(prev_map);
      newMap.set(key, msg);
      return newMap;
    });
  }

  const handleDeleteMessage = useCallback(async (key: string) => {
    setMessageMap((prevMap) => {
      const msgs = new Map(prevMap);
      const msgID = msgs.get(key)?.id;
      msgs.delete(key);
      try {
        deleteMessageSearch(jwt, msgID).then(() => { }).catch(error => {})
      } catch (error) {
        setErrorMessage('Failed to delete message. Please try again.');
      }
      return msgs;
    });
}, [messageMap, jwt]);


  // real time.
  const setupSocket = useCallback(() => {
    const clientSocket = createClientSocket(jwt);
    setSocket(clientSocket);
    clientSocket.on('connect', () => {
      clientSocket.on('onlineUsers', (data) => {});
    })

    clientSocket.on('message:create', ({data}) => {
      addToMessageMap(data);
    });
  }, [socket]);


  const handleSendMessage = async (replyingTo: string | null) => {
    if (!newMessage.trim()) return;
    try {
      // textInputRef.current?.clear;
      await sendMessage(newMessage, userId, jwt, messageMap.get(replyingTo as string)?.id);
    } catch (error) {
      const timeCreated = new Date().toISOString();
      const msg = new Map();
      const newMsg: Message = {
        content: newMessage,
        sender: {data: {id: userId }},
        replyTo: replyingTo !== null ? {data: [{ id: replyingTo }]} : null,
        status: 'sending',
        createdAt: timeCreated
      };
      setMessageMap((prevMap) => {
        const msgs = new Map(prevMap);
        if (!msgs.has(timeCreated)) {
          msgs.set(timeCreated, newMsg);
        }
        return msgs;
      });
      saveMessagesToLocalStorage(messageMap)
    } finally {
      setReplyingTo(null)
      setNewMessage('');
    }
  };

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const onReply = async (key: string) => {
    setReplyingTo(key);
  }

  const onCloseReply = () => {
    setReplyingTo(null);
  }

  const onReaction = async (key: string, emoji: any) => {
    // Update the user screen
    const id = messageMap.get(key)?.id;
    const reactionId = await sendReaction(emoji, userId, jwt, id);
    // update the message
    await updateMessage(id, {messageReactions: reactionId?.data?.id}, jwt)
  }

  const handleEndReached = useCallback(async () => {
    if (hasMoreMessages) {
      setStart(prev => prev + 25);
      await loadMessages();
    }
  }, []);

  useEffect(() => {
    const initializeChat = async () => {
      const cachedMsgs = await getStoredMessages();
      const cachedMessages = await loadMessagesFromLocalStorage();
      if (cachedMessages) {
        setMessageMap(JSON.parse(cachedMessages));
      } else {
        await loadMessages();
      }
    };

  initializeChat();
}, []);

  useEffect(() => {
    const newMsgs = Array.from(messageMap.keys()).sort((a: string, b: string) =>
      new Date(b).getTime() - new Date(a).getTime()
      );
    setMessages(newMsgs);
  }, [messageMap]);

  useEffect(() => {
    setupSocket();

    return () => {
      socket?.off('connect');
      socket?.off('message:create');
    }
  }, []);


  return {
    selected,
    setSelected,
    messages,
    messageMap,
    newMessage,
    setNewMessage,
    handleSendMessage,
    handleDeleteMessage,
    errorMessage,
    hasMoreMessages,
    handleEndReached,
    refreshing,
    onReply,
    onReaction,
    replyingTo,
    handleModalVisibility,
    modalVisibility,
    onCloseReply
  };
};

export default useChat;
