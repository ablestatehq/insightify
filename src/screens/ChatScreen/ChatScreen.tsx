import React, {useContext} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {COLOR, DIMEN} from '../../constants/constants';
import Header from '../../components/Headers/Header';
import Message from '../../components/Cards/Message';
import useChat from '../../helper/customHooks/useChat';
import {AppContext} from '../../helper/context/AppContext';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import {
  View, FlatList, StyleSheet,
  Pressable, ActivityIndicator,
} from 'react-native';
import {SendCard} from '../../components';

const ChatScreen = () => {
  const {user, jwt} = useContext(AppContext);
  const {
    // refs
    textInputRef,
    // states
    messageMap,
    messages,
    onCloseReply,
    replyingTo,
    refreshing,
    newMessage,
    modalVisibility,
    handleModalVisibility,
    // set data
    setNewMessage,
    // handle data
    handleSendMessage,
    handleDeleteMessage,
    handleEndReached,
    onReaction,
    onReply,
  } = useChat(user.id, jwt);

  const renderMessage = React.useCallback(({item, index}: {item: string, index:number}) => {
    const msg = messageMap.get(item);
    return (
      <Message
        userId={user.id}
        onReaction={onReaction}
        onReply={onReply}
        onDelete={handleDeleteMessage}
        {...msg}
      />
    );
  }, [messageMap, user.id, onReaction, onReply, handleDeleteMessage]);
  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.contentHeader}>
          <View style={{flex: 1}}>
            <Header title='Chat' backgroundColor={COLOR.WHITE} />
          </View>
          {modalVisibility &&
            <View>
              <Pressable onPress={() => {
                handleModalVisibility();
              }}>
                <Octicons name="reply" size={15} color="black" />
              </Pressable>
              <Pressable>
                <AntDesign name="delete" size={15} color="black" />
              </Pressable>
            </View>
          }
        </View>
      </View>
      <View style={{flex: 1, padding: 15}}>
        {refreshing && (
          <View style={{alignItems: 'center', padding: 5, backgroundColor:'Transparent'}}>
            <ActivityIndicator size="small" color={COLOR.PRIMARY_200} />
          </View>
        )}
        <FlatList
          data={messages}
          inverted
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={renderMessage}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.0}
        />
      </View>
      <View style={styles.inputContainer}>
        <SendCard
          replyingTo={replyingTo}
          messageMap={messageMap}
          closeReply={onCloseReply}
          userId={user.id}
          textInputRef={textInputRef}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
        <Pressable
          style={{
            backgroundColor: COLOR.PRIMARY_300,
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 30,
            paddingLeft: 5,
            padding: 2.5,
          }}
          onPress={() => handleSendMessage(replyingTo as string)}
        >
          <Ionicons name="send" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.GREY_50,
  },
  contentHeader: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLOR.WHITE,
    paddingRight: DIMEN.PADDING.ME,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 5,
    gap: 10,
    padding: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  content: {},

  
});
