import React, { useState } from 'react'
import { Formik, FormikHelpers } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ShareSchema } from '../../../utils/validations'
import { OpportunitiesFormType } from '../../../utils/types'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import InputText from '../../../components/FomikComponents/InputText/InputText'
import SubmitButton from '../../../components/FomikComponents/SubmitButton/SubmitButton'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { storeData } from '../../../../api/strapiJSAPI'
import { CustomModal } from '../../../components'

const Share = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalTitle, setModalTitle] = useState<string>('');

  
  const handleOpportunitySubmission = async (values: any, formikHelpers: FormikHelpers<any>) => {
    try {
      const data: OpportunitiesFormType = {
        ...values
      }
      const response = await storeData('opportunities', data);
      if (response.data != null) {
        // ToastAndroid.show('Request successfully sent', 5000);
        formikHelpers.resetForm({
          values: formInitialValues
        });

        setShowModal(true);
        setModalTitle('Opportunity submission');
        setModalMessage('Opportunity has been submitted successfully. \nIt will reviewed by our team.')
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
  }


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
        <CustomModal
          title={modalTitle}
          message={modalMessage}
          cancelText='Ok'
          cancel={function (): void {setShowModal(false)}}
          visibility={showModal} />
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