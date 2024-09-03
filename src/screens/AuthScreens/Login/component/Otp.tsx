import {TextInput, View, StyleSheet, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useState, useRef} from "react";
import Header from "../../../../components/Headers/Header";
import {Button} from "../../../../components";
import {COLOR, FONTSIZE} from "../../../../constants/constants";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {FONT_NAMES} from "../../../../assets/fonts/fonts";

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
        <Text style={{
          ...styles.text,
          marginBottom: 10
        }}>
          We sent you an email!
        </Text>
        <Text style={{
          ...styles.text,
          marginBottom: 10
        }}>
          Please check your email and click on the link provided.
        </Text>
          {/* <Button
          title="Verify"
          textStyle={styles.verifyText}
          btn={styles.verifyBtn}
          handlePress={() => {console.log('Hello there')}} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
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
    borderRadius: 5,
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
    fontFamily: FONT_NAMES.Body,
    textAlign: "center"
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.HEADING_5
  },
  verifyBtn: {
    backgroundColor: COLOR.GOLD,
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  verifyText: {
    fontFamily: FONT_NAMES.Body,
  }
})