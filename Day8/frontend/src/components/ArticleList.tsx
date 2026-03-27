import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import ArticleGrid from "./ArticleGrid";
import { type Article } from "../types";

interface ArticleListProps {
  loading: boolean;
  error?: Error;
  articles?: Article[];
  isEmpty: boolean;
  isMyView: boolean;
  selectedArticleType: string | null;
}

function ArticleList({
  loading,
  error,
  articles,
  isEmpty,
  isMyView,
  selectedArticleType,
}: ArticleListProps) {
  if (loading) return <LoadingState />;

  if (error) return <ErrorState message={error.message} />;

  if (!articles) return null;

  if (isEmpty) {
    return (
      <EmptyState
        isMyView={isMyView}
        selectedArticleType={selectedArticleType}
      />
    );
  }

  return <ArticleGrid articles={articles} />;
}

export default ArticleList;
