import { useState } from "react";

export function useArticleFilters() {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [showMyArticlesOnly, setShowMyArticlesOnly] = useState<boolean>(false);
  const [selectedArticleType, setSelectedArticleType] = useState<string | null>(
    null,
  );

  function handleTypeChange(type: string | null): void {
    setSelectedArticleType(type);
    setShowMyArticlesOnly(false);
    setSelectedTagId(null);
  }

  function handleTagChange(tagId: string | null): void {
    setSelectedTagId(tagId);
    setShowMyArticlesOnly(false);
  }

  function toggleMyArticles(): void {
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
