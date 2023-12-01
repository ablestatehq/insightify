import * as Yup from 'yup';

const TalentFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name too short')
    .max(70, 'Name too long')
    .required('Your name is required.'),
  email: Yup.string()
    .email('Invalid email'),
  phone: Yup.string()
    .min(10, "Number entered is too short.")
    .max(15, "Number entered is too long"),
  company: Yup.string()
    .required('Organization name is required'),
  message: Yup.string(),
  lookingFor: Yup.string()
    .required('Select a service you are looking for.'),
})
  .test(
  'contact-info',
  'At least one of email or phone is required',
  function (value) {
    const { email, phone } = value as { email: string, phone: string };
    if (!email && !phone) {
      return this.createError({
        path: 'email',
        message: 'At least one of email or phone is required',
      });
    }
    return true
  }
)

const ShareSchema = Yup.object().shape({
  title: Yup.string()
    .required('The title of the opportunity is required'),
  description: Yup.string()
    .required('Provide a short description of the Opportunity'),
  link: Yup.string()
    .url('Invalid URL')
    .required('Provide a link where the user can find more information about the Opportunity'),
  location: Yup.string()
    .required('Location is required'),
  companyName: Yup.string()
    .required('Company Name is required'),
  type: Yup.string()
    .required('Provide the type of the opportunity e.g Web design, coding'),
  expiryDate: Yup.date()
    .required('Expiry Date is required')
    .min(new Date(), 'Expiry Date must be in the future'), // Example: Expiry date should be in the future
});




export {
  TalentFormValidationSchema,
  ShareSchema
}