import { Formik } from 'formik'
import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import DatabaseService from '../../../appwrite/appwrite'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { AppContext } from '../../../helper/context/AppContext'
import { SignUpWith, InputText, SubmitButton } from '../../../components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LoginScreenProps } from '../../../utils/types';
import { handleBookmark } from '../../../helper/functions/handleFunctions';
import { login } from '../../../../api/auth';

const Login: React.FC = () => {
  const route = useRoute<LoginScreenProps>();

  const { title, opportunityID } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { setIsLoggedIn, opportunities, setOpportunities } = useContext(AppContext);

  const loginFormInitValues = {
    email: '',
    password: ''
  }

  const handleLogin = async (values: any) => {
    try {
      const response = await login(values.email, values.password);

      if (response?.jwt) {
        setIsLoggedIn(true);

        if (opportunityID) {
          handleBookmark(opportunityID, opportunities, setOpportunities)
          navigation.navigate('Deck');
        } else {
          if (title) {
            navigation.navigate('Share');
          } else {
            navigation.goBack();
            navigation.goBack();
          }
        }
      } else {
        Alert.alert("Request failed", "Login request failed", [
          {
            style: 'cancel',
            text: 'Try again',
            onPress: () => { }
          }
        ],
          {
            cancelable: true,
            onDismiss: () => { }
          })
      }
    } catch (error) {
      // console.error("Error here", error)
    }
  }

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
          <AntDesign name="close" size={30} color="black" onPress={() => navigation.goBack()} />
          <View />
        </View >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            {(title as string).length > 0 ? title : 'Good to \nhave you back'}
          </Text>
          <View style={styles.loginView}>
            <Formik
              initialValues={loginFormInitValues}
              onSubmit={handleLogin}
            >
              {({ handleSubmit }) => (
                <View style={styles.loginScroll}>
                  <ScrollView>
                    <InputText
                      label='Email'
                      fieldName='email'
                      placeholder='example@gmail.com'
                    />
                    <InputText
                      label='Password'
                      fieldName='password'
                      isInputSecure={true}
                      placeholder='*******'
                    />
                    <SubmitButton
                      btnText='Login'
                      handleSubmit={() => handleSubmit()}
                      button={styles.button} />
                    <View>
                      <Text style={styles.footerText}>Forgot password?</Text>
                      <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account?</Text>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('SignUp')
                          }}
                        >
                          <Text style={styles.signUpText}> Sign up</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              )}
            </Formik>
            {/* <SignUpWith /> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  };

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingTop: 10
  },
  text: {
    fontSize: FONTSIZE.HEADING_3,
    fontFamily: 'RalewayBold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loginView: {
    width: '100%',
    marginTop: 50
  },
  loginScroll: {
    // padding: 5
  },
  footerText: {
    fontFamily: 'RalewayRegular',
    textAlign: 'center'
  },
  signUpText: {
    fontFamily: 'RalewaySemiBold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center'
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