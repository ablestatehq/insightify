import React, {useState, useEffect, useContext, useRef} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, Pressable} from 'react-native';
import {getStrapiData} from '../../../api/strapiJSAPI';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {Ionicons} from '@expo/vector-icons';
import {ProfileCard} from '../../components';
import Header from '../../components/Headers/Header';
import { AppContext } from '../../helper/context/AppContext';

const ChatScreen = () => {
  const {user, community} = useContext(AppContext)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);


  const fetchMessages = async () => {
    try {
      const data = await getStrapiData('group-messages');
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  
  return (
    <View style={styles.container}>
      <Header />
      <View style={{paddingVertical: 5, padding: 10}}>
        <Text style={{fontFamily: 'ComfortaaBold', fontSize: FONTSIZE.TITLE_1}}>Community chat</Text>
        <View style={{margin: 5, flexDirection: 'row'}}>
          {community.slice(0,15).map((member, index) => (
            <View
              key={index}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginLeft: index === 0 ? 0 : -5,
              }}>
              <ProfileCard text={member.email.slice(0,2).toUpperCase()} key={index} />
            </View>
          ))}
        </View>
      </View>
      <FlatList
        data={messages}
        ref={flatListRef}
        keyExtractor={(item: {id: string, message: string}) => item?.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => {
          return (
            <View style={styles.messageContainer}>
              <Text style={styles.sender}>{item?.message}</Text>
              <Text>{item?.message}</Text>
            </View>
          )
        }}
        ListEmptyComponent={() => (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{fontFamily: 'ComfortaaBold' }}>Chat empty</Text>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={{ ...styles.input, borderRadius: 100, paddingHorizontal: 15 }}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <Pressable style={{
          backgroundColor: COLOR.SECONDARY_300,
          justifyContent: 'center',
          alignItems: 'center',
          width: 40,
          height: 40,
          borderRadius: 30,
          paddingLeft: 5,
          padding: 2.5,
        }}
          onPress={() =>{}}
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
    backgroundColor: COLOR.WHITE
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10
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