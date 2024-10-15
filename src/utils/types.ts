import {RouteProp} from "@react-navigation/native"

type userModal = {
  email: string
  lastName: string
  firstName: string
}

type NewsRouteParams = {
  title: string
  content: string
  excerpt: string
  datePublised: string
  featured_image: string
}

type RootStackParamList = {
  Home: undefined;
  Details: {
    title: string,
    excerpt: string,
    articleID: number,
    publishedAt: string,
    featured_image: string,
    articleContent: string,
  }
  More: undefined
  Share: undefined
  SignUp: undefined
  Privacy: undefined
  Contact: undefined
  CodeTips: undefined
  Feedback: undefined
  Login: {
    title?: string
    opportunityID?: string
  }
  OpportunityList: undefined;
  Forgot: undefined
  Reset: {
    email: string
  }
}

type LoginScreenProps = RouteProp<RootStackParamList, 'Login'>
type ResetScreenProps = RouteProp<RootStackParamList, 'Reset'>
type DetailsScreenProps = RouteProp<RootStackParamList, 'Details'>

// interface for TalentSubmissionForm
type TalentSubmissionForm = {
  need: string[]// Looking for
  email: string
  phone: string
  heads?: number// Quantity needed.
  client: string// Client name
  company?:string
  message: string// Message left
}

interface ExpandableListItemProps {
  PL?: string
  snippet?: any
  index: number
  title: string
  image?:string
  content: string
  sourceName?: string
  sourceLink?: string
  expandedIndex?: number | null
  onToggleExpand?: (index: number) => void
}

interface HomeDisplayProps{
  topStories: any[]
  articles: any[]
}

interface Author {
  name: string,
  imageUrl: string,
  ID: string
}

type ArticleType = {
  title: string
  featured_image: string
  excerpt: string
  articleContent: string
  publishedAt:string
  articleID: number
  author: Author
}

interface FeedbackObject {
  rating: number
  improvements: string
  suggestion:string
}

type LoginDetails = {
  email?: string
  password?: string
}

type OpportunityItemCardProps = {
  id?:string
  link?: string
  type?: string
  title?: string
  location?: string
  opportunity?: any
  createdAt?: string
  expireDate?: string
  description?: string
  bookmarked?: boolean
  showModal?: () => void
  showReportModal: () => void
}

type OpportunitiesFormType = {
  link:string
  type: string
  title:string 
  location: string
  expireDate: string
  description: string
  companyName: string
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

interface MemberInfo{
  email: string;
  country: string;
  phoneNumber: string;
  primaryRole: string[];
  isWhatsAppPhone: boolean;
}

interface ProfileType {
  // photo: string;
  firstName: string;
  lastName: string;
  gender: string;
  skills: string[];
  isAvailable: boolean;
  primaryDomain: string;
  secondaryDomain: string;
}

export {
  MemberInfo,
  userModal,
  ArticleType,
  ProfileType,
  FeedbackObject,
  NewsRouteParams,
  HomeDisplayProps,
  LoginScreenProps,
  NotificationType,
  RootStackParamList,
  DetailsScreenProps,
  ResetScreenProps,
  TalentSubmissionForm,
  OpportunitiesFormType,
  ExpandableListItemProps,
  OpportunityItemCardProps,
}