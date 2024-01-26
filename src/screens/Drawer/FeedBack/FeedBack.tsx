import React, { useState } from 'react'
import Selectable from './components/Selectable'
import { FeedbackObject } from '../../../utils/types'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import Header from '../../NewsDetails/helperComponents/Header'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { storeData } from '../../../../api/strapiJSAPI'

const FeedBack = () => {
  const [selectedImprovement, setSelectedImprovement] = useState<string | null>(null);
  const [suggestionText, setSuggestionText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toImprove = [
    {
      label: 'Upskill Service',
      key: "Upskill Service"
    },
    {
      label: 'Trasparency',
      key: "Trasparency"
    },
    {
      label: 'Overall Service',
      key: "Overall Service",
    },
    {
      label: 'Customer Support',
      key: "Customer Support"
    },
    {
      label: 'Service & Efficiency',
      key: "Service & Efficiency"
    },
    {
      label: 'Opportunity Service',
      key: "Opportunity Service"
    },
  ]

  // handlers 
  const handleImprovementSelect = (selectedItem: string) => {
    setSelectedImprovement(selectedItem === selectedImprovement ? null : selectedItem)
  }

  const handleSuggestionChange = (text: string) => {
    setSuggestionText(text)
  }

  // submit feedback to database 
  const handleSubmission = async () => {
    setIsSubmitting(true);
    const newFeedback: FeedbackObject = {
      rating: 0,
      improvements: selectedImprovement ?? '',
      suggestion: suggestionText
    }
    const response = await storeData('suggestions', newFeedback)
    console.log(response)
    if (response) {
      setSuggestionText('')
      setSelectedImprovement(null)
      ToastAndroid.show('Feedback successfully submitted', 3000);
    }
    setIsSubmitting(false);
  }

  const isSubmitDisabled = selectedImprovement === null && suggestionText === '';
  return (
    <View style={styles.container}>
      <Header title='Give us your feedback' />
      <View style={styles.feedBackContainer}>
        {/* Add emojis for the user to select what appeals to them  */}
        <View style={styles.emojiView}>
          <Text></Text>
        </View>
        <View>
          <Text style={{
            marginBottom: 10,
            fontFamily: 'ComfortaaBold',
            fontSize: FONTSIZE.TITLE_2,
            color: COLOR.B_300
          }}
          >
            What should we improve to serve you better?
          </Text>
          <View style={styles.toImprove}>
            {toImprove.map((item: any, index: number) => (
              <Selectable
                key={index}
                label={item.label}
                selected={item.key === selectedImprovement}
                handleClick={() => handleImprovementSelect(item.key)}
              />
            ))}
          </View>
        </View>
        <TextInput
          multiline
          numberOfLines={10}
          style={styles.suggestions}
          placeholder={suggestionText == '' ? 'Other suggestions...' : suggestionText}
          value={suggestionText}
          onChangeText={handleSuggestionChange}
        />
        <Pressable
          style={({ pressed }) => [
            styles.submitBtn,
            { opacity: isSubmitDisabled ? 0.7 : 1 }
          ]}
          onPress={handleSubmission}
          disabled={isSubmitDisabled}
        >
          {({ pressed }) => (
            <View style={styles.pressedViewState}>
              {isSubmitting &&
                <ActivityIndicator
                  color={COLOR.WHITE}
                  size='small'
                />}
              <Text style={{ color: COLOR.WHITE, fontFamily: 'ComfortaaBold' }}>{isSubmitting ? '' : 'SEND'}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  )
}

export default FeedBack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE
  },
  feedBackContainer: {
    flex: 1,
    padding: 20,
  },
  suggestions: {
    borderRadius: 10,
    backgroundColor: COLOR.B_50,
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 10,
    marginTop: 10,
    fontFamily: 'ComfortaaMedium'
  },
  toImprove: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20
  },
  submitBtn: {
    padding: 5,
    alignItems: 'center',
    backgroundColor: COLOR.ORANGE_300,
    borderRadius: 5,
    marginTop: 20,
    bottom: 20,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center'
  },
  emojiView: {

  },
  pressedViewState: {
    flexDirection: 'row',
    gap: 5,
  }
})