import {
  StyleSheet,
  Text, View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { Dropdown } from 'react-native-element-dropdown';
import { TalentSubmissionForm } from '@utils/types';
import { COLOR, FONTSIZE } from '@constants/constants';

import { TalentFormValidationSchema } from '@utils/validations';
import InputText from '@components/FomikComponents/InputText/InputText';
import SubmitButton from '@components/FomikComponents/SubmitButton/SubmitButton';

import { CustomModal } from '@components/index';
import { storeData } from '@api/strapiJSAPI';
import { FONT_NAMES } from '@fonts'
import Header from '@components/Headers/Header';

const FindTalent = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  const initialTalentFormValues = {
    client: '',
    email: '',
    phone: '',
    message: '',
    need: '',
    heads: 0,
    company: ''
  }

  const serviceAvailable = [
    { label: 'New software developer', value: 'New software developer' },
    { label: 'Product Manager', value: 'Product Manager' },
    { label: 'Marketing Manager', value: 'Marketing Manager' },
    { label: 'Mobile developer', value: 'Mobile developer' }
  ];

  // submit request form.
  const submitTalentRequestForm =
    async (values: TalentSubmissionForm, formikHelpers: FormikHelpers<any>) => {
      const data = {
        ...values,
        heads: Number(values.heads)
      };
      const submissionResponse = await storeData('talent-requests', data);

      if (submissionResponse.data != null) {
        setShowModal(true);
        setModalTitle('Talent Request');
        setModalMessage('Your talent request has been successfully submitted.')
        formikHelpers.resetForm({
          values: initialTalentFormValues
        })
      } else {
        setShowModal(true);
        setModalTitle('Talent Request Error');
        setModalMessage('Your talent request has not been submitted....')
      }
    }
  return (
    <View style={styles.container}>
      <Header title='Hire Talent' />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.title}>Tell us about your need.</Text>
        <Text style={styles.description}>
          Start engaging our team to find the right solution for you.
        </Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
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
            <KeyboardAvoidingView>
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

                <Text style={{
                  marginLeft: 10,
                  marginBottom: 5,
                  fontFamily: FONT_NAMES.Title,
                  fontSize: FONTSIZE.TITLE_2,
                }}>I'm looking for</Text>
                <View style={{ borderWidth: 1, margin: 5, borderRadius: 5, paddingHorizontal: 5, borderColor: COLOR.SECONDARY_100, paddingVertical: 5, marginLeft: 10 }}>
                  <Dropdown
                    data={serviceAvailable}
                    labelField='label'
                    valueField='value'
                    value={values.need}
                    placeholder='Select service'
                    iconStyle={{ width: 15, height: 15 }}
                    placeholderStyle={{
                      color: COLOR.SECONDARY_75,
                    }}
                    onChange={function (item) { values.need = item.label }}
                  />
                </View>

                {values.need.includes('New software developer') &&
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
            </KeyboardAvoidingView>
          )}
        </Formik>
      </ScrollView>
      <CustomModal
        title={modalTitle}
        message={modalMessage}
        cancelText='Ok'
        cancel={function (): void { setShowModal(false) }}
        visibility={showModal} />
    </View>
  );
}

export default FindTalent

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  text: {
    fontFamily: FONT_NAMES.Body
  },
  title: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: FONT_NAMES.Title
  },
  description: {
    fontFamily: FONT_NAMES.Title
  },
  button: {
    alignSelf: 'center',
    backgroundColor: COLOR.SECONDARY_300,
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
    borderColor: COLOR.SECONDARY_300,
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
    backgroundColor: COLOR.SECONDARY_300,
    padding: 5,
    borderRadius: 5,
    margin: 10,
    width: '95%',
  }
})