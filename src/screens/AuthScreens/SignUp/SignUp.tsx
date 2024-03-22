import React, { useContext, useState } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { COLOR, FONTSIZE } from '../../../constants/contants'
import { AppContext } from '../../../helper/context/AppContext'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUpWith, InputText, SubmitButton, CustomModal } from '../../../components'
import { signUp } from '../../../../api/auth'

const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const signUpFormInitValues = {
    name: '',
    email: '',
    password: '',
    con_password: ''
  }

  const handleSignup = async (values: any, formikHelpers: FormikHelpers<any>) => {
    try {
      const signUpResponse = await signUp(values)

      if (signUpResponse?.jwt) {
        formikHelpers.resetForm()
        navigation.goBack()
      }
    } catch (error) {
      setShowModal(true);
      setModalTitle('Sign-up or login failed');
      setModalMessage('An error occurred during sign-up or login.');
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
        <CustomModal
          title={modalTitle}
          message={modalMessage}
          cancelText='Ok'
          cancel={function (): void { setShowModal(false) }}
          visibility={showModal} />
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
    fontFamily: 'RalewayBold',
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
  }
})