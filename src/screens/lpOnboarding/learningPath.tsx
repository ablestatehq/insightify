import GeminiData from '@api/gemini';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FONT_NAMES } from '@src/assets';
import { InputText } from '@src/components';
import { COLOR, DIMEN, FONTSIZE } from '@src/constants';
import { RootStackParamList } from '@src/types';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import React, {useMemo, useState} from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';

const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);

const total = 3;

interface FormValues {
  goal: string;
  current_skill_level: string;
  specialization: string;
  time_commitment: string;
  learning_style: string;
  resources_available: string;
  technical_background: string;
  desired_projects: string[];
  specific_challenges: string[];
};

const LearningPath = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const initialValues: FormValues = {
    goal: '',
    current_skill_level: '',
    specialization: '',
    time_commitment: '',
    learning_style: '',
    resources_available: '',
    technical_background: '',
    desired_projects: [],
    specific_challenges: []
  }

  const geminiApi = useMemo(() => new GeminiData(), []);

  const onIndexChange = () => {
    setSelectedIndex((prev) => prev + 1);
  };

  const Board1 = () => (
    <Animated.View style={styles.main} layout={_layoutTransition}>
        <Text style={styles.step_title}>
          Let's Get Started!
        </Text>
        <Text style={styles.text_style}>
          Help us understand your goals and background.
        </Text>

      <View style={styles.inputView}>
        <InputText
          label="What's your goal?"
          fieldName={'goal'}
          placeholder='E.g., Becoming an efficient software engineer. '
        />
        <InputText
          label="What' s your current skill level?"
          fieldName={'current_skill_level'}
          placeholder='E.g., Beginner, Intermediate, Advanced'
        />

        <InputText
          label="What do you aim to specialize in?"
          fieldName={'specialization'}
          placeholder='E.g., Software engineer, Data scientist'
        />
      </View>
    </Animated.View>
  );
  const Board2 = () => (
    <Animated.View style={styles.main} layout={_layoutTransition}>
        <Text style={styles.step_title}>
          Tailor Your Learning Path
        </Text>
        <Text style={styles.text_style}>
          Let us know how you like to learn and your schedule.
        </Text>

      <View style={styles.inputView}>
        <InputText
          label="How much time can you commit to learning?"
          fieldName={'time_commitment'}
          placeholder='E.g., 1-2 hours a day, 3-4 hours a week'
        />

        <InputText
          label="What is your preferred learning style?"
          fieldName={'learning_style'}
          placeholder='E.g., Hands-on projects, videos, articles, or a mix'
        />
      </View>
    </Animated.View>
  );
  const Board3 = () => (
    <Animated.View style={styles.main} layout={_layoutTransition}>
        <Text style={styles.step_title}>
          Let's Customize Further
        </Text>
        <Text style={styles.text_style}>
          Share the resources and challenges you have.
        </Text>

      <View style={styles.inputView}>
        <InputText
          label="What resources are available to you?"
          fieldName={'resources_available'}
          placeholder='E.g., Online courses, Books, Workshops'
        />
        <InputText
          label="What is your technical background?"
          fieldName={'technical_background'}
          placeholder='E.g., Programming languages, Frameworks'
        />
      </View>
    </Animated.View>
  );

  const renderBoard = () => {
    switch (selectedIndex) {
      case 0:
        return <Board1 />;
      case 1:
        return <Board2 />;
      case 2:
        return <Board3 />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik initialValues={initialValues}
        onSubmit={async function (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) {
          const query = {
            "input": {
              ...values,
            },
            "output_format": {
              "type": "list",
              "structure": [
                {
                  "step": 1,
                  "title": "Title of the Step",
                  "description": "Detailed description of the step."
                }
              ]
            }
          };

          const response = await geminiApi.getData(JSON.stringify(query));
          formikHelpers.resetForm();
          // console.log("Returned data: ",response);
        
      }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {renderBoard()}
            {/**This is button section */}
            <View style={styles.btns_view}>
              {selectedIndex > 0 && (
                <Pressable onPress={() => {setSelectedIndex(selectedIndex - 1)}}>
                  <Text>Back</Text>
                </Pressable>
              )}
              <Pressable
                style={styles.continue_button}
                onPress={() => {
                  if (selectedIndex === total - 1) {
                    handleSubmit();
                  } else {
                    onIndexChange();
                  }
                }}>
                {selectedIndex === total - 1 ? (
                  <Animated.Text
                    key="finish"
                    style={{ color: COLOR.GREY_200 }}
                    entering={FadeInDown.springify().damping(80).stiffness(200)}
                    exiting={FadeOutUp.springify().damping(80).stiffness(200)}>
                    Submit
                  </Animated.Text>
                ) : (
                  <Animated.Text
                    key="continue"
                    style={{ color: COLOR.GREY_200 }}
                    // layout={_layoutTransition}
                    entering={FadeInDown.springify().damping(80).stiffness(200)}
                    exiting={FadeOutUp.springify().damping(80).stiffness(200)}>
                    Next
                  </Animated.Text>
                )}
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default LearningPath;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    padding: DIMEN.PADDING.LG,
  },
  main: {
    flex: 1,
    // margin: DIMEN.MARGIN.SM,
  },
  continue_button: {
    backgroundColor: COLOR.WHITE,
    flex: 1,
  },
  btns_view: {
    flexDirection: 'row',
    gap: DIMEN.CONSTANT.SM,
  },
  step_title: {
    color: COLOR.GREY_300,
    fontFamily: FONT_NAMES.Heading,
    fontSize: FONTSIZE.TITLE_1,
    textAlign: 'left'
  },
  text_style: {
    lineHeight: DIMEN.CONSTANT.LG,
    color: COLOR.GREY_300,
    fontFamily: FONT_NAMES.Body,
    fontSize: FONTSIZE.BODY,
    textAlign: 'left'
  },
  text_view: {
    // flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: DIMEN.PADDING.ME,
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
  }
});