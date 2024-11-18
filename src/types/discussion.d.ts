import type { Media } from "./media";
export type PostResponse = {
  posts: Post[];
};

export type Post = {
  id: number;
  author: {data: PostAuthor};
  content: string;
  createdAt?: string;
  media: Media[] | null;
  mentions?: object | null;
  poll: Poll | null;
  topics: {data: Topic[]};
  type?: string;
  updatedAt?: string;
  views: number | null;
  meta?: Record<string, unknown>;
};

type PostTopic = {
  attributes: Topic[]
}
export type Poll = {
  data: {
    id: string;
    attributes: {
      options: Option[];
      endDate: string;
      isMultipleChoice?: boolean;
      status?: string;
    };
  };
};

export type Option = {
  label: string;
  votes: number;
};

type Topic = {
  id: number;
  attributes: {
    createdAt?: string;
    description?: string | null;
    isTrending?: boolean | null;
    name?: string;
    posts?: object | null;
    publishedAt?: string;
    slug?: string | null;
    updatedAt?: string;
    usageCount?: number | null;
    meta?: Record<string, unknown>;
  }
};

export type PostPoll = {

}

export type PostTopic = {
  
}

export type PostAuthor = {
  attributes: AuthorAttributes
}

export type AuthorAttributes = {
  email: string;
  firstName: string;
  lastName: string;
  photo: Media
}
    