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

export interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}
