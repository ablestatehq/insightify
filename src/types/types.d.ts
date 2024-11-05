// interface for TalentSubmissionForm

interface FeedbackObject {
  rating: number
  improvements: string
  suggestion:string
}

type NotificationType = {
  tokenID: string
  tokenValue: string 
  deviceID: string
  subscription: boolean
  platform: string
  serialNumber: string
  model: string
  manafacturer: string
  releaseDate?: string
}

export {
  FeedbackObject,
  NotificationType,
}