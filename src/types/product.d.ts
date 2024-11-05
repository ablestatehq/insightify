export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};

export interface Comment {
  readonly id: number;
  content: string
  blocked?: null;
  blockedThread?: boolean;
  blockReason?: null;
  authorUser?: null;
  removed?: null;
  approvalStatus?: string;
  author?: Author;
  threadOf?: number;
  createdAt?: string,
  updatedAt?: string,
  reports?: []
};


export type MetaData = {
slogan?: string,
lauchedBy?: {
    location?: string,
    companyBio?: string
    companyLink?: string,
    companyName: string
},
  bookmarked?: boolean
  comments?: Comments[]
}

export type ProductData = {
  name: string;
  id: number;
  verified?: boolean;
  description: string;
  media?: {data: any[]};
  uploadedBy?: any;
  demo?: string;
  view?: number
  totalViews?: number;
  tagline?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  tutorial?: any
  url?: string
  meta?: MetaData
}