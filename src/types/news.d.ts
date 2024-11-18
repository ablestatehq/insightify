import React from "react";
import type { Post } from "./discussion";

interface PostedBy{
  name: string;
}

export type NewsPost = {
  id: number
  title: string;
  // excerpt: string;
  content: string;
  resources: string[];
  featured_image: string;
  author?: string;
  publishedAt: string;
  readTime: string;
}


export type NewsAuthor = {
  name: string;
  imageUrl: string;
  ID: string;
}
export interface SegmentedControlProps{
  selectedTab: Tab;
  onTabChange: (value: Tab) => void;
}

export type Story = {
  title: string;
  content: string;
  image: any,
}

export type StoryProps = {
  stories: NewsPost[];
  loading: boolean;
}

export type SquareProps = {
  discussions: Post[]
}

export type PostDiscussionModal = {
  visible: boolean,
  close: () => void;
  setPost: React.Dispatch<React.SetStateAction<PostData[]>>
}

export type Tab = 'Square' | 'Stories'