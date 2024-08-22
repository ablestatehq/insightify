import React from 'react'
import Message from '../Cards/Message';
import useChat from '../../helper/customHooks/useChat';
import {COLOR} from '../../constants/constants';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native'

interface MessageListProps {
  userId: number;
  messages: any[];
  jwt?: string;
  onReply: (content: string) => void;
}


const Index = ({
  userId,
  jwt,
  messages,
}: MessageListProps) => {
  
  const {
    onReaction,
    onReply,
    handleDeleteMessage,
    handleEndReached,
    refreshing,
  } = useChat(userId, jwt as string);

  const renderMessage = ({ item }: any) => (
    <Message
      isSent={item.sender.data.id === userId}
      onReaction={onReaction}
      onReply={onReply}
      onDelete={handleDeleteMessage}
      {...item}
    />
  );
  return (
    <View style={{ flex: 1, padding: 15 }}>
      {refreshing && (
        <View style={{ alignItems: 'center', padding: 5, backgroundColor: 'Transparent' }}>
          <ActivityIndicator size="small" color={COLOR.PRIMARY_200} />
        </View>
      )}
      <FlatList
        data={messages}
        inverted
        showsVerticalScrollIndicator={false}
        renderItem={renderMessage}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})