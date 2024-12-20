import {
  View, StyleSheet, TextInput,
  KeyboardAvoidingView,
  Platform, Text, ToastAndroid,
  TouchableOpacity, Image, Pressable,
} from "react-native";
import React, { useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

import { ProfileType } from '@src/types';
import { COLOR, DIMEN, FONTSIZE } from '@constants/constants';
import { useLocalStorage } from '@src/hooks';
import { DOMAIN, SKILLS, GENDER } from '@utils/Enums';
import { setUserPhotoNULL, updateUser } from '@api/auth';
import { AppContext } from '@src/context/AppContext';

import { deleteImage } from '@api/strapiJSAPI';
import image_name_extension from '@utils/imageName';
import { Button } from "@src/components";
import CheckBox from "@src/components/common/CheckBox";
import Header from "@src/components/headers/Header";
import { environments } from "@src/constants";

const { BASE_URL } = environments;
export default function ProfileForm() {

  const { user, jwt } = useContext(AppContext);

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
  const [profilePhoto, setProfilePhoto] = React.useState<string>(user.photo ?
    `${BASE_URL}${user.photo.url}` : '');

  const [values, setValues] = useLocalStorage('profileImageData',
    initialProfile as unknown as Record<string, unknown>);

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
        const { name, extension } = image_name_extension(profilePhoto);
      }

      ToastAndroid.show('Successfully submitted your profile.', 5000);
    } catch (error) { }
  }

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
      setProfilePhoto(result.assets[0].uri);
    }
  }

  const ProfileImageSection = () => {
    const CameraButton = () => (
      <Pressable style={styles.pickImageIcon} onPress={pickImage}>
        <EvilIcons
          name="camera"
          size={20}
          color={COLOR.GREY_400}
        />
      </Pressable>
    );

    return (
      <View style={{ alignSelf: 'center' }}>
        {profilePhoto ? (
          <>
            <Image
              source={{ uri: profilePhoto }}
              style={{ width: 70, height: 70, borderRadius: 70 }}
            />
          </>
        ) : (
          <FontAwesome
            size={70}
            name="user-circle-o"
            color={COLOR.SECONDARY_300}
            onPress={pickImage}
          />
        )}
        <CameraButton />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title="Edit Profile" />

      <ProfileImageSection />

      <Text>First name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={values?.firstName as string}
        onChangeText={value => handleChange('firstName', value)}
      />

      <Text>Last name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={values?.lastName as string}
        onChangeText={value => handleChange('lastName', value)}
      />
      <Text>Gender</Text>
      <View style={styles.gender_view}>
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
          onChange={function (item) {
            handleChange('gender', item.value)
          }}

        />
      </View>

      <Text>Primary skill</Text>
      <View style={styles.primary_skill_view}>
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
          onChange={function (item) {
            handleChange('primaryDomain', item.value)
          }}
        />
      </View>
      <Text>Secondary skill</Text>
      <View style={styles.secondary_skill_view}>
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
          onChange={function (item) {
            handleChange('secondaryDomain', item.value)
          }}
          renderLeftIcon={() => values?.secondaryDomain && (values?.secondaryDomain as string).length > 0 ? (
            <EvilIcons
              style={styles.icon}
              color="black"
              name="close"
              size={20}
              onPress={function () {
                handleChange('secondaryDomain', null)
              }}
            />
          ) :
            null
          }
        />
      </View>

      <Text>Familiar technology</Text>
      <View
        style={styles.familiar_view}>
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

      <View style={styles.open_to_work_view}>
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

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
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
  pickImageIcon: {
    backgroundColor: COLOR.WHITE,
    zIndex: 5,
    position: 'absolute',
    right: -5,
    bottom: 3,
    height: 22,
    width: 22,
    borderRadius: DIMEN.CONSTANT.XLG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: DIMEN.PADDING.ES,
    elevation: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 35
  },
  containerView: {
    alignSelf: 'center'
  },
  primary_skill_view: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderColor: COLOR.SECONDARY_100,
    paddingVertical: 5
  },
  secondary_skill_view: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderColor: COLOR.SECONDARY_100,
    paddingVertical: 5,
  },
  familiar_view: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
    borderColor: COLOR.SECONDARY_100,
    paddingVertical: 5
  },

  open_to_work_view: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between'
  },
  gender_view: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: COLOR.SECONDARY_100,
  }
});
