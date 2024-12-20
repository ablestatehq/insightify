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
  gotThread?: boolean;
  children?: Comment[];
};
