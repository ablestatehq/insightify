import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {FormikHelpers } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../../../../api/auth";
import { IDialogBox, RootStackParamList, ResetScreenProps } from "../../../utils/types";

export const useResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [dialog, setDialog] = useState<IDialogBox>({
    title: '',
    message: '',
    visible: false,
    cancelText: '',
    onReject: () => {},
  });
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<ResetScreenProps>();
  const { code } = route.params;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleChangePassword = async (
    values: { password: string; confirmPassword: string },
    actions: FormikHelpers<{ password: string; confirmPassword: string }>
  ) => {
    try {
      const { password } = values;
      const response = await resetPassword(password, code);
      // alert(`${code}\n${JSON.stringify(response, null, 2)}`)
      if (response.user) {
        setDialog({
          title: "Confirmation",
          message: "Password has been successfully updated",
          visible: true,
          cancelText: "OK",
          onReject: () => {
            setDialog((prev) => ({ ...prev, visible: false }));
            navigation.navigate("Login", { title: '', opportunityID: '' });
          },
        });
      } else {
        setDialog({
        title: "Password change request",
        message: "Request to change password has failed",
        visible: true,
        cancelText: "TRY AGAIN",
        onReject: () => {
          setDialog((prev) => ({ ...prev, visible: false }));
        },
      });
      }
    } catch (error) {
      setDialog({
        title: "Password change request",
        message: "Request to change password has failed",
        visible: true,
        cancelText: "TRY AGAIN",
        onReject: () => {
          setDialog((prev) => ({ ...prev, visible: false }));
        },
      });
      actions.setSubmitting(false);
    }
  };

  return {
    validationSchema,
    handleChangePassword,
    dialog,
    setDialog,
    passwordVisible, 
    setPasswordVisible, 
    confirmVisible, 
    setConfirmVisible,
  };
};
