import { ActivityIndicator, Modal, StyleSheet, View, Text } from "react-native";
import { COLOR, FONTSIZE } from "../../constants/contants";

interface LoaderProps{
  message?: string
}
const Loader = ({message}:LoaderProps) => {
  return (
    <Modal
      transparent={true}
      visible={true}
      animationType='none'
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLOR.NEUTRAL_1
        }}
      >
        <ActivityIndicator
          size='large'
          style={{
            backgroundColor: 'transparent',
          }}
          color={COLOR.ORANGE_300}
        />
        <Text
          style={styles.text}
        >{message}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: FONTSIZE.TITLE_2,
    color:COLOR.B_300
  }
});

export default Loader;