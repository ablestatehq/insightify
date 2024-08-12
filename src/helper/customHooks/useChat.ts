import {TextInput} from 'react-native';
import {useState, useEffect, useRef, useCallback} from 'react';
import {
  sendReaction,
  deleteMessageSearch,
  fetchMessages, sendMessage,
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

  const addToMap = async (message: any) => {
    // set the new message to the message map;
    const key = message?.attributes?.createdAt;
    const msg = message?.attributes;
    setMessageMap((prev_map) => {
      const newMap = new Map(prev_map);
      newMap.set(key, msg);
      return newMap;
    })
  }

  const handleDeleteMessage = useCallback(async (key: string) => {
    // Update messageMap
    setMessageMap(prev => {
      const msgs = new Map(prev);
      msgs.delete(key);
      return msgs;
    });
    // Delete also from the server
    try {
      await deleteMessageSearch(jwt, messageMap.get(key).id);
    } catch (error) {
      setErrorMessage('Failed to delete message. Please try again.');
    }
  }, []);

  // real time.
  const setupSocket = useCallback(() => {
    const clientSocket = createClientSocket(jwt);
    setSocket(clientSocket);
    clientSocket.on('connect', () => {
      // console.log('In the online users: ')
      clientSocket.on('onlineUsers', (data) => {console.log(data)});
    })

    clientSocket.on('message:create', ({data}) => {
      // console.log('Data created in socket.io', data);
      addToMap(data)
    })
  }, [socket]);


  const handleSendMessage = async (replyingTo: string | null) => {
    
    if (!newMessage.trim()) return;

    // const timeCreated = new Date().toISOString()

    // const newMsg: Message = {
    //   content: newMessage,
    //   sender: {data:{id: userId}},
    //   replyTo: replyingTo !== null ? {data: [{ id: replyingTo }]} : null,
    //   status: 'sending',
    //   createdAt: timeCreated
    // };
    // const msg = new Map()
    // setMessageMap((prevMap) => {
    //   const msgs = new Map(prevMap);
    //   console.log('This is the new message: ',newMsg);
    //   if (!msgs.has(timeCreated)) {
    //     msgs.set(timeCreated, newMsg);
    //   }
    //   return msgs;
    // });
    // console.log('Before saving to the database: ', messageMap.size);
    try {
      const savedMsg = await sendMessage(newMessage, userId, jwt, messageMap.get(replyingTo as string)?.id);
      // if (savedMsg.data) {
      //   setReplyingTo(null);
      //   setMessageMap((prevMsg) => {
      //     const msgs = new Map(prevMsg);
      //     console.log('Here we are updating the messagae', savedMsg.data);
      //     if (msgs.has(timeCreated)) {
      //       msgs.set(timeCreated, savedMsg.data.data)
      //     }
      //     return msgs;
      //   });
      //   console.log('Hashmap size: ', messageMap.size);
      // }
    } catch (error) {
      console.error('There is an error while saving to the database',error)
      // setReplyingTo(null);
      // setMessageMap((prev) => {
      //   const msgs = new Map(prev);
      //   if (msgs.has(timeCreated)) {
      //     msgs.set(timeCreated, { ...newMsg, status: 'failed' });
      //   }
      //   return msgs
      // })
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

  const onReaction = async (id: number, emoji: any) => {
    // Update the user screen
    const reactionId = await sendReaction(emoji, userId, jwt, id);
    // First create the react entry
    // update the message
    // updateMessage(id, {messageReactions: reactionId}, )
  }

  const handleEndReached = useCallback(async () => {
    console.log(hasMoreMessages);
    if (hasMoreMessages) {
      setStart(prev => prev + 25);
      await loadMessages();
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    const newMsgs = Array.from(messageMap.keys()).reverse();
    setMessages(newMsgs);
  }, [messageMap]);

  useEffect(() => {
    setupSocket();
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
