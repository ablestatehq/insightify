import { Alert,KeyboardAvoidingView,ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Formik } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import SignUpWith from '../components/SignUpWith'
import { useNavigation } from '@react-navigation/native'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import InputText from '../../../components/FomikComponents/InputText/InputText'
import SubmitButton from '../../../components/FomikComponents/SubmitButton/SubmitButton'
import DatabaseService from '../../../appwrite/appwrite'
import { environments } from '../../../constants/environments'
import { AppContext } from '../../../helper/context/AppContext'


const { 
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID
} = environments;
const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { setIsLoggedIn } = useContext(AppContext);
  const loginFormInitValues = {
    email: '',
    password: ''
  }

  const handleLoginWithEmailAndPassword = async (values:any) => {
    try {
      const response = await DatabaseService.loginWithEmailAndPassword(values.email, values.password)
      if (response) {
        // const data = await DatabaseService.getDocument(APPWRITE_DATABASE_ID, APPWRITE_USER_COLLECTION_ID, response.userId);
        // const userData = data.documents[0];
        setIsLoggedIn(true);

        navigation.navigate('Share');

      } else {
        console.log(response)
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
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="black"
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Text
          style={styles.text}
        >
        </Text>
        <View />
      </View >
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          Good to {'\n'}have you back
        </Text>
        <View style={styles.loginView}>
          <Formik
            initialValues={loginFormInitValues}
            onSubmit={handleLoginWithEmailAndPassword}
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
                  <SubmitButton btnText='Login' handleSubmit={() => handleSubmit()} />
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
          <SignUpWith />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: FONTSIZE.HEADING_2,
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
    padding: 5
  },
  footerText: {
    fontFamily: 'RalewayRegular',
    textAlign:'center'
  },
  signUpText: {
    fontFamily:'RalewaySemiBold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent:'center'
  }
})