import React, { useCallback, useState } from 'react';
import Button from '../Button';
import Input from '../TagInput/Input';
import { PRIMARY_ROLES } from '@utils/Enums';
import { MemberInfo } from '@src/types';
import { storeData } from '@api/strapiJSAPI';
import { Dropdown } from 'react-native-element-dropdown';
import { COLOR, FONTSIZE } from '@constants/constants';
import { storeToLocalStorage } from '@utils/localStorageFunctions';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet, Text,
  ToastAndroid, TouchableOpacity,
  TouchableWithoutFeedback, View
} from 'react-native';
import CheckBox from '../CheckBox';
import { CountryItem } from 'react-native-country-codes-picker';
import CountryPickerModal from './CountryPickerModal';
import { FONT_NAMES } from '@fonts'

interface JoinCommunityModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInCommunity: () => void;
}

const initialMemberInfo: MemberInfo = {
  email: '',
  country: '',
  phoneNumber: '',
  primaryRole: [],
  isWhatsAppPhone: false,
};

function JoinCommunityModal({ visible, setVisible, setIsInCommunity }: JoinCommunityModalProps) {
  const [memberInfo, setMemberInfo] = useState<MemberInfo>(initialMemberInfo);
  const [state, setState] = useState({
    showCountryCode: false,
    showCountry: false,
    countryCode: '+256',
    country: 'Country',
    isLoading: false,
  });

  const handleCloseModal = () => setVisible(!visible);

  const handleChange = useCallback((key: keyof MemberInfo, value: string | boolean | string[]) => {
    setMemberInfo((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleChangeRole = useCallback(
    (item: any) => handleChange('primaryRole', [item.value]),
    [handleChange]
  );

  const handleCountryPicker = useCallback((item: CountryItem) => {
    handleChange('country', item.code);
    setState((prevState) => ({
      ...prevState,
      country: item.name['en'],
      countryCode: item.dial_code,
      showCountry: false,
    }));
  }, [handleChange]);

  const handleChangeCheckBox = () => {
    handleChange('isWhatsAppPhone', !memberInfo.isWhatsAppPhone);
  };

  const handleSubmit = useCallback(async () => {
    const { email, country, phoneNumber } = memberInfo;
    if (email && country && phoneNumber) {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true }));
        const response = await storeData('community-members', memberInfo);

        if (response.data) {
          setVisible(false);
          setMemberInfo(initialMemberInfo);
          setState((prevState) => ({ ...prevState, country: 'Country' }));
          setIsInCommunity();
          await storeToLocalStorage('joined_comm', { isJoined: true });
          ToastAndroid.show("You've successfully joined our community.", ToastAndroid.LONG);
        }
      } catch (error) {
      } finally {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    }
  }, [memberInfo, setVisible, setIsInCommunity]);

  const { countryCode, country, showCountry, showCountryCode, isLoading } = state;

  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      animationType="fade"
      onRequestClose={handleCloseModal}
      transparent
    >
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView>
              <View style={styles.container}>
                <Text style={styles.heading}>Join our Community</Text>
                <Text style={styles.text}>
                  Connect with like-minded developers, share your experiences, and grow together in a supportive environment.
                </Text>
                <Input
                  styles={{ inputFocused: styles.inputFocused, input: styles.input }}
                  value={memberInfo.email}
                  handleChange={(text) => handleChange('email', text)}
                  placeHolder="Email"
                />

                <View style={styles.countryPicker}>
                  <TouchableOpacity style={styles.touchCountry} onPress={() => setState((prevState) => ({ ...prevState, showCountry: true }))}>
                    <Text style={styles.countryText}>{country}</Text>
                  </TouchableOpacity>
                  <CountryPickerModal isShow={showCountry} handlePickerChange={handleCountryPicker} />
                </View>

                <View style={styles.countryCode}>
                  <View style={styles.touchCodeView}>
                    <View style={styles.touchCodeStyle}>
                      <Text style={{ fontFamily: FONT_NAMES.Heading }}>{countryCode}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      styles={{ inputFocused: { padding: 5, borderRadius: 5 }, input: { paddingHorizontal: 5, borderRadius: 5, borderWidth: 1 } }}
                      value={memberInfo.phoneNumber}
                      handleChange={(text) => handleChange('phoneNumber', text)}
                      placeHolder="Phone number"
                    />
                  </View>
                </View>

                <View style={styles.checkBoxView}>
                  <Text style={styles.checkBoxText}>Is this a WhatsApp number?</Text>
                  <CheckBox
                    checkBoxToggle={memberInfo.isWhatsAppPhone}
                    handleCheckBoxToggle={handleChangeCheckBox}
                  />
                </View>

                <View style={styles.primaryRoleView}>
                  <Dropdown
                    data={PRIMARY_ROLES}
                    labelField='label'
                    valueField='value'
                    value={memberInfo.country}
                    placeholder="What's your primary role"
                    iconStyle={{ width: 15, height: 15 }}
                    placeholderStyle={{
                      color: COLOR.SECONDARY_75,
                    }}
                    onChange={handleChangeRole}
                  />
                </View>
                <Button
                  title="Join us"
                  btn={styles.button}
                  textStyle={styles.buttonText}
                  handlePress={handleSubmit}
                  isLoading={isLoading}
                />
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default React.memo(JoinCommunityModal);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.NEUTRAL_3,
  },
  container: {
    width: '80%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: COLOR.WHITE,
  },
  button: {
    padding: 5,
    backgroundColor: COLOR.SECONDARY_300,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  text: {
    fontSize: FONTSIZE.BODY,
    fontFamily: FONT_NAMES.Body,
    marginVertical: 15,
    textAlign: 'justify',
  },
  heading: {
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_2,
    color: COLOR.SECONDARY_300,
    textAlign: 'justify',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: FONT_NAMES.Body,
    borderColor: COLOR.SECONDARY_300,
  },
  inputFocused: {
    borderColor: COLOR.GREY_300,
    padding: 5,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
    fontFamily: FONT_NAMES.Body,
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_100,
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'flex-end',
    gap: 10
  },
  checkBoxText: {
    fontFamily: FONT_NAMES.Body,
    color: COLOR.GREY_400,
  },
  countryText: {
    color: COLOR.GREY_400,
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
  },
  touchCodeView: {
    marginRight: 10,
    borderRadius: 5,
  },
  touchCodeStyle: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: COLOR.NEUTRAL_2,
  },
  touchCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryRoleView: {
    borderWidth: 1,
    borderColor: COLOR.SECONDARY_100,
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },
});
