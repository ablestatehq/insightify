import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR, FONTSIZE } from '../../constants/contants'

const TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      {/* <Text>
        Welcome to Insightify.
      </Text> */}
      <Text style={styles.termsTitle}>
        Terms and Conditions for Opportunity Submission.
      </Text>
      <Text>
        By submitting an opportunity, you agree to adhere to the following terms and conditions:
        Accurate Information
        You confirm that all information provided in the opportunity submission is accurate and truthful to the best of your knowledge.
        Responsibility
        You understand that you are solely responsible for the content you submit as an opportunity.
        Legitimacy and Authenticity
        You agree that the opportunity submitted does not contain false, misleading, or fraudulent information.
        Conformance with Guidelines
        You agree to comply with all community guidelines, terms of service, and applicable laws while submitting an opportunity.
        Content Review
        You acknowledge that opportunities submitted are subject to review and moderation by our support team.
        Status Transitions
        Opportunities will transition through various statuses such as "DRAFT," "REVIEW," and "PUBLISHED" based on the evaluation process by our support team.
        Communication Responsibility
        You agree to respond to inquiries or requests from our support team regarding the opportunity submitted.
        Permission to Publish
        Upon approval and transition to the "PUBLISHED" status, you grant Insightify permission to share the opportunity with our user base.
        Termination of Agreement
        Insightify reserves the right to remove or reject any submitted opportunity that violates these terms and conditions or doesn’t meet our guidelines.
        By submitting an opportunity, you acknowledge that you have read, understood, and agreed to these terms and conditions.
      </Text>
    </View>
  )
}

export default TermsAndConditions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR.WHITE
  },
  termsTitle: {
    fontFamily: 'ComfortaaBold',
    fontSize:FONTSIZE.TITLE_1
  }
})