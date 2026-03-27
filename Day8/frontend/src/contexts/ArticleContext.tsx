import { createContext, useState, type ReactNode, useContext } from "react";
import { type Article } from "../types";

interface ArticleContextType {
  selectedArticle: Article | null;
  isDetailOpen: boolean;
  selectArticle: (Article: Article) => void;
  closeDetail: () => void;
}

export const ArticleContext = createContext<ArticleContextType>({
  selectedArticle: null,
  isDetailOpen: false,
  selectArticle: () => {},
  closeDetail: () => {},
});

export function ArticleProvider({ children }: { children: ReactNode }) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const selectArticle = (Article: Article) => {
    setSelectedArticle(Article);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedArticle(null);
    setIsDetailOpen(false);
  };

  return (
    <ArticleContext.Provider
      value={{ selectedArticle, isDetailOpen, selectArticle, closeDetail }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export function useArticle() {
  return useContext(ArticleContext);
}
