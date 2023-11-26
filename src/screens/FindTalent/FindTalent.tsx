import {
  StyleSheet,
  Text, View,
  Pressable,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { Picker } from "@react-native-picker/picker";
import DatabaseService from '../../appwrite/appwrite';
import { TalentSubmissionForm } from '../../utils/types';
import { COLOR, FONTSIZE } from '../../constants/contants';
import { environments } from '../../constants/environments';
import { TalentFormValidationSchema } from '../../utils/validations';

// Access the environmental variables needed in this file.
const {
  APPWRITE_DATABASE_ID,
  APPWRITE_SERVICEREQUESTS_COLLECTION_ID
} = environments;

// submit request form.
const submitTalentRequestForm = async (values: TalentSubmissionForm) => {

  const submissionResponse = await DatabaseService.storeDBdata(
    APPWRITE_DATABASE_ID,
    APPWRITE_SERVICEREQUESTS_COLLECTION_ID,
    values
  );

  if (submissionResponse) {
    // Toast a message to show the user that the request form has been successfully submitted.
    ToastAndroid.show('Request successfully sent', 5000);
  }
}

const FindTalent = () => {

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
          padding: 5
        }}
      >
        <Text style={styles.title}>Tell us about your need.</Text>
        <Text style={styles.description}>
          Start engaging our team to find the right solution for you.
        </Text>
      </View>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          lookingFor: '',
        }}
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
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder='Name'
              style={styles.inputContainer}
            />
            {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder='Email'
              style={styles.inputContainer}
            />
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              placeholder='Phone'
              style={styles.inputContainer}
            />
            {errors.phone && touched.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            <TextInput
              onChangeText={handleChange('company')}
              onBlur={handleBlur('company')}
              value={values.company}
              placeholder='Company/Organization'
              style={styles.inputContainer}
            />
            {errors.company && touched.company && <Text style={styles.errorText}>{errors.company}</Text>}
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
            <TextInput
              onChangeText={handleChange('message')}
              onBlur={handleBlur('message')}
              value={values.message}
              placeholder='Enter details here...'
              style={styles.inputContainer}
              multiline
            />
            {errors.message && touched.message && <Text style={styles.errorText}>{touched.message}</Text>}

            <Pressable
              onPress={() => handleSubmit()}
              style={{
                ...styles.button,
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                gap: 5,
                opacity: isSubmitting ? 0.5 : 1

              }}
              disabled={isSubmitting}
            >

              {isSubmitting &&
                <ActivityIndicator
                  size='small'
                  color={COLOR.WHITE}
                />
              }
              <Text
                style={{
                  color: COLOR.WHITE,
                  textAlign: 'center',
                  fontFamily: "ComfortaaBold"
                }}
              >
                SEND
              </Text>
            </Pressable>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  )
}

export default FindTalent

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  text: {
    fontFamily: 'RalewayRegular'
  },
  title: {
    fontSize: FONTSIZE.TITLE_1,
    fontFamily: "RalewaySemiBold"
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
    padding: 10
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
  }
})