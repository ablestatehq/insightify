import React, { useContext } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'

import DatabaseService from '../../../appwrite/appwrite'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { environments } from '../../../constants/environments'
import { AppContext } from '../../../helper/context/AppContext'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUpWith, InputText, SubmitButton } from '../../../components'

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID
} = environments;
const SignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const signUpFormInitValues = {
    name: '',
    email: '',
    password: '',
    con_password: ''
  }

  const handleSignUpWithEmailAndPassword = async (values: any, formikHelpers: FormikHelpers<any>) => {
    try {
      // Signing up
      const signUpResponse = await DatabaseService.createAccountWithEmail(
        values.email,
        values.password
      ).then(data => data);

      // Log in the user after successful sign-up
      if (signUpResponse) {
        const createdUser = await DatabaseService.storeDBdata(APPWRITE_USER_COLLECTION_ID, {
          email: values.email,
          firstName: values.name.split(' ')[0],
          lastName: values.name.split(' ')[1]
        });

        if (createdUser) {
          const loggedIn = await DatabaseService.loginWithEmailAndPassword(signUpResponse.email, values.password);
          formikHelpers.resetForm({ values: signUpFormInitValues })
          setIsLoggedIn(true);
          navigation.goBack();
          navigation.goBack();
        }
      } else {
        // console.log(signUpResponse);
      }
    } catch (error) {
      // console.log('Sign-up or login error:', error);
      Alert.alert(
        'Sign-up or login failed',
        'An error occurred during sign-up or login.',
        [
          {
            text: 'OK',
            onPress: () => { },
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => { },
        }
      );
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
            onSubmit={handleSignUpWithEmailAndPassword}
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
    // textAlign: 'center'
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
    backgroundColor: COLOR.B_300,
    padding: 5,
    borderRadius: 5,
    width: '95%',
    margin: 10
  }
})