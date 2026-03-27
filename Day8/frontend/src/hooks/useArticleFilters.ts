import { useState } from "react";

export function useArticleFilters() {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [showMyArticlesOnly, setShowMyArticlesOnly] = useState(false);
  const [selectedArticleType, setSelectedArticleType] = useState<string | null>(null);

  function handleTypeChange(type: string | null) {
    setSelectedArticleType(type);
    setShowMyArticlesOnly(false);
    setSelectedTagId(null);
  }

  function handleTagChange(tagId: string | null) {
    setSelectedTagId(tagId);
    setShowMyArticlesOnly(false);
  }

  function toggleMyArticles() {
    setShowMyArticlesOnly((prev) => !prev);
    setSelectedTagId(null);
    setSelectedArticleType(null);
  }

  return {
    selectedTagId,
    showMyArticlesOnly,
    selectedArticleType,
    handleTypeChange,
    handleTagChange,
    toggleMyArticles,
  };
}