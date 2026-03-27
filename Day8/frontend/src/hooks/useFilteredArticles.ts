import { useMemo } from "react";
import { type Article } from "../types";

interface FilterParams {
  articles?: Article[];
  isMyView: boolean;
  currentUserId?: string;
  selectedTagId: string | null;
  selectedArticleType: string | null;
}

export function useFilteredArticles({
  articles,
  isMyView,
  currentUserId,
  selectedTagId,
  selectedArticleType,
}: FilterParams) {
  return useMemo(() => {
    if (!articles) return [];

    let filtered = [...articles];

    if (isMyView && currentUserId) {
      filtered = filtered.filter((article) => article.user.id === currentUserId);
    }

    if (selectedTagId) {
      filtered = filtered.filter((article) =>
        article.tags?.some((tag) => tag.id === selectedTagId),
      );
    }

    if (selectedArticleType) {
      filtered = filtered.filter(
        (article) => article.articleType === selectedArticleType,
      );
    }

    return filtered;
  }, [articles, isMyView, currentUserId, selectedTagId, selectedArticleType]);
}