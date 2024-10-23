import {RouteProp} from "@react-navigation/native"

type userModal = {
  email: string
  lastName: string
  firstName: string
}

interface UserProfile {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  expoPushToken: string | null;
  firstName: string | null;
  gender: string | null;
  id: number;
  isAvailable: boolean;
  lastName: string | null;
  photo: string | null;
  primaryDomain: string | null;
  provider: string;
  secondaryDomain: string | null;
  skills: string | null;
  updatedAt: string;
  username: string;
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
    // confirmation?: string
  }
  // OpportunityList: undefined;
  Forgot: undefined
  Reset: {
    code: string
  },
  ConfirmEmail: {
    code?: string
  },
  ChatRoom: undefined;
  Talent: undefined;
  ProductDetail: ProductData;
  Offers: {
    tag?: string;
    targetIndex?: number
  };
  ProductList: undefined;
  AddProduct: undefined;
}

type LoginScreenProps = RouteProp<RootStackParamList, 'Login'>
type ResetScreenProps = RouteProp<RootStackParamList, 'Reset'>
type ConfirmEmailScreenProps = RouteProp<RootStackParamList, 'ConfirmEmail'>
type DetailsScreenProps = RouteProp<RootStackParamList, 'Details'>
type OpportunityListProps = RouteProp<RootStackParamList, 'Offers'>
// interface for TalentSubmissionForm
type TalentSubmissionForm = {
  need: string[]
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

interface ViewCount {
  [id: string]: number;
}

type ProductData = {
  name: string;
  id: number;
  verified?: boolean;
  description: string;
  media?: {data: any[]};
  uploadedBy?: any;
  demo?: string;
  totalViews?: number;
  tagline?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  tutorial?: any
}

type IDialogBox = {
  title: string;
  message: string;
  visible: boolean;
  error?: Error | null;
  acceptText?: string;
  cancelText: string;
  onAccept?: () => void;
  onReject: () => void;
};
export {
  IDialogBox,
  MemberInfo,
  userModal,
  ProductData,
  ArticleType,
  ProfileType,
  UserProfile,
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
  ConfirmEmailScreenProps,
  OpportunityListProps
}