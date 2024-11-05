import { Formik } from 'formik'
import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { COLOR, FONTSIZE } from '@constants/constants'
import { AppContext } from '@src/context/AppContext'
import { InputText, SubmitButton, Dialog } from '@components/index'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { login } from '@api/auth';
import { IDialogBox, LoginScreenProps } from '@src/types';
import { handleBookmark } from '@helpers/functions/handleFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KeyboardAvoidingView, Pressable, ScrollView,
  StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { storeToLocalStorage } from '@utils/localStorageFunctions';
import { FONT_NAMES } from '@fonts'
import { getFilteredData } from '@api/strapiJSAPI';

const Login: React.FC = () => {
  const route = useRoute<LoginScreenProps>();

  const { title, opportunityID } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [dialog, setDialog] = React.useState<IDialogBox>({
    visible: false,
    title: '',
    message: '',
    cancelText: 'Try again',
    onReject() {
      setDialog({ ...dialog, visible: false });
    },
  })
  const { setIsLoggedIn, opportunities, setOpportunities, setJwt, setUser, setXp } = useContext(AppContext);

  const loginFormInitValues = {
    email: '',
    password: ''
  }

  const displayTitle = () => {
    switch (title) {
      case 'Settings':
        return 'Good to \nhave you back';
      case 'Oppo':
        return 'Good to \nhave you back';
      default:
        return 'Welcome to Insightify'
    }
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
        setUser((prev: any) => ({ ...response?.user, isMember }));
        setXp(response?.user.totalXP ? response?.user.totalXP : 0);
        setIsLoggedIn(true);
        storeToLocalStorage('isMember', { isMember });

        if (opportunityID) {
          handleBookmark(
            opportunityID,
            opportunities,
            setOpportunities,
            'opportunities',
            'Offer saved',
            'Offer unsaved'
          )
          navigation.goBack();
        } else {
          switch (title) {
            case 'Settings':
              navigation.goBack();
              break;
            case 'Oppo':
              navigation.navigate('Share');
              break;
            default:
              navigation.navigate('Home');
          }
        }
      } else {
        setDialog((prev: IDialogBox) =>
        ({
          ...prev,
          visible: true,
          title: 'Login Error',
          message: 'Your login request has failed. Check your email and password'
        }));
      }
    } catch (error) { }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="close" size={30} color="black" onPress={() => navigation.goBack()} />
        <View />
      </View >
      <View style={styles.contentContainer}>
        <Text style={styles.text}>
          {displayTitle()}
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
        <Dialog {...dialog} />
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