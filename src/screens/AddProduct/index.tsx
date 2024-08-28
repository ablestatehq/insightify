import {View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
// import {useVideoPlayer, VideoView} from 'expo-video';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import {MultiSelect} from 'react-native-element-dropdown';
import {Formik} from 'formik';
import Header from '../../components/Headers/Header';
import {AppContext} from '../../helper/context/AppContext';
import {COLOR, FONTSIZE} from '../../constants/constants';

import {environments} from '../../constants/environments';
import {InputText} from '../../components';
import {FONT_NAMES} from '../../assets/fonts/fonts';
import {storeData, uploadImage} from '../../../api/strapiJSAPI';
import image_name_extension from '../../utils/imageName';

const {STRAPI_BASE_URL} = environments;
// Form's data structure
interface FormValues {
  name: string;
  description: string;
  developers: string[];
  tagline: string;
  status: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Title is required'),
  description: Yup.string().required('Please provide your solution description'),
  tagline: Yup.string().required('provide the technologies used.'),
});

const Index: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [tutorial, setTutorial] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  // const videoRef = useRef<VideoView>(null)

  const {jwt, user} = useContext(AppContext);
  
  // Initial values for the form
  const initialValues: FormValues = {
    name: '',
    description: '',
    developers: [user?.id],
    tagline: '',
    status: 'Draft'
  };
  // const player = useVideoPlayer(tutorial as string, player => {
  //   player.loop = true;
  //   player.play();
  // });

  const fetchData = () => {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }
    
    fetch(`${STRAPI_BASE_URL}/${'users'}?`,
      options)
      .then(response => response.json())
      .then(data => {
        const data_ = data.map((user_: any) => {
          if (!user_.blocked) {
            return {label: user_.email, value: user_.id}
          }
        });
        setUsers(prev => [...prev, ...data_])
      });
  }

  const handlePickImage = async function () {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(prev => [...prev, ...result.assets.map(img => img.uri)]);
    }
  };

  const handleVideoPick = async function () {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setTutorial(result.assets[0].uri);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (values: FormValues) => {
    const response = await storeData('products', {...values}, jwt);
    if (response.data && tutorial) {
    }
    if (response.data && images.length > 0) {
      const formData = new FormData();
      for (let img of images) {
        const {name, extension } = image_name_extension(img);
        formData.append('files', {
          uri: img,
          type: `image/${extension}`,
          name,
        });
      }

      formData.append('refId', response?.data?.id);
      formData.append('ref', 'api::product.product');
      formData.append('field', 'media');

      await uploadImage(formData, jwt);
    }
  };

  return (
    <View style={styles.container}>
      <Header title='Add product' />
      <ScrollView contentContainerStyle={{marginTop: 15, paddingBottom: 20}}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched}) => (
            <KeyboardAvoidingView>
              <InputText fieldName={'name'} label='Product Title'
                placeholder='solution name'
                isMultiLine={false}
                isInputSecure={false}
              />
              <InputText fieldName={'type'} label='Product Type'
                placeholder='e.g software'
                isMultiLine={false}
                isInputSecure={false}
              />
              <InputText fieldName={'link'} label='Product Link'
                placeholder='Link to product'
                keyboardType='url'
                isMultiLine={false}
                isInputSecure={false}
              />
              <InputText fieldName={'description'} label='Description'
                placeholder='Tell us more ...'
                isMultiLine={true}
                isInputSecure={false}
              />
              <InputText fieldName={'tagline'} label='Technologies used'
                placeholder='technologies ...'
              />
              <InputText fieldName={'developer'} label='Product developer'
                placeholder="developer's name"
              />
              {/* <Text style={styles.developersText}>Developers</Text> */}
              {/* list users so that a developer can be selected.  */}
              {/* <View
                style={{
                  borderWidth: 1,
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  borderColor: COLOR.SECONDARY_50,
                  paddingVertical: 5,
                }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={users}
                  labelField='label'
                  valueField='value'
                  search
                  searchPlaceholder='Search...'
                  placeholder='Select skills'
                  value={users}
                  onChange={function (item): void {
                    // setSkills(item);
                    // handleChange('skills', item);
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
              </View> */}
              <ScrollView contentContainerStyle={styles.imagePreviewContainer} horizontal>
                <TouchableOpacity
                  style={styles.imageUpload}
                  onPress={handlePickImage}
                >
                  <FontAwesome name="cloud-upload" size={24} color={COLOR.GREY_50} />
                  <Text>Add Images</Text>
                </TouchableOpacity>
                {images.map((imageUri, index) => (
                  <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
                ))}
              </ScrollView>
              {/* <TouchableOpacity style={styles.imageUpload} onPress={handleVideoPick}>
                <FontAwesome name="cloud-upload" size={24} color={COLOR.GREY_100} />
                <Text>Product video</Text>
              </TouchableOpacity> */}
              {/* {tutorial &&
                <VideoView
                  ref={videoRef}
                  style={styles.video}
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                />} */}
              {touched.tagline
                && errors.tagline 
                && <Text style={styles.errorText}>{errors.tagline}</Text>}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleSubmit}>
                  <Text style={styles.cancelButtonText}>Save product</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOR.GREY_50,
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  imageUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  comment: {
    height: 80,
  },
  buttonContainer: {
    // flexDirection: 'row',
    paddingHorizontal: 10
    // borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: COLOR.SECONDARY_300,
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: COLOR.WHITE,
    textAlign: 'center'
  },
  saveButton: {
    // backgroundColor: '#6c5ce7',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  video: {
    
  },
  imagePreview: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  imagePreviewContainer: {
    // flex: 1,
    flexDirection: 'row',
    gap: 5,
    // padding: 5,
    marginVertical: 5,
  },
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
  developersText: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontFamily: FONT_NAMES.Title,
    fontSize: FONTSIZE.TITLE_2,
  }
});

export default Index;
