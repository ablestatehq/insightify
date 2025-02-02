import {
  View, StyleSheet, TextInput,
  Modal, KeyboardAvoidingView,
  TouchableWithoutFeedback, Platform,
  Text, ToastAndroid, TouchableOpacity, Image, Pressable,
} from "react-native";
import React, {useContext} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign, EvilIcons, FontAwesome} from '@expo/vector-icons';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import Button from '../Button';
import {ProfileType} from '../../utils/types';
import {COLOR, FONTSIZE} from '../../constants/constants';
import useLocalStorage from '../../helper/customHooks/useLocalStorage';
import {DOMAIN, SKILLS, GENDER} from '../../utils/Enums';
import {setUserPhotoNULL, updateUser} from '../../../api/auth';
import {AppContext} from '../../helper/context/AppContext';
import CheckBox from '../CheckBox';
import {storeToLocalStorage} from '../../utils/localStorageFunctions';
import CustomModal from '../Modals/CustomModal';

import {deleteImage, uploadImage} from '../../../api/strapiJSAPI';
import {FONT_NAMES} from '../../assets/fonts/fonts';
import image_name_extension from '../../utils/imageName';

interface ProfileFormProps {
  visible: boolean
  handleClose: () => void
  profilePhoto: string | undefined
  setProfilePhoto: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function ProfileForm({
  handleClose,
  visible,
  profilePhoto,
  setProfilePhoto
}: ProfileFormProps) {

  const {user, jwt} = useContext(AppContext);

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

  const [modalData, setModalData] = React.useState({
    title: '',
    message: '',
    visible: false,
    closeModal: function () {
      setModalData(prev => ({ ...prev, visible: false }));
      handleClose();
    }
  });

  const [values, setValues] = useLocalStorage('profileImageData', initialProfile as unknown as Record<string, unknown>);

  // handle submission
  const handleSubmit = async function () {
    try {
      const response = await updateUser(user?.id, jwt, values);
      if (!response?.success) {
        ToastAndroid.show('Failed to submit profile', 5000);
        return;
      };

      if (!profilePhoto?.startsWith('http') && user.photo) {
        await setUserPhotoNULL(user.id, jwt);
        await deleteImage(user.photo.id, jwt);
      }

      if (profilePhoto && !profilePhoto.startsWith('http')) {
        const formData = new FormData();
        const {name, extension} = image_name_extension(profilePhoto);
        formData.append('files', {uri: profilePhoto, type: `image/${extension}`, name});
        formData.append('refId', user?.id.toString());
        formData.append('ref', 'plugin::users-permissions.user');
        formData.append('field', 'photo');

        const imageResponse = await uploadImage(formData, jwt);

        if (!imageResponse) {
          await storeToLocalStorage('profilePicture', { profilePhoto });
        }
      }

      ToastAndroid.show('Successfully submitted your profile.', 5000);
      setModalData(prev => ({ ...prev, title: 'Profile updated!' }));
      setModalData(prev => ({ ...prev, message: 'You have successfully updated your profile' }));
      setModalData(prev => ({ ...prev, visible: true }));
      handleClose();
    } catch (error) { }
  };

  const handleChange = (key: keyof ProfileType, value: unknown) => {
    setValues({...values, [key]: value});
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
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={function () {
          handleClose();
          ToastAndroid.show('Profile saved', 5000);
        }}>
          <View style={styles.modal}>
            <CustomModal
              title={modalData.title}
              message={modalData.message}
              visibility={modalData.visible}
              cancel={function () {modalData.closeModal()}}
            />
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                {!profilePhoto && (
                  <FontAwesome
                    size={70}
                    name="user-circle-o"
                    color={COLOR.SECONDARY_300}
                    style={{ alignSelf: 'center', marginTop: 10 }}
                    onPress={pickImage}
                  />
                )}
                {profilePhoto && (
                  <Pressable onPress={pickImage}>
                    <Image
                      source={{uri: profilePhoto}} 
                      style={{width: 70, height: 70, alignSelf: 'center', borderRadius: 35}}
                       />
                  </Pressable>
                )}
                <Text
                  style={{fontFamily: FONT_NAMES.Heading, textAlign: 'center', marginVertical: 10}}>
                  Complete your profile
                </Text>
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

                <View
                  style={{
                    margin: 5,
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    borderColor: COLOR.SECONDARY_100,
                  }}>
                  <Dropdown
                    data={GENDER}
                    labelField='label'
                    valueField='value'
                    placeholder='Gender'
                    value={values?.gender as string}
                    iconStyle={{ width: 15, height: 15 }}
                    placeholderStyle={{
                      color: COLOR.SECONDARY_75,
                    }}
                    onChange={function (item) { handleChange('gender', item.value) }}

                  />
                </View>

                <View style={{
                  borderWidth: 1, margin: 5,
                  borderRadius: 5, paddingHorizontal: 5,
                  borderColor: COLOR.SECONDARY_100, paddingVertical: 5
                }}>
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
                    renderLeftIcon={() => values?.secondaryDomain && (values?.secondaryDomain as string).length > 0 ? (
                      <EvilIcons
                        style={styles.icon}
                        color="black"
                        name="close"
                        size={20}
                        onPress={function () { handleChange('secondaryDomain', null) }}
                      />
                    ) :
                      null
                    }
                  />
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 5,
                    paddingHorizontal: 5,
                    borderColor: COLOR.SECONDARY_100,
                    paddingVertical: 5
                  }}>
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
                  <Text>Are you open to work? </Text>
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
