import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import ArticleGrid from "./ArticleGrid";
import { type Article } from "../types";

interface ArticleListProps {
  loading: boolean;
  error?: Error;
  articles?: Article[];
  isMyView: boolean;
  selectedArticleType: string | null;
}

function ArticleList({
  loading,
  error,
  articles,
  isMyView,
  selectedArticleType,
}: ArticleListProps) {
  if (loading && !articles) return <LoadingState />;

  if (error) return <ErrorState message={error.message} />;

  if (!articles || articles.length === 0) {
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
