import {
  StyleSheet,
  Text, View,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Picker } from "@react-native-picker/picker";
import DatabaseService from '../../appwrite/appwrite';
import { TalentSubmissionForm } from '../../utils/types';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { environments } from '../../constants/environments';

import { TalentFormValidationSchema } from '../../utils/validations';
import InputText from '../../components/FomikComponents/InputText/InputText';
import SubmitButton from '../../components/FomikComponents/SubmitButton/SubmitButton';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Access the environmental variables needed in this file.
const {
  APPWRITE_SERVICEREQUESTS_COLLECTION_ID
} = environments;

const FindTalent = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const initialTalentFormValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    lookingFor: '',
  }

  // submit request form.
  const submitTalentRequestForm = async (values: TalentSubmissionForm, formikHelpers: FormikHelpers<any>) => {

    const submissionResponse = await DatabaseService.storeDBdata(
      APPWRITE_SERVICEREQUESTS_COLLECTION_ID,
      values
    );

    if (submissionResponse) {
      // Toast a message to show the user that the request form has been successfully submitted.
      ToastAndroid.show('Request successfully sent', 5000);
      formikHelpers.resetForm({
        values: initialTalentFormValues
      })
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
          padding: 5,
          marginTop: 25
        }}
      >
        <Text style={styles.title}>Tell us about your need.</Text>
        <Text style={styles.description}>
          Start engaging our team to find the right solution for you.
        </Text>
      </View>
      <Formik
        initialValues={initialTalentFormValues}
        onSubmit={submitTalentRequestForm}
        validationSchema={TalentFormValidationSchema}
      >
        {(
          {
            values,
            errors,
            touched,
            isSubmitting,
            handleBlur,
            handleSubmit,
            handleChange,
          }
        ) => (
          <ScrollView
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <InputText
              label='Name'
              fieldName='name'
              placeholder='Enter your name e.g Gideon'
            />

            <InputText
              label='Email'
              fieldName='email'
              placeholder='example@gmail.com'
            />

            <InputText
              fieldName='phone'
              label='Phone number'
              placeholder='e.g 077777777'
            />

            <InputText
              fieldName='company'
              label='Company Name'
              placeholder='e.g Insightify'
            />

            <View
              style={{
                borderWidth: 1,
                margin: 10,
                borderRadius: 10,
                borderColor: COLOR.B_300
              }}
            >
              <Picker
                selectedValue={values.lookingFor}
                onValueChange={handleChange('lookingFor')}
              >
                <Picker.Item
                  label="I'm looking for"
                  value=""
                />
                <Picker.Item
                  label="New Software develoepr"
                  value="NewDeveloper"
                />
                <Picker.Item
                  label="Assistance to developer a software"
                  value="assistantDeveloper"
                />
                <Picker.Item
                  label="Support for my existing IT team"
                  value="supportIT"
                />
                <Picker.Item
                  label="Tool to manage/sale my training program"
                  value="toolManager"
                />
              </Picker>
              {errors.lookingFor && touched.lookingFor && <Text style={styles.errorText}>{errors.lookingFor}</Text>}
            </View>
            <InputText
              isMultiLine={true}
              fieldName='message'
              label='Tell us more'
              placeholder='Tell us more about your need'
            />
            <SubmitButton
              button={styles.submit_button}
              handleSubmit={() => handleSubmit()}
            />
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  )
}

export default FindTalent

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  text: {
    fontFamily: 'RalewayRegular'
  },
  title: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: "RalewayBold"
  },
  description: {
    fontFamily: 'RalewayMedium'
  },
  button: {
    alignSelf: 'center',
    backgroundColor: COLOR.B_300,
    padding: 5,
    borderRadius: 5,
    width: '95%'
  },
  formContainer: {
    padding: 10,
  },
  inputContainer: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    borderColor: COLOR.B_300,
    fontFamily: 'ComfortaaMedium'
  },
  errorText: {
    color: COLOR.DANGER,
    paddingHorizontal: 10
  },
  submit_button: {
    alignContent: "center",
    justifyContent: "center",
    alignSelf: 'center',
    backgroundColor: COLOR.B_300,
    padding: 5,
    borderRadius: 20,
    margin: 10,
    width: '40%',
  }
})