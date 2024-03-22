import { Text, TextInput, StyleSheet, View, StatusBar, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../../components/Headers/Header";
import { Button } from "../../../../components";
import { COLOR } from "../../../../constants/contants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { forgotRequest } from "../../../../../api/auth";

export default function Forgot() {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // use hooks
  const [email, setEmail] = useState<string>("");

  // fonts to be used.
  return (
    <View
      style={styles.container}
    >
      {/* include the header  */}
      <Header title="Forgot password" />
      <View style={styles.contentContainer}>
        <View style={styles.inputView}>
          <Text style={styles.text}>
            Enter email address
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder="example@gmail.com"
            onChangeText={(text) => {
              setEmail(text)
            }}
          />
        </View>
        {/* send verification code  */}
        <Button
          title="Proceed"
          textStyle={{ color: COLOR.WHITE }}
          btn={{ ...styles.btn, backgroundColor: COLOR.SECONDARY_300 }}
          handlePress={async () => {
            if (email != ""
              && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
              const code = await forgotRequest(email)
              if (code) {
                console.log(code)
                // navigation.navigate('Reset', {email})
              } else {
                console.log('Failed', code)
                Alert.alert("Request Not Processed", "Reset password request failed", [
                  {
                    style: 'cancel',
                    text: 'Try again',
                    onPress: () => { }
                  }
                ],
                  {
                    cancelable: true,
                    onDismiss: () => { }
                  })
              }
            }
          }}
        />

        <View
          style={{
            marginTop: 20
          }}
        >
          <Text
            style={{
              textAlign: 'center',
            }}
          >Don't have an account?</Text>
          <Button title="Sign up"
            btn={{
              ...styles.btn,
              borderWidth: 1,
              borderColor: COLOR.SECONDARY_300
            }}
            textStyle={{}}
            handlePress={() => { navigation.navigate('SignUp') }}
          />
        </View>
      </View>
      <StatusBar backgroundColor={COLOR.WHITE} barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  contentContainer: {
    flex: 1,
    padding: 25
  },
  inputView: {
    width: '100%'
  },
  inputField: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: "",
    paddingLeft: 10,
    marginBottom: 10
  },
  text: {
    fontFamily: ""
  },
  btn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    margin: 5,
    padding: 5
  }
})