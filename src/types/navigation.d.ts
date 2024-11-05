import type { ProductData } from "./product"
import {RouteProp} from "@react-navigation/native"

export type NewsRouteParams = {
  title: string
  content: string
  excerpt: string
  datePublised: string
  featured_image: string
}

export type RootStackParamList = {
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

export type LoginDetails = {
  email?: string
  password?: string
}

export type LoginScreenProps = RouteProp<RootStackParamList, 'Login'>
export type ResetScreenProps = RouteProp<RootStackParamList, 'Reset'>
export type ConfirmEmailScreenProps = RouteProp<RootStackParamList, 'ConfirmEmail'>
export type DetailsScreenProps = RouteProp<RootStackParamList, 'Details'>
export type OpportunityListProps = RouteProp<RootStackParamList, 'Offers'>