import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, DIMEN } from '@constants/constants';
import Header from '@components/Headers/Header';
import Message from '@components/Cards/Message';
import useChat from '@helpers/customHooks/useChat';
import { AppContext } from '@helpers/context/AppContext';

import {
  View, FlatList, StyleSheet,
  Pressable, ActivityIndicator,
} from 'react-native';
import { SendCard } from '@components';

const ChatScreen = () => {
  const { user, jwt } = useContext(AppContext);
  const {
    selected,
    setSelected,
    messageMap,
    messages,
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
    onCloseReply,
  } = useChat(user.id, jwt);

  const sendMessage = () => handleSendMessage(replyingTo as string);
  const renderMessage = React.useCallback(({ item }: { item: string }) => {
    const msg = messageMap.get(item);
    return (
      <View
        key={item}
        style={{
          margin: DIMEN.PADDING.ES,
          padding: DIMEN.PADDING.ES,
        }}
      >
        <Message
          key={item}
          userId={user.id}
          msgKey={item}
          selected={selected}
          onReaction={onReaction}
          setSelectedMsg={setSelected}
          handleModalVisibility={handleModalVisibility}
          modalVisibility={modalVisibility}
          {...msg}
        />
      </View>
    );
  }, [messageMap]);

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <View style={styles.navStyle}>
          <Header
            title='Chat'
            backgroundColor={COLOR.WHITE}
            showMore={modalVisibility}
            selected={selected}
            onReply={onReply}
            onDelete={handleDeleteMessage}
            onClose={handleModalVisibility}
          />
        </View>
      </View>
      <View style={styles.messagesContainer}>
        {refreshing ? (
          <View style={styles.refreshStyle}>
            <ActivityIndicator size="small" color={COLOR.PRIMARY_200} />
          </View>
        ) : null}
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
          newMessage={newMessage}
          setNewMessage={setNewMessage}
        />
        <Pressable
          style={styles.sendBtnStyle}
          onPress={sendMessage}
        >
          <Ionicons name="send" size={18} color={COLOR.WHITE} />
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
  messagesContainer: {
    flex: 1, padding: 15,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 5,
    gap: 10,
    padding: 5,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    // padding: 10,
    borderRadius: 10,
  },
  content: {},
  sendBtnStyle: {
    backgroundColor: COLOR.PRIMARY_300,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 30,
    paddingLeft: 5,
    padding: 2.5,
  },
  refreshStyle: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'Transparent',
  },
  navStyle: { flex: 1 }
});
