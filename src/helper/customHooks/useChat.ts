import {TextInput} from 'react-native';
import {useState, useEffect, useRef, useCallback} from 'react';
import {
  sendReaction,
  deleteMessageSearch,
  fetchMessages, sendMessage, updateMessage,
  loadMessagesFromLocalStorage,
  saveMessagesToLocalStorage
} from '../../lib/services/messageService';
import {createClientSocket} from '../../lib/socket';
import {Socket} from 'socket.io-client';

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
  const textInputRef = useRef<TextInput | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  const loadMessages = useCallback(async () => {
    try {
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
    })
  }

  const handleDeleteMessage = useCallback(async (key: string) => {
    // Delete also from the server
    const msgID = messageMap.get(key)?.id;
    setMessageMap(prev => {
      const msgs = new Map(prev);
      msgs.delete(key);
      return msgs;
    });
    try {
      await deleteMessageSearch(jwt, msgID);
    } catch (error) {
      setErrorMessage('Failed to delete message. Please try again.');
    }
  }, []);

  // real time.
  const setupSocket = useCallback(() => {
    const clientSocket = createClientSocket(jwt);
    setSocket(clientSocket);
    clientSocket.on('connect', () => {
      clientSocket.on('onlineUsers', (data) => { console.log(data) });
    })

    clientSocket.on('message:create', ({ data }) => {
      addToMessageMap(data)
    })
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
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 10);
  }

  const onCloseReply = () => {
    setReplyingTo(null);
  }

  const onReaction = async (key: string, emoji: any) => {
    // Update the user screen
    const id = messageMap.get(key)?.id;
    const reactionId = await sendReaction(emoji, userId, jwt, id);
    console.log(reactionId?.data.id)
    // update the message
    await updateMessage(id, {messageReactions: reactionId?.data?.id}, jwt)
  }

  const handleEndReached = useCallback(async () => {
    console.log(hasMoreMessages);
    if (hasMoreMessages) {
      setStart(prev => prev + 25);
      await loadMessages();
    }
  }, []);

  useEffect(() => {
  const initializeChat = async () => {
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
    textInputRef,
    handleModalVisibility,
    modalVisibility,
    onCloseReply
  };
};

export default useChat;
