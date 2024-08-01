import React from "react";
import MessageTail from '../MessageTail'
import {TouchableOpacity, View, Text} from "react-native";
import {COLOR} from "../../../constants/constants";

interface MessageProps {
  message: any,
  isSent: boolean
}
export default function Message({message, isSent}: MessageProps) {
  return (
    <TouchableOpacity style={{
      flexDirection: isSent ? 'row' : 'row-reverse',
      marginVertical: 10,
    }}>
      <MessageTail isSent={isSent} />
      <View style={{
        backgroundColor: isSent ? COLOR.PRIMARY_50 : COLOR.GREY_50,
        borderRadius: 10,
        padding: 10,
      }}>
        <Text style={{
          // textAlign: isSent ? 'left' : 'right',
          color: '#333333',
          borderRadius: 10,
        }}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};