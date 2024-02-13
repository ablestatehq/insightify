import {
  StyleSheet,
  Text, View,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Picker } from "@react-native-picker/picker";
import { TalentSubmissionForm } from '../../utils/types';
import { COLOR, FONTSIZE } from '../../constants/contants';

import { TalentFormValidationSchema } from '../../utils/validations';
import InputText from '../../components/FomikComponents/InputText/InputText';
import SubmitButton from '../../components/FomikComponents/SubmitButton/SubmitButton';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { storeData } from '../../../api/strapiJSAPI';
import { CustomModal } from '../../components';

const FindTalent = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');
  
  const initialTalentFormValues = {
    client: '', // Client name
    email: '',
    phone: '',
    message: '', // Message left
    need: '', // Looking for
    heads: '', // Number of developers need.
    company: ''
  }

  // submit request form.
  const submitTalentRequestForm = async (values: TalentSubmissionForm, formikHelpers: FormikHelpers<any>) => {

    const submissionResponse = await storeData('talent-requests', values)
    if (submissionResponse.data != null) {
      // Toast a message to show the user that the request form has been successfully submitted.
      // ToastAndroid.show('Request successfully sent', 5000);
      setShowModal(true);
      setModalTitle('Talent Request');
      setModalMessage('Your talent request has been successfully submitted.')
      formikHelpers.resetForm({
        values: initialTalentFormValues
      })
    } else {
      // ToastAndroid.show('Failed to submit request', 5000);
      setShowModal(true);
      setModalTitle('Talent Request Error');
      setModalMessage('Your talent request has not been submitted....')
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
              fieldName='client'
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
              label='Company/Organisation'
              placeholder='Company/Organisation'
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
                selectedValue={values.need}
                onValueChange={handleChange('need')}
              >
                <Picker.Item
                  label="I'm looking for"
                  value=""
                />
                <Picker.Item
                  label="New software developer"
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
              {errors.need && touched.need && <Text style={styles.errorText}>{errors.need}</Text>}
            </View>
            {values.need == 'NewDeveloper' &&
              <InputText
                fieldName='heads'
                label='How many developers may you need?'
                placeholder='Enter number of developers'
              />}
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
      <CustomModal
        title={modalTitle}
        message={modalMessage}
        cancelText='Ok'
        cancel={function (): void {setShowModal(false)}}
        visibility={showModal} />
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