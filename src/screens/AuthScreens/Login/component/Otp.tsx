import { TextInput, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import Header from "../../../../components/Headers/Header";
import { Button } from "../../../../components";
import { COLOR, FONTSIZE } from "../../../../constants/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Otp() {
  // navigation hook 
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  // Auto focus implemented.
  const handleOtpChange = (text: string, index: number) => {
    if (text == "") {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index > 0) {
        otpInputRefs[index - 1].current?.focus();
      }
    } else {
      if (/[0-9]/.test(text) && index >= 0 && index <= 3) {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (index < 3 && /[0-9]/.test(text)) {
          otpInputRefs[index + 1].current?.focus();
        }
      }
    }
  };

  return (
    // Enter the Otp here
    <View
      style={
        styles.container
      }
    >
      {/* Header section  */}
      <Header
        title="Verification"
      />
      <View
        style={styles.contentContainer}
      >
        {/* Verification section Text input section */}
        <Text style={{
          ...styles.text,
          marginBottom: 10
        }}>
          Enter Verification Code
        </Text>
        <View
          style={styles.roundedButtonContainer}
        >
          {
            otp.map((item, index) => (
              <TextInput
                key={index}
                ref={otpInputRefs[index]}
                maxLength={1}
                keyboardType="number-pad"
                style={styles.inputField}
                onChangeText={text => handleOtpChange(text, index)}
              />
            ))
          }
        </View>
        {/* Resend section  */}
        <View
          style={styles.resendSection}
        >
          <Text style={styles.text}>
            If you didn't receive the code
          </Text>
          <Button btn={styles.btn} textStyle={styles.btnText} title="Resend" handlePress={() => { }} />
        </View>

        <View>
          <Button title="Verify" textStyle={{}} btn={{}} handlePress={() => { }} />
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text
            style={{
              textAlign: 'center',
            }}
          >Do you have an account?</Text>
          <Button title="Sign up" btn={{}} textStyle={{}} handlePress={() => { }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  roundedButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    // borderWidth:1
    marginBottom: 10
  },
  btn: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: {
    color: COLOR.SECONDARY_300
  },
  resendSection: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  text: {
    fontFamily: "PoppinsRegular",
    textAlign: "center"
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    marginTop: 50
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontFamily: "PoppinsBold",
    fontSize: FONTSIZE.HEADING_5
  }
})