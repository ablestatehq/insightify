import React from 'react'
import { Formik, FormikHelpers } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ShareSchema } from '../../../utils/validations'
import { OpportunitiesFormType } from '../../../utils/types'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import InputText from '../../../components/FomikComponents/InputText/InputText'
import SubmitButton from '../../../components/FomikComponents/SubmitButton/SubmitButton'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { storeData } from '../../../../api/strapiJSAPI'

const Share = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleOpportunitySubmission = async (values: any, formikHelpers: FormikHelpers<any>) => {
    try {
      const data: OpportunitiesFormType = {
        ...values
      }
      console.log(data);
      const response = await storeData('talent-requests', data);
      if (response.data != null) {
        ToastAndroid.show('Request successfully sent', 5000);
        formikHelpers.resetForm({
          values:formInitialValues
        })
      }
    } catch (error) {}
  };

  const formInitialValues = {
    link: "",
    type: "",
    title: "",
    location: "",
    expireDate: "",
    description: "",
    companyName: "",
    // tag: [],
    // category:'' // category of the opportunity.
  }

  const handleTagAddition = (newTag: string) => {
    console.log('New tag added:', newTag);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={30}
          color="black"
          onPress={() => {

            navigation.navigate('Home')
          }}
        />
        <Text
          style={styles.text}
        >
          Opportunity Hub Form
        </Text>
        <View />
      </View >
      <View style={styles.formContainer}>
        <Formik
          validationSchema={ShareSchema}
          initialValues={formInitialValues}
          onSubmit={handleOpportunitySubmission}
        >
          {({ handleSubmit }) => (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.formViewContainer}
            >
              <InputText
                label='Title'
                fieldName='title'
                placeholder='Title'
              />
              <InputText
                label='Description'
                isMultiLine={true}
                fieldName='description'
                placeholder='Provide a simple description of the opportunity'
              />
              <InputText
                label='Link'
                fieldName='link'
                placeholder='e.g https://www.example.com'
              />
              <InputText
                label='Location'
                fieldName='location'
                placeholder='Location'
              />
              <InputText
                label='Company Name'
                fieldName='companyName'
                placeholder='Company Name'
              />
              <InputText
                label='Type'
                fieldName='type'
                placeholder='Type e.g Coding, Product Manager'
              />
              {/* <TagInput
                onAddTag={handleTagAddition}
              /> */}
              <InputText
                label='Expiry Date'
                fieldName='expireDate'
                placeholder='e.g YYYY-MM-DD'
              />
              <SubmitButton
                handleSubmit={() => handleSubmit()}
                button={styles.buttonStyle}
              />
            </ScrollView>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Share;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'RalewayBold',
    fontSize: FONTSIZE.TITLE_1,
  },
  header: {
    flexDirection: 'row',
    padding: 5,
  },
  formContainer: {
    flex: 1,
    padding: 10
  },
  formViewContainer: {
    padding: 5
  },
  buttonStyle: {
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