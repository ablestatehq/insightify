import { RouteProp } from "@react-navigation/native"

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
  };
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
}

type DetailsScreenProps = RouteProp<RootStackParamList, 'Details'>
type LoginScreenProps = RouteProp<RootStackParamList, 'Login'>

// interface for TalentSubmissionForm
type TalentSubmissionForm = {
  Client: string // Client name
  Email: string
  Phone: string
  Message: string // Message left
  Need: string // Looking for
  Heads?: string // Quantity needed.
  Company?:string
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
  id:string
  title: string
  description: string
  link: string
  expireDate: string
  type: string
  location: string
  createdAt: string
  bookmarked: boolean
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
  userOrDeviceID: string
  subscription: boolean
  platform: string
}

export {
  userModal,
  ArticleType,
  FeedbackObject,
  NewsRouteParams,
  HomeDisplayProps,
  LoginScreenProps,
  NotificationType,
  RootStackParamList,
  DetailsScreenProps,
  TalentSubmissionForm,
  OpportunitiesFormType,
  ExpandableListItemProps,
  OpportunityItemCardProps,
}