import { createContext, useState, type ReactNode } from "react";
import { type Post } from "../types";

interface PostContextType {
  selectedPost: Post | null;
  isDetailOpen: boolean;
  selectPost: (post: Post) => void;
  closeDetail: () => void;
}

export const PostContext = createContext<PostContextType>({
  selectedPost: null,
  isDetailOpen: false,
  selectPost: () => {},
  closeDetail: () => {},
});

export function PostProvider({ children }: { children: ReactNode }) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const selectPost = (post: Post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedPost(null);
    setIsDetailOpen(false);
  };

  return (
    <PostContext.Provider
      value={{ selectedPost, isDetailOpen, selectPost, closeDetail }}
    >
      {children}
    </PostContext.Provider>
  );
}
