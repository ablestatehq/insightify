import { RouteProp } from "@react-navigation/native"

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
  CodeTips: undefined;
  Privacy: undefined;
  Share: undefined;
  OpportunityList: undefined;
  Login: undefined
  SignUp: undefined
}
type userModal = {
  email: string
  lastName: string
  firstName: string
}
type DetailsScreenProps = RouteProp<RootStackParamList, 'Details'>

// interface for TalentSubmissionForm
type TalentSubmissionForm = {
  name: string
  email: string
  phone: string
  company: string
  lookingFor: string
  message: string
}
interface ExpandableListItemProps {
  title: string,
  content: string,
  snippet?: any,
  sourceName?: string,
  sourceLink?: string
  expandedIndex?: number | null
  index: number
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
  whatToImprove: string
  suggestion:string
}

type LoginDetails = {
  email?: string
  password?: string
}

type OpportunityItemCardProps = {
  title: string
  description: string
  link: string
  expireDate: string
  type: string
  location: string
  createdAt: string
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
export {
  userModal,
  ArticleType,
  FeedbackObject,
  NewsRouteParams,
  HomeDisplayProps,
  RootStackParamList,
  DetailsScreenProps,
  TalentSubmissionForm,
  OpportunitiesFormType,
  ExpandableListItemProps,
  OpportunityItemCardProps,
}