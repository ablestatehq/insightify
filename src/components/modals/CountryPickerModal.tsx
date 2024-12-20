import React from 'react'
import {CountryItem, CountryPicker} from 'react-native-country-codes-picker';

interface CountryPickerProps{
  isShow: boolean,
  handlePickerChange: (item: CountryItem) => void,
}
const CountryPickerModal = ({isShow, handlePickerChange}:CountryPickerProps) => {
  return (
    <CountryPicker
      show={isShow}
      inputPlaceholder='Uganda'
      pickerButtonOnPress={handlePickerChange}
      lang={'en'}
      style={{itemsList: { height: '50%', width: '100%'}}}
    />
  )
}

export default React.memo(CountryPickerModal);