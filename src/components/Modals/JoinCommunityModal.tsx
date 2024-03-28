import React from 'react';
import Button from '../Button';
import Input from '../TagInput/Input';
import {PRIMARY_ROLES} from '../../utils/Enums';
import {MemberInfo} from '../../utils/types';
import {storeData} from '../../../api/strapiJSAPI';
import {Dropdown} from 'react-native-element-dropdown';
import {COLOR, FONTSIZE} from '../../constants/contants';
import {storeToLocalStorage} from '../../utils/localStorageFunctions';
import {KeyboardAvoidingView, Modal, Platform, Pressable, StyleProp, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import {CountryPicker, CountryItem} from 'react-native-country-codes-picker';
import CheckBox from '../CheckBox';

interface JoinCommunityModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsInCommunity: React.Dispatch<React.SetStateAction<boolean>>
};

const initialMemberInfo = {
  email: '',
  country: '',
  phoneNumber: '',
  primaryRole: [],
  isWhatsAppPhone: false
};

function JoinCommunityModal({visible, setVisible, setIsInCommunity}: JoinCommunityModalProps) {
  const [memberInfo, setMemberInfo] = React.useState<MemberInfo>(initialMemberInfo);
  const [showCountryCode, setShowCountryCode] = React.useState<boolean>(false);
  const [showCountry, setShowCountry] = React.useState<boolean>(false);
  const [countryCode, setCountryCode] = React.useState<any>('+256');
  const [country, setCountry] = React.useState<string>('Country');
  const handleCloseModal = function () {
    setVisible(!visible);
  }

  const handleSubmit = async function () {
    if (memberInfo.country != '' &&
      memberInfo.email != '' &&
      memberInfo.phoneNumber != '') {
      try {
        const response = await storeData('community-members', memberInfo);

        if (response.data) {
          setIsInCommunity(true);
          setVisible(false);
          setMemberInfo(initialMemberInfo);
          setCountry('Country');
          await storeToLocalStorage('joined_comm', {isJoined: true})
          ToastAndroid.show('You\'ve successfully joined our community. \n You will receive a comfirmation email.', 5000);
        } else { }
      } catch (error) { }
    }
  }

  const handleChange = function (key: keyof MemberInfo, text: string | boolean | string[]) {
    setMemberInfo(current => {
      return {
        ...current,
        [key]: text
      }
    })
  }

  return (
    <Modal visible={visible}
      statusBarTranslucent animationType='fade'
      onRequestClose={handleCloseModal}
      transparent>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <Text style={styles.heading}>Join our Community</Text>
                <Text style={styles.text}>
                  Connect with like-minded developers,
                  share your experiences, and grow together
                  in a supportive environment.
                </Text>
                <View>
                  <Input
                    styles={{ inputFocused: styles.inputFocused, input: styles.input }}
                    value={memberInfo.email}
                    handleChange={function (text) { handleChange('email', text) }}
                    placeHolder={'Email'}
                  />
                </View>

                <View style={{borderWidth: 1, borderColor: COLOR.SECONDARY_100, borderRadius: 5, marginVertical: 5, padding: 10}}>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 5, borderRightColor: COLOR.SECONDARY_100 }}
                    onPress={() => setShowCountry(true)}
                  >
                    <Text style={{ fontFamily: 'ComfortaaBold' }}>
                      {country}
                    </Text>
                  </TouchableOpacity>
                  <CountryPicker
                    show={showCountry}
                    lang={'en'}
                    pickerButtonOnPress={function (item: CountryItem) {
                      handleChange('country', item.code);
                      setCountry(item.name['en']);
                      setCountryCode(item.dial_code);
                      setShowCountry(false)
                    }}
                  />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLOR.SECONDARY_100, marginVertical: 5, borderRadius: 5}}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      style={{ borderRightWidth: 1, paddingHorizontal: 5, borderRightColor: COLOR.SECONDARY_100 }}
                      onPress={() => setShowCountryCode(true)} >
                      <Text style={{ fontFamily: 'ComfortaaBold' }}>
                        {countryCode}
                      </Text>
                    </TouchableOpacity>

                    <CountryPicker
                      show={showCountryCode}
                      inputPlaceholder='Uganda'
                      pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShowCountryCode(false);
                      }}
                      lang={'en'}
                      style={{itemsList:{width:'100%'}}}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Input
                      styles={{inputFocused: {padding: 5, borderRadius: 5}, input: {padding: 5, borderRadius: 5} }}
                      value={memberInfo.phoneNumber}
                      handleChange={function (text) { handleChange('phoneNumber', text) }}
                      placeHolder={'Phone number'}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'flex-end',gap:10, borderColor: COLOR.SECONDARY_100, marginVertical: 5, borderRadius: 5, paddingHorizontal:5 }}>
                  <Text style={{fontSize:FONTSIZE.SMALL}}>Is this a WhatsApp number?</Text>
                  <CheckBox
                    checkBoxToggle={memberInfo.isWhatsAppPhone}
                    handleCheckBoxToggle={function (): void {
                      const checkbox = memberInfo.isWhatsAppPhone;
                      handleChange('isWhatsAppPhone', !checkbox);
                    }}
                  />
                </View>
                
                <View style={{ borderWidth: 1, borderColor: COLOR.SECONDARY_100, borderRadius: 5, marginVertical: 5, padding: 5 }}>
                  <Dropdown
                    data={PRIMARY_ROLES}
                    labelField='label'
                    valueField='value'
                    value={memberInfo.country}
                    placeholder="What's your primary role"
                    iconStyle={{width: 15, height: 15}}
                    placeholderStyle={{
                      color: COLOR.SECONDARY_75,
                    }}
                    onChange={function (item) { handleChange('primaryRole', [item.value]) }}
                  />
                </View>
                <Button
                  title="Join us"
                  btn={styles.button}
                  textStyle={styles.buttonText}
                  handlePress={handleSubmit}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default React.memo(JoinCommunityModal)

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.NEUTRAL_3
  },
  container: {
    width: '80%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR.WHITE
  },
  button: {
    width: '100%',
    padding: 5,
    backgroundColor: COLOR.SECONDARY_300,
    marginVertical:5
  },
  buttonText: {
    color: COLOR.WHITE,
    textAlign: 'center'
  },
  text: {
    fontSize: FONTSIZE.BODY,
    fontFamily: 'RalewayRegular',
    marginVertical: 15,
    textAlign: 'justify'
  },
  heading: {
    fontFamily: 'ComfortaaBold',
    fontSize: FONTSIZE.TITLE_2,
    color: COLOR.SECONDARY_300,
    textAlign: 'justify'
  },
  input: {
    padding: 5,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: 'RalewayRegular',
    borderColor: COLOR.SECONDARY_50
  },
  inputFocused: {
    borderColor: COLOR.GREY_300,
    padding: 5,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: 'RalewayRegular',
  }
});