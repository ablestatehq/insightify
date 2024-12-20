import { getData } from "@api/grapiql";
import { environments } from "@constants/environments";
import { Post } from "@src/types";
import { storeToLocalStorage } from "@src/utils/localStorageFunctions";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};
interface Comment {
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
interface PostContextType {
  posts: Post[];
  setPost: React.Dispatch<React.SetStateAction<Post[]>>;
  fetchComments: (id: number) => Promise<Comment[]>;
  submitComment: (id: number, comment: string, jwt: string, replyTo?: number) => Promise<Comment | null>;
};

const { BASE_URL, STRAPI_TOKEN } = environments;

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPost] = useState<Post[]>([]);

  const fetch_posts = async () => {
    const post_data = (await getData('posts')).data;

    setPost(post_data);
    storeToLocalStorage('posts', post_data);
  };

  const fetchComments = async (id: number,) => {
    const com_response = await (await fetch(`${BASE_URL}/api/comments/api::post.post:${id}?populate=author`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
    })).json();

    if (com_response) {
      return com_response;
    } else {
      return [];
    }
  }

  const submitComment = async (id: number, comment: string, jwt: string, replyTo?: number) => {
    if (comment.trim()) {
      const newCom: Omit<Comment, "id"> = {
        content: comment,
        threadOf: replyTo,
      }

      const com_response = await (await fetch(`${BASE_URL}/api/comments/api::post.post:${id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(newCom)
      })).json()

      if (com_response) {
        return com_response;
      }
      return null
    }
  }
  useEffect(() => {
    fetch_posts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPost, fetchComments, submitComment }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) throw new Error("useposts must be used within a PostProvider");
  return context;
};


export default PostProvider;
