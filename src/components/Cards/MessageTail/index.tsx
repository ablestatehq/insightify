import { View } from "react-native";

interface MessageTail {
  isSent: boolean;
}
export default ({isSent}: MessageTail) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        [isSent ? 'right' : 'left']: -10,
        width: 10,
        height: 10,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        [isSent ? 'borderRightColor' : 'borderLeftColor']: '#FFFFFF',
        [isSent ? 'borderLeftColor' : 'borderRightColor']: 'transparent',
      }}
    />
  );
};