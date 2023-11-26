import * as Yup from 'yup';

const TalentFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name too short')
    .max(70, 'Name too long')
    .required('Your name is required.'),
  email: Yup.string()
    .email('Invalid email'),
    // .when('phone', {
    //   is: (phone: string) => !phone || phone.trim() === '',
    //   then: Yup.string().email("Email or phone is required"),
    //   otherwise: Yup.string().email().notRequired(),
    // }),
  phone: Yup.string()
    .min(10, "Number entered is too short.")
    .max(15, "Number entered is too long"),
    // .when('email', {
    //   is: (email: string) => !email || email.trim() === '',
    //   then: Yup.string().required("Email or phone is required"),
    //   otherwise: Yup.string().notRequired()
    // }),
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


export {
  TalentFormValidationSchema
}