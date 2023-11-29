import React, { useState } from 'react'
import Selectable from './components/Selectable'
import { COLOR, FONTSIZE } from '../../../constants/contants'
import { FeedbackObject } from '../../../utils/types'
import Header from '../../../components/Header/Header'
import DatabaseService from '../../../appwrite/appwrite'
import { environments } from '../../../constants/environments'
import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'

const {
  APPWRITE_DATABASE_ID,
  APPWRITE_FEEDBACK_COLLECTION_ID
} = environments;

const FeedBack = () => {
  const [selectedImprovement, setSelectedImprovement] = useState<string | null>(null);
  const [suggestionText, setSuggestionText] = useState<string>('');

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
    const newFeedback: FeedbackObject = {
      rating: 0,
      whatToImprove: selectedImprovement ?? '',
      suggestion: suggestionText
    }
    // console.log(newFeedback);
    const response = await DatabaseService.storeDBdata(
      APPWRITE_DATABASE_ID,
      APPWRITE_FEEDBACK_COLLECTION_ID,
      newFeedback)
    
    if (response) {
      setSuggestionText('')
      setSelectedImprovement(null)
      ToastAndroid.show('Feedback successfully submitted', 3000);
    }
  }

  const isSubmitDisabled = selectedImprovement === null && suggestionText === '';
  return (
    <View>
      <Header title='Give us your honest feedback' />
      <View style={styles.feedBackContainer}>
        {/* Add emojis for the user to select what appeals to them  */}
        <View>
          <Text></Text>
        </View>
        <View>
          <Text style={{
            marginBottom: 10,
            fontFamily: 'ComfortaaBold',
            fontSize: FONTSIZE.TITLE_2,
            color:COLOR.B_300
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
          placeholder='Other suggestions...'
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
            <Text style={{ color: COLOR.WHITE, fontFamily: 'ComfortaaBold' }}>SEND</Text>
          )}
        </Pressable>
      </View>
    </View>
  )
}

export default FeedBack

const styles = StyleSheet.create({
  feedBackContainer: {
    padding: 20
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
    marginTop: 20
  }
})