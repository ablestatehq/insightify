import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { COLOR, FONTSIZE } from '@constants/constants'

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { InputText, SubmitButton, Dialog } from '@components/index';
import { signUp } from '@api/auth'
import { FONT_NAMES } from '@fonts'
import { IDialogProps, RootStackParamList } from '@src/types'

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [dialog, setDialog] = React.useState<IDialogProps>({
    visible: false,
    title: '',
    message: '',
    cancelText: 'Try again',
    onReject() {
      setDialog({ ...dialog, visible: false })
    },
  })
  const signUpFormInitValues = {
    name: '',
    email: '',
    password: '',
    con_password: '',
  }

  const handleSignup = async (values: any, formikHelpers: FormikHelpers<any>) => {
    try {
      const signUpResponse = await signUp(values);
      if (signUpResponse) {
        // const emailValidationResponse = await sendConfirmationEmail(signUpResponse?.user?.email, '');
      }
      formikHelpers.resetForm();
      navigation.navigate('ConfirmEmail', {});
    } catch (error) {
      setDialog((prev: IDialogProps) => ({
        ...prev,
        visible: true,
        title: 'Sign-up or login failed',
        message: 'An error occurred during sign-up or login.'
      }))
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="black"
          onPress={() => {
            navigation.goBack()
          }}
        />
        <View />
      </View >
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Get Started</Text>
        <View style={styles.loginView}>
          <Formik
            initialValues={signUpFormInitValues}
            onSubmit={handleSignup}
          >
            {({ handleSubmit }) => (
              <ScrollView>
                <InputText
                  label='Name'
                  fieldName='name'
                  placeholder='e.g Kenedy Roggers'
                />
                <InputText
                  label='Email'
                  fieldName='email'
                  placeholder='example@gmail.com'
                />
                <InputText
                  label='Password'
                  fieldName='password'
                  isInputSecure={true}
                  placeholder='password'
                />
                <InputText
                  label='Confirm Password'
                  fieldName='con_password'
                  isInputSecure={true}
                  placeholder='confirm password'
                />
                <SubmitButton
                  btnText='Sign Up'
                  handleSubmit={() => handleSubmit()}
                  button={styles.button}
                />
              </ScrollView>
            )}
          </Formik>
          {/* <SignUpWith /> */}
        </View>
        <Dialog {...dialog} />
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1
  },
  text: {
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.HEADING_3,
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  loginView: {},
  header: {
    padding: 5,
  },
  button: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
    alignSelf: 'center',
    backgroundColor: COLOR.SECONDARY_300,
    padding: 5,
    borderRadius: 5,
    width: '95%',
    margin: 10
  },

})