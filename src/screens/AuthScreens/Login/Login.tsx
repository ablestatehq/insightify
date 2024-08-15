import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { COLOR, FONTSIZE } from '../../../constants/constants'
import { AppContext } from '../../../helper/context/AppContext'
import { InputText, SubmitButton, CustomModal } from '../../../components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { login } from '../../../../api/auth';
import { LoginScreenProps } from '../../../utils/types';
import { handleBookmark } from '../../../helper/functions/handleFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { storeToLocalStorage } from '../../../utils/localStorageFunctions';
import { FONT_NAMES } from '../../../assets/fonts/fonts';
import { getFilteredData } from '../../../../api/strapiJSAPI';
// import {sendConfirmationEmail} from '../../../../api/strapiJSAPI';

const Login: React.FC = () => {
  const route = useRoute<LoginScreenProps>();

  const { title, opportunityID } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [modalTitle, setModalTitle] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {setIsLoggedIn, opportunities, setOpportunities, setJwt, setUser} = useContext(AppContext);

  const loginFormInitValues = {
    email: '',
    password: ''
  }

  const handleLogin = async (values: any) => {
    try {
      const response = await login(values.email, values.password);

      if (response?.jwt) {
        await AsyncStorage.setItem('user_token',
          JSON.stringify({
            token: response?.jwt,
            ...response.user
          }));

        setJwt(response?.jwt);
        const is_community_member = await getFilteredData('community-members', 'email', '$eq', response?.user.email);
        const isMember = is_community_member.length > 0;
        console.log('Community feedback: ', is_community_member)
        setUser((prev: any) => ({ ...response?.user, isMember }))
        setIsLoggedIn(true);
        storeToLocalStorage('isMember', { isMember });

        if (opportunityID) {
          handleBookmark(opportunityID, opportunities, setOpportunities)
          navigation.goBack()
        } else {
          if (title) {
            navigation.navigate('Share');
          } else {
            navigation.goBack();
            navigation.goBack();
          }
        }
      } else {
        setShowModal(true);
        setModalTitle('Login Error');
        setModalMessage('Login Failed');
      }
    } catch (error) { console.log('') }
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
                    button={styles.button}
                  />
                  <View>
                    <Pressable onPress={() => { navigation.navigate('Forgot') }}>
                      <Text style={styles.footerText}>Forgot password?</Text>
                    </Pressable>
                    <View style={styles.footer}>
                      <Text style={styles.footerText}>Don't have an account?</Text>
                      <TouchableOpacity
                        onPress={() => { navigation.navigate('SignUp') }}
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
        <CustomModal
          title={modalTitle}
          message={modalMessage}
          cancelText='ok'
          cancel={function (): void { setShowModal(false) }}
          visibility={showModal} />
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
    fontFamily: FONT_NAMES.Title,
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
    fontFamily: FONT_NAMES.Body,
    textAlign: 'center'
  },
  signUpText: {
    fontFamily: FONT_NAMES.Title
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
    backgroundColor: COLOR.SECONDARY_300,
    padding: 5,
    borderRadius: 5,
    width: '95%',
    margin: 10
  }
})