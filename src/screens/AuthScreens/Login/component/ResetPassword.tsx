import { Text, TextInput, View, StyleSheet } from "react-native"
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Header from "../../../../components/Headers/Header";
import { COLOR, FONTSIZE } from "../../../../constants/contants";
import { Button } from "../../../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ResetScreenProps } from "../../../../utils/types";
import { resetPassword } from "../../../../../api/auth";

const ResetPassword = () => {
  // set password hooks
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const route = useRoute<ResetScreenProps>();
  const { email } = route.params;

  return (
    <View
      style={styles.container}
    >
      <Header
        title="Reset Password"
      />
      <View
        style={styles.contentContainer}
      >
        <View
          style={styles.inputView}
        >
          <Text
            style={styles.text}
          >
            Enter New Password
          </Text>
          <View
            style={styles.textInputView}
          >
            <TextInput
              style={styles.inputField}
              placeholder="at least 8 digits"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!passwordVisible}
            />
            <Feather
              name={!passwordVisible ? "eye" : "eye-off"}
              size={20}
              color={COLOR.SECONDARY_300}
              onPress={() => { setPasswordVisible(!passwordVisible) }}
            />
          </View>
        </View>
        <View
          style={styles.inputView}
        >
          <Text
            style={styles.text}
          >
            Confirm Password
          </Text>
          <View
            style={styles.textInputView}
          >
            <TextInput
              style={styles.inputField}
              placeholder="*******"
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={!confirmVisible}
            />
            <Feather
              name={!confirmVisible ? "eye" : "eye-off"}
              size={20}
              color={COLOR.SECONDARY_300}
              onPress={() => { setConfirmVisible(!confirmVisible) }}
            />
          </View>
        </View>

        {/* Button section  */}
        <View
          style={{
            padding: 5
          }}
        >
          <Button
            textStyle={styles.btnText}
            btn={styles.btn}
            title="Change Password"
            handlePress={async () => {
              if (password.length > 6 && password == confirmPassword) {
                const newData = {
                  email,
                  password
                }
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}


export default ResetPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  inputView: {
    width: "100%",
    // borderWidth: 1,
    padding: 5,
    marginVertical: 10
  },
  text: {
    fontFamily: ""
  },
  inputField: {
    fontFamily: "",
    // borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    textAlignVertical: "center",
    paddingHorizontal: 10,
    flex: 1,
  },
  btn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "center",
    padding: 5,
    backgroundColor: COLOR.SECONDARY_300,
    borderRadius: 5
  },
  btnText: {
    color: COLOR.WHITE,
    fontSize: FONTSIZE.BODY
  },
  textInputView: {
    width: "100%",
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 5,
    gap: 1,
    borderRadius: 5
  }
})