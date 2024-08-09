import {TextInput} from 'react-native';
import {useState, useEffect, useRef, useCallback} from 'react';
import {
  sendReaction,
  deleteMessageSearch,
  fetchMessages, sendMessage,
} from '../../lib/services/messageService';

type Message = {
  id?: number;
  content: string;
  messageReactions?: {data: Array<any>};
  receiptDetails?: {data: Array<any>};
  replies?: {data: Array<any>};
  replyTo: {data: Array<any>} | null;
  sender: {data: {id: number}};
  status: string;
};

const useChat = (userId: number, jwt: string) => {
  const [messageMap, setMessageMap] = useState<{[key: number]: any}>({});
  const [messages, setMessages] = useState<any[]>([]);
  const textInputRef = useRef<TextInput | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);

  const loadMessages = useCallback(async () => {
    try {
      // setRefreshing(true);
      const response = await fetchMessages(jwt, start, 25);
      const messagesMap = {};
      const messageArr: any[] = []
      // console.log(response?.data);
      response?.data?.forEach((msg: Message) => {
        messagesMap[msg?.id] = msg;
        messageArr.push(msg);
      });
      setMessageMap((prev) => ({...prev, ...messagesMap}));
      setMessages(prev => [...prev, ...messageArr.reverse()]);
      if (response?.data.length === response?.total) {
        setHasMoreMessages(false);
      }
    } catch (error) {
      setErrorMessage('Failed to load messages. Please check your internet connection.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleDeleteMessage = useCallback((id: number) => {
    setMessageMap((prev) => {
      const newMap = {...prev};
      delete newMap[id];
      return newMap;
    });
    // const newArr = Object.values(messageMap);
    // setMessages(prev => [...newArr.reverse()]);
    // Delete also from the server
    deleteMessageSearch(jwt, id);
  }, []);

  const handleSendMessage = async (replyingTo: number | null) => {
    if (!newMessage.trim()) return;

    const temporaryId = Math.floor(Math.random() * 1000000);
    const newMsg: Message = {
      id: temporaryId,
      content: newMessage,
      sender: {data: { id: userId }},
      replyTo: replyingTo ? {data: [{ id: replyingTo}]} : null,
      status: 'sending',
    };

    setMessageMap((prev) => ({[temporaryId]: newMsg, ...prev}));
    setMessages((prev) => [...prev, newMsg]);
    try {
      const savedMsg = await sendMessage(newMessage, userId, jwt, replyingTo);
      if (savedMsg.data) {
        setReplyingTo(null);
        setMessageMap((prev) => {
          const newMap = {...prev};
          delete newMap[temporaryId];
          return {[savedMsg.id]: savedMsg?.data?.attributes, ...newMap};
        });
        // Update the message list
        setMessages(prev_ => {
          const removeLast = [...prev_];
          removeLast.pop();
          removeLast.push(savedMsg?.data?.attributes);
          return removeLast;
        });
      }
    } catch (error) {
      setReplyingTo(null);
      setMessageMap((prev) => {
        const newMap = {...prev};
        newMap[temporaryId].status = 'failed';
        return newMap;
      });
    } finally {
      setNewMessage('');
    }
  };

  const handleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  const onReply = async (id: number) => {
    setReplyingTo(id);
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
