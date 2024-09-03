import { Text, TextInput, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Header from "../../../../components/Headers/Header";
import { COLOR, FONTSIZE } from "../../../../constants/constants";
import {Button, Dialog} from "../../../../components";
import { Formik } from "formik";
import { useResetPassword } from "../useResetPasswor";

const ResetPassword = () => {
  const {
    validationSchema,
    handleChangePassword,
    dialog,
    confirmVisible,
    setConfirmVisible,
    passwordVisible,
    setPasswordVisible
  } = useResetPassword();
  return (
    <View style={styles.container}>
      <Header title="Reset Password" />
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleChangePassword}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.contentContainer}>
            <View style={styles.inputView}>
              <Text style={styles.text}>Enter New Password</Text>
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.inputField}
                  placeholder="at least 8 digits"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={!passwordVisible}
                />
                <Feather
                  name={!passwordVisible ? "eye" : "eye-off"}
                  size={20}
                  color={COLOR.SECONDARY_300}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputView}>
              <Text style={styles.text}>Confirm Password</Text>
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.inputField}
                  placeholder="*******"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={!confirmVisible}
                />
                <Feather
                  name={!confirmVisible ? "eye" : "eye-off"}
                  size={20}
                  color={COLOR.SECONDARY_300}
                  onPress={() => setConfirmVisible(!confirmVisible)}
                />
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <View style={{padding: 5}}>
              <Button
                textStyle={styles.btnText}
                btn={styles.btn}
                title="Change Password"
                handlePress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
      <Dialog {...dialog} />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  inputView: {
    width: "100%",
    padding: 5,
    marginVertical: 10,
  },
  text: {
    fontFamily: "",
  },
  inputField: {
    fontFamily: "",
    padding: 5,
    borderRadius: 5,
    textAlignVertical: "center",
    paddingHorizontal: 10,
    flex: 1,
  },
  btn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    backgroundColor: COLOR.SECONDARY_300,
    borderRadius: 5,
  },
  btnText: {
    color: COLOR.WHITE,
    fontSize: FONTSIZE.BODY,
  },
  textInputView: {
    width: "100%",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 5,
    gap: 1,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    fontSize: FONTSIZE.SMALL,
    marginTop: 5,
  },
});
