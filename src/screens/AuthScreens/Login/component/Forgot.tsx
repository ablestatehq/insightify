import {Text, StyleSheet, View, StatusBar} from "react-native";
import React, {useCallback, useMemo, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import Header from "../../../../components/Headers/Header";
import {Button, InputText} from "../../../../components";
import {COLOR} from "../../../../constants/constants";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {forgotRequest} from "../../../../../api/auth";
import {Formik} from "formik";
import {FONT_NAMES} from "../../../../assets/fonts/fonts";

interface FormValues {
  email: string;
}

export default function Forgot() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [loading, setLoading] = useState<boolean>(false);
  // Initial form values memoized to avoid unnecessary re-creations
  const initialValues = useMemo(
    () => ({
      email: "",
    }),
    []
  );

  // Memoize onSubmit handler
  const onSubmit = useCallback((values: FormValues) => {
    try {
      setLoading(true);
      forgotRequest(values.email)
        .then((response) => {
          console.log(loading)
          if (response.ok) {
            console.log("This is the response: ", response);
            navigation.navigate("Otp");
          }
        })
        .catch((error) => console.log("Something went wrong", error));
    } catch (error) { }
    finally {
      setLoading(false)
    }
    
  }, [navigation]);

  // Memoize navigation for Sign Up button
  const handleSignUpNavigation = useCallback(() => {
    navigation.navigate("SignUp");
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* header */}
      <Header title="Forgot password" />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <View style={styles.contentContainer}>
            <InputText
              fieldName={"email"}
              label="Enter email address"
              placeholder="email address"
            />
            <Button
              title="Proceed"
              textStyle={{ color: COLOR.WHITE }}
              isLoading={loading}
              btn={{ ...styles.btn, backgroundColor: COLOR.SECONDARY_300 }}
              handlePress={handleSubmit}
            />

            <View style={{ marginTop: 20 }}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Button
                title="Sign up"
                btn={{ ...styles.btn, ...styles.signupBtn }}
                handlePress={handleSignUpNavigation}
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
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    flex: 1,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 5,
  },
  signupText: {
    textAlign: "center",
    fontFamily: FONT_NAMES.Title,
  },
  signupBtn: {
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_300,
  },
});
