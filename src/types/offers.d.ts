export type OpportunityData = {
  id:string
  link?: string
  type?: string
  Title?: string
  Description?: string
  location?: string
  Company?: string
  Category?: string
  Role?: string
  URL?: string
  Expires?: string
  Location?: string
  createdAt?: string
  compensation?: string
  Contact?: Contact
  company_logo?: any
  cover_image?: any
  bookmarked?: boolean
  publishedAt?: string
}

export type OpportunitiesFormType = {
  link:string
  type: string
  title:string 
  location: string
  expireDate: string
  description: string
  companyName: string
}

export interface ExpandableListItemProps {
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
