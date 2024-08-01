import React, {useContext} from 'react';
import {View, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import {Ionicons } from '@expo/vector-icons';
import Header from '../../components/Headers/Header';
import {COLOR} from '../../constants/constants';
import {AppContext} from '../../helper/context/AppContext';
import Message from '../../components/Cards/Message';
import useChat from '../../helper/customHooks/useChat';

const ChatScreen = () => {
  const {user, jwt} = useContext(AppContext);
  const {
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    handleDeleteMessage,
    flatListRef,
    errorMessage,
    hasMoreMessages,
    loadMessages,
  } = useChat(user.id, jwt);

  const renderMessage = ({ item }: any) => (
    <Message isSent={item.sender.data.id === user.id} message={item?.content} />
  );
  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.contentHeader}>
          <Header title='Chat' />
        </View>
      </View>
      <FlatList
        data={messages.reverse()}
        ref={flatListRef}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={renderMessage}
        onEndReached={() => {loadMessages()}}
        onEndReachedThreshold={0.1}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={{ ...styles.input, borderRadius: 100, paddingHorizontal: 15 }}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <Pressable
          style={{
            backgroundColor: COLOR.SECONDARY_300,
            justifyContent: 'center',
            alignItems: 'center',
            width: 40,
            height: 40,
            borderRadius: 30,
            paddingLeft: 5,
            padding: 2.5,
          }}
          onPress={handleSendMessage}
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
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  contentHeader: {
    width: '80%',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  content:{},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLOR.GREY_50,
    borderRadius: 5,
    padding: 5,
  },
});
