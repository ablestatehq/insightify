// import React from 'react'
// import { COLOR, FONTSIZE } from '../../../constants/constants'
// import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// // import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
// import { AntDesign } from '@expo/vector-icons';

// interface InputTextProps {
//   label?: string
//   date: Date
//   setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
// }

// const DateInput: React.FC<InputTextProps> = ({label, date, setDate}) => {
//   // const [date, setDate] = useState<Date>(new Date());

//   // const { values, handleChange, errors, touched, setFieldTouched } = useFormikContext<any>();

//   const [open, setOpen] = React.useState<boolean>(false);

//   // const fieldError = touched[fieldName] && errors[fieldName];

//   const showDate = (currentMode:any) => {
//     DateTimePickerAndroid.open({

//       value: date,
//       onChange: (_event, seletedDate) => {
//         const currentDate = seletedDate;
//         setDate(currentDate)
//       },
//       mode: currentMode,
//       is24Hour: true,
//     });
//   };

//   const showDatePicker = () => {
//     showDate('date')
//   };
//   return (
//     <View style={styles.inputContainer}>
//       <Text style={{
//         ...styles.labelText,
//       }}>{label}</Text>
//       <View style={{
//         ...styles.viewContainerTextInput,
//       }}>
//         <TouchableOpacity
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             borderWidth: 1,
//             borderRadius: 5,
//             padding: 5,
//             borderColor: COLOR.SECONDARY_300
//           }}
//           onPress={() => showDatePicker()}
//         >
//           <AntDesign name='calendar' size={20} color={COLOR.SECONDARY_300} />
//           <TextInput
//             style={{
//               padding: 5,
//               flex: 1
//             }}
//             editable={false}
//             value={date.toLocaleDateString()} />
//         </TouchableOpacity>
//       </View>
//       {/* {fieldError && <Text style={styles.errorText}>{fieldError as string}</Text>} */}
//     </View>
//   )
// }

// export default React.memo(DateInput);

// const styles = StyleSheet.create({
//   inputContainer: {
//     margin: 10
//   },
//   inputText: {
//     paddingHorizontal: 5,
//     fontFamily: FONT_NAMES.Heading,
//   },
//   viewContainerTextInput: {
//     padding: 5,
//     borderRadius: 5,
//     borderWidth: 0.5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   errorText: {
//     color: COLOR.DANGER,
//     fontFamily: FONT_NAMES.Title
//   },
//   labelText: {
//     marginBottom: 5,
//     fontFamily: FONT_NAMES.Title,
//     fontSize: FONTSIZE.TITLE_2,
//   }
// })