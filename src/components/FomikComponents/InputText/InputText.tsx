import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useFormikContext } from 'formik'
import { COLOR, FONTSIZE } from '../../../constants/contants'

interface InputTextProps {
  label?: string
  placeholder?: string
  fieldName: string
  isMultiLine?: boolean
  isInputSecure?:boolean
}

const InputText: React.FC<InputTextProps> = ({ label, placeholder, fieldName, isMultiLine, isInputSecure }) => {
  const { values, handleChange, errors, touched, setFieldTouched } = useFormikContext<any>();

  const [inputFocused, setInputFocused] = React.useState<boolean>(false);

  const fieldError = touched[fieldName] && errors[fieldName];

  const handleFocus = () => {
    setInputFocused(true);
    setFieldTouched(fieldName, false);
  }

  const handleBlurInput = () => {
    setInputFocused(false);
    setFieldTouched(fieldName, true); 
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={{
        ...styles.labelText,
        // color:fieldError ? COLOR.DANGER : ''
      }}>{label}</Text>
      <View style={{
        ...styles.viewContainerTextInput,
        // borderColor: fieldError ? COLOR.DANGER : ''
      }}>
        <TextInput
          multiline={isMultiLine}
          numberOfLines={isMultiLine ? 5 : 2}
          placeholder={placeholder}
          // placeholderTextColor={fieldError ? COLOR.DANGER : ''}
          style={{
            ...styles.inputText,
            textAlignVertical:isMultiLine ? 'top' :'auto'
          }}
          onChangeText={handleChange(fieldName)}
          value={values[fieldName]}
          onBlur={handleBlurInput}
          onFocus={handleFocus}
          // keyboardType='url'
          secureTextEntry={isInputSecure}
        />
      </View>
      {fieldError && <Text style={styles.errorText}>{fieldError as string}</Text>}
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({
  inputContainer: {
    margin:10
  },
  inputText: {
    paddingHorizontal:5,
    fontFamily: 'ComfortaaBold',
  },
  viewContainerTextInput: {
    padding: 5,
    borderRadius:5,
    borderWidth: 0.5,
  },
  errorText: {
    color: COLOR.DANGER,
    fontFamily:'RalewayMedium'
  },
  labelText: {
    marginBottom:5,
    fontFamily: "RalewayBold",
    fontSize: FONTSIZE.TITLE_2,
  }
})