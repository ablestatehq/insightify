import { ActivityIndicator, Modal, StyleSheet, View, Text, StatusBar } from "react-native";
import { COLOR, FONTSIZE } from "../../constants/constants";

interface LoaderProps {
  message?: string
}
const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <Modal
      visible={true}
      animationType='none'
    >
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.NEUTRAL_1} />
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
          color={COLOR.PRIMARY_300}
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
    color: COLOR.SECONDARY_300
  }
});

export default Loader;