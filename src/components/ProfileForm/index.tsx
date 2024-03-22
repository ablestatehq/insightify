import React, { useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, FontAwesome, MaterialIcons as Icon } from '@expo/vector-icons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { View, StyleSheet, TextInput, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Text, Image, ToastAndroid, Switch, TouchableOpacity } from "react-native";

import Button from '../Button';
import {ProfileType} from '../../utils/types';
import {COLOR, FONTSIZE} from '../../constants/contants';
import useLocalStorage from '../../helper/customHooks/useLocalStorage';
import {DOMAIN, SKILLS, GENDER} from '../../utils/Enums'
import {updateUser} from '../../../api/auth';
import {AppContext} from '../../helper/context/AppContext';
import CheckBox from '../CheckBox';
import {uploadImage} from '../../../api/strapiJSAPI';
import {storeToLocalStorage} from '../../utils/localStorageFunctions';

interface ProfileFormProps {
  visible: boolean
  handleClose: () => void
  profilePhoto: string | undefined
  setProfilePhoto: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function ProfileForm({ handleClose, visible, profilePhoto, setProfilePhoto }: ProfileFormProps) {

  const {user, jwt, setUser} = useContext(AppContext);
  const initialProfile: ProfileType = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    gender: user?.gender ?? '',
    skills: user?.skills ?? [],
    isAvailable: user?.isAvailable ?? false,
    primaryDomain: user?.primaryDomain ?? '',
    secondaryDomain: user?.secondaryDomain ?? ''
  }

  const [skills, setSkills] = React.useState<string[]>([]);
  const [values, setValues] = useLocalStorage('profileImageData', initialProfile as unknown as Record<string, unknown>);

  // handle submission
  const handleSubmit = async function () {
    try {
      const response = await updateUser(user?.id, jwt, values);
      if (!response?.success) {
        ToastAndroid.show('Failed to submit profile', 5000);
        return;
      }

      const imageResponse = await uploadImage(profilePhoto as string, user.id, 'user', 'photo', jwt);
      
      console.log(imageResponse)
      if (imageResponse.error && profilePhoto) {
        await storeToLocalStorage('profilePicture', {profilePhoto});
      }
      setUser(response?.data);

      ToastAndroid.show('Successfully submitted your profile.', 5000);
      handleClose();
    } catch (error) {console.log(error)}
  };

  const handleChange = (key: keyof ProfileType, value: unknown) => {
    setValues({ ...values, [key]: value });
  }

  // Pick the profile image
  const pickImage = async function () {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // handleChange('photo', result.assets[0].uri);
      setProfilePhoto(result.assets[0].uri);
    }
  }

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={function () {
      handleClose();
      ToastAndroid.show('Profile saved only on local', 5000);
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={function () {
          handleClose();
          ToastAndroid.show('Profile saved', 5000);
        }}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                {/* {!profilePhoto && (
                  <FontAwesome
                    size={70}
                    name="user-circle-o"
                    color={COLOR.SECONDARY_300}
                    style={{alignSelf: 'center', marginTop: 10}}
                    onPress={pickImage}
                  />
                )}
                {profilePhoto && (
                  <View>
                    <Image source={{uri: profilePhoto}} style={{width: 70, height: 70, alignSelf: 'center', borderRadius: 35}} />
                  </View>
                )} */}
                <Text style={{fontFamily: 'ComfortaaBold', textAlign: 'center', marginVertical: 10}}>Complete your profile</Text>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={values?.firstName as string}
                  onChangeText={value => handleChange('firstName', value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={values?.lastName as string}
                  onChangeText={value => handleChange('lastName', value)}
                />

                <View style={{borderWidth: 1, margin: 5, borderRadius: 5, paddingHorizontal: 5, borderColor: COLOR.SECONDARY_100, paddingVertical: 5}}>
                  <Dropdown
                    data={GENDER}
                    labelField='label'
                    valueField='value'
                    value={values?.gender as string}
                    placeholder='Gender'
                    iconStyle={{ width: 15, height: 15 }}
                    placeholderStyle={{
                      color: COLOR.SECONDARY_75,
                    }}
                    onChange={function (item) { handleChange('gender', item.value) }}
                  />
                </View>

                <View style={{ borderWidth: 1, margin: 5, borderRadius: 5, paddingHorizontal: 5, borderColor: COLOR.SECONDARY_100, paddingVertical: 5 }}>
                  <Dropdown
                    data={DOMAIN()}
                    labelField='label'
                    valueField='value'
                    value={values?.primaryDomain as string}
                    placeholder='Primary domain of expertize'
                    iconStyle={{ width: 15, height: 15 }}
                    placeholderStyle={{
                      color: COLOR.SECONDARY_75,
                    }}
                    onChange={function (item) { handleChange('primaryDomain', item.value) }}
                  />
                </View>
                <View style={{ borderWidth: 1, margin: 5, borderRadius: 5, paddingHorizontal: 5, borderColor: COLOR.SECONDARY_100, paddingVertical: 5 }}>
                  <Dropdown
                    data={DOMAIN()}
                    labelField='label'
                    valueField='value'
                    value={values?.secondaryDomain as string}
                    placeholder='Secondary domain of expertize'
                    iconStyle={{ width: 15, height: 15 }}
                    placeholderStyle={{
                      color: COLOR.SECONDARY_75,
                    }}
                    onChange={function (item) { handleChange('secondaryDomain', item.value) }}
                  />
                </View>

                <View style={{ borderWidth: 1, margin: 5, borderRadius: 5, paddingHorizontal: 5, borderColor: COLOR.SECONDARY_100, paddingVertical: 5 }}>
                  <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={SKILLS()}
                    labelField='label'
                    valueField='value'
                    search
                    searchPlaceholder='Search...'
                    placeholder='Select skills'
                    value={skills}
                    onChange={function (item): void {
                      setSkills(item);
                      handleChange('skills', item);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                          <Text style={styles.textSelectedStyle}>{item.label}</Text>
                          <AntDesign color="black" name="delete" size={15} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
                  <Text>Are you available? </Text>
                  {/* <Switch
                    style={{ borderWidth: 1 }}
                    thumbColor={values?.isAvailable ? COLOR.SECONDARY_300 : COLOR.SECONDARY_50}
                    trackColor={{ true: COLOR.GREY_300, false: COLOR.SECONDARY_300 }}
                    value={values?.isAvailable as boolean}
                    onValueChange={(changedValue) => handleChange('isAvailable', changedValue as boolean)}
                  /> */}
                  <CheckBox
                    checkBoxToggle={values?.isAvailable as boolean}
                    handleCheckBoxToggle={function (): void {
                      const checkbox = values.isAvailable;
                      handleChange('isAvailable', !checkbox);
                    }}
                  />
                </View>
                <Button
                  title='Save'
                  btn={styles.buttonStyle}
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

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.NEUTRAL_3
  },
  container: {
    backgroundColor: COLOR.WHITE,
    width: '90%',
    padding: 5,
    borderRadius: 10
  },
  input: {
    padding: 5,
    borderWidth: 1,
    margin: 5,
    borderColor: COLOR.SECONDARY_75,
    borderRadius: 5
  },
  buttonStyle: {
    padding: 5,
    margin: 5,
    marginTop: 10,
    backgroundColor: COLOR.SECONDARY_300,
    borderRadius: 5,
    paddingBottom: 10,
    paddingTop: 7
  },
  buttonText: {
    color: COLOR.WHITE,
    textAlign: 'center',
    fontSize: FONTSIZE.TITLE_2
  },
  label: {},
  dropdown: {
    height: 30,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLOR.SECONDARY_100
  },
  selectedTextStyle: {
    fontSize: 14,

  },
  iconStyle: {
    width: 15,
    height: 15,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
