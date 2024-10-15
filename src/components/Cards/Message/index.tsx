import React from "react";
// import MessageTail from '../MessageTail';
import ReactionModal from "../ReactionModal";
import {COLOR, DIMEN} from "../../../constants/constants";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

interface MessageProps {
  userId: number
  id: number;
  replies: any;
  sender: any,
  replyTo: any;
  createdAt: any;
  content: string;
  receiptDetails: any;
  messageReactions: any;
  modalVisibility: boolean;
  msgKey: string;
  selected: string;
  setSelectedMsg: React.Dispatch<React.SetStateAction<string>>;
  handleModalVisibility: () => void;
  // onReply: (msgMapID: string) => void;
  onReaction: (emoji: string) => void;
  // onDelete: (key: string) => void;
}

export default function Message({
  // id,
  userId,
  content,
  sender,
  replyTo,
  messageReactions,
  onReaction,
  // onDelete,
  // onReply,
  msgKey,
  createdAt,
  modalVisibility,
  handleModalVisibility,
  setSelectedMsg,
}: MessageProps) {

  const emojiReactions: {[key: string] : string} = {
    like: '👍',
    love: '❤️',
    laugh: '😂',
    surprised: '😮',
    sad: '😢',
    angry: '😡'
  };
  
  // const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [modalPosition, setModalPosition] = React.useState<{top: number; left?: number, right?: number}>({top: 0});
  const messageRef = React.useRef<TouchableOpacity | null>(null);

  const isSent = sender?.data?.id === userId;

  const handleLongPress = () => {
    messageRef.current?.measure((fx, fy, width, height, px, py) => {
      if (isSent) {
        setModalPosition({top: py + height, right: fx + 10});
        // setModalVisible(true);
        setSelectedMsg(msgKey)
        handleModalVisibility()
      } else {
        setModalPosition({top: py + height, left: px})
        // setModalVisible(true);
        setSelectedMsg(msgKey)
        handleModalVisibility()
      }
    });
  }

  if(!sender?.data) return null
  return (
    <View style={{
      marginBottom: messageReactions?.data ? 20 : 0,
      alignSelf: isSent ? 'flex-end' : 'flex-start',
      // borderWidth:1,
    }}>
      <TouchableOpacity
        ref={messageRef}
        onLongPress={handleLongPress}
      >
        {/* <MessageTail isSent={isSent} /> */}
        <View style={[messageStyles.message, {
          backgroundColor: isSent ? COLOR.PRIMARY_50 : COLOR.WHITE,
        }]}>
          <Text style={messageStyles.senderStyle}>
            {sender?.data?.id === userId ? 'You'
            : sender?.data?.attributes.username}</Text>
          {replyTo?.data && <View style={[
            messageStyles.replyMessageContainer,
            {backgroundColor: isSent ? COLOR.P_TRANSPARENT_10 : COLOR.GREY_50}]}>
            <Text style={messageStyles.replyTo}>{replyTo?.data[0]?.id == userId ?
              'You' :
              replyTo?.data?.attributes.sender?.data?.attributes?.username}</Text>
            <Text numberOfLines={2} style={messageStyles.replyText}>
              {replyTo?.data?.attributes?.content}
            </Text>
          </View>}
          <Text
            style={[
              messageStyles.messageText,
              {
                color: COLOR.GREY_300,
              }]}>{content}</Text>
        </View>
      </TouchableOpacity>
      <View style={[messageStyles.reactionsContainer,
      {bottom: -16, right: 4}]}>
        {messageReactions?.data && messageReactions?.data.slice(0,10).map((reaction: any, index: number) => (
          <Text key={index} style={[messageStyles.reaction, { marginLeft: index === 0 ? 0 : -10 }]}>
            {emojiReactions[reaction?.attributes.type]}
          </Text>
        ))}
      </View>
      {/* <ReactionModal
        msgKey={createdAt}
        visible={modalVisibility}
        onClose={handleModalVisibility}
        // deleteMessage={onDelete}
        // onReply={onReply}
        onReaction={onReaction}
        modalPosition={modalPosition}
      /> */}
    </View>
  );
};

const messageStyles = StyleSheet.create({
  reaction: {
    // marginBottom: 10,
  },
  reactionsContainer: {
    alignSelf: 'flex-start',
    position: 'absolute',
    flexDirection: 'row',
  },
  message: {
    padding: 5,
    borderRadius: 10,
  },
  messageText: {
    borderRadius: 10,
    marginVertical: DIMEN.PADDING.ES,
    margin: DIMEN.PADDING.SM,
  },
  replyMessageContainer: {
    backgroundColor: COLOR.P_TRANSPARENT_10,
    // margin: 5,
    opacity: 0.9,
    padding: 5,
    borderRadius: DIMEN.PADDING.SM,
    borderLeftWidth: 3,
    borderLeftColor: COLOR.SECONDARY_200,
  },
  replyText: {
    color: COLOR.GREY_100,
  },
  replyTo: {
    color: COLOR.PRIMARY_400,
  },
  senderStyle: { fontSize: DIMEN.PADDING.ME, paddingRight: 10, padding: 5, color: COLOR.PRIMARY_100 }
})