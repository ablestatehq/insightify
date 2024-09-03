import { Text, TextInput, StyleSheet, View, StatusBar, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../../components/Headers/Header";
import { Button, InputText } from "../../../../components";
import { COLOR } from "../../../../constants/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { forgotRequest } from "../../../../../api/auth";
import {Formik} from "formik";
import { FONT_NAMES } from "../../../../assets/fonts/fonts";

interface FormValues{
  email: string;
}
export default function Forgot() {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // use hooks
  const [email, setEmail] = useState<string>("");

  // fonts to be used.
  const initialValues: FormValues = {
    email: ''
  }

  const onSubmit =  (values: FormValues) => {
    forgotRequest(values.email)
      .then(response => {
        if (response.ok) {
          navigation.navigate('Otp');
        }
      })
      .catch(error => console.log('Something went wrong', error))
  }

  return (
    <View
      style={styles.container}
    >
      {/* header  */}
      <Header title="Forgot password" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({handleSubmit, handleChange}) => (
          <View style={styles.contentContainer}>
            <InputText
              fieldName={"email"}
              label="Enter email address"
              placeholder="email address"
            />
            <Button
              title="Proceed"
              textStyle={{color: COLOR.WHITE }}
              btn={{ ...styles.btn, backgroundColor: COLOR.SECONDARY_300}}
              handlePress={handleSubmit}
            />

            <View
              style={{
                marginTop: 20
              }}
            >
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Button title="Sign up"
                btn={{...styles.btn, ...styles.signupBtn}}
                textStyle={{}}
                handlePress={() => { navigation.navigate('SignUp') }}
              />
            </View>
          </View>
        )}
      </Formik>
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
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 5
  },
  signupText: {
    textAlign: 'center',
    fontFamily: FONT_NAMES.Title,
  },
  signupBtn: {
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_300
  }
})