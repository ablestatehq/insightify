import React from 'react'
import { useFormikContext } from 'formik'
import { Feather } from '@expo/vector-icons'
import { COLOR, FONTSIZE } from '../../../constants/constants'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { FONT_NAMES } from '../../../assets/fonts/fonts'

interface InputTextProps {
  label?: string
  fieldName: string
  placeholder?: string
  isMultiLine?: boolean
  isInputSecure?: boolean
}

const InputText: React.FC<InputTextProps> = ({ label, placeholder, fieldName, isMultiLine, isInputSecure }) => {
  const { values, handleChange, errors, touched, setFieldTouched } = useFormikContext<any>();

  const [inputFocused, setInputFocused] = React.useState<boolean>(false);
  const [visible, setVisible] = React.useState<boolean>(isInputSecure as boolean);

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
            textAlignVertical: isMultiLine ? 'top' : 'auto',
            flex: 1
          }}
          onChangeText={handleChange(fieldName)}
          value={values[fieldName]}
          onBlur={handleBlurInput}
          onFocus={handleFocus}
          // keyboardType='url'
          secureTextEntry={visible}
        />
        {isInputSecure && <Feather
          name={visible ? "eye" : "eye-off"}
          size={20}
          color={COLOR.SECONDARY_300}
          onPress={() => setVisible(!visible)}
        />}
      </View>
      {fieldError && <Text style={styles.errorText}>{fieldError as string}</Text>}
    </View>
  )
}

export default React.memo(InputText)

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10
  },
  inputText: {
    paddingHorizontal: 5,
    fontFamily: FONT_NAMES.Heading,
  },
  viewContainerTextInput: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  errorText: {
    color: COLOR.DANGER,
    fontFamily: FONT_NAMES.Title
  },
  labelText: {
    marginBottom: 5,
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_2,
  }
})