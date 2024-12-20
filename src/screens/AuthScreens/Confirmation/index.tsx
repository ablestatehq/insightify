import { View, StyleSheet, Text } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Header from "@src/components/headers/Header";
import { COLOR, FONTSIZE } from "@constants/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FONT_NAMES } from "@fonts";
import { ConfirmEmailScreenProps, RootStackParamList } from "@src/types";
import { emailConfirmation } from "@api/auth";
import { Button, Loader } from "@components/index";

export default function Index() {
  // navigation hook 
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ConfirmEmailScreenProps>();
  const [buttonText, setButtonText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { code } = route.params;

  useEffect(() => {
    if (code) {
      try {
        setIsLoading(true)
        emailConfirmation(code).then(response => {
          if (response) {
            navigation.navigate('Login', { title: '', opportunityID: '' });
          } else {
            setButtonText('Re-send email');
          }
        }).catch(error => {
        })
      } catch (error) {

      } finally { setIsLoading(false) }
    }
  }, [code]);

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
        {code && buttonText ? <Button
          title={buttonText}
          textStyle={styles.verifyText}
          btn={styles.verifyBtn}
          handlePress={() => { }} /> : null}
      </View>
      {isLoading ? <Loader /> : null}
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
    backgroundColor: COLOR.SECONDARY_300,
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  verifyText: {
    fontFamily: FONT_NAMES.Body,
    color: COLOR.WHITE,
  }
})