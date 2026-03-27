import { useQuery } from "@apollo/client/react";
import { Box, HStack, Container, Button } from "@chakra-ui/react";
import { GET_ALL_ARTICLES } from "./graphql/articles/queries";
import { GET_TAGS } from "./graphql/tags/queries";
import { type Article, type Tag } from "./types";
import ArticleDetail from "./components/ArticleDetail";
import { useState } from "react";
import CreateArticleForm from "./components/CreateArticleForm";
import { useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/AuthModal";
import Header from "./components/Header";
import ArticleFilters from "./components/ArticleFilters";
import ArticleList from "./components/ArticleList";
import { useFilteredArticles } from "./hooks/useFilteredArticles";
import { useAuthModal } from "./hooks/useAuthModal";
import { useArticleFilters } from "./hooks/useArticleFilters";

interface GetAllArticlesQuery {
  articles: Article[];
}

interface GetAllTagsQuery {
  tags: Tag[];
}

function App() {
  const { isAuthenticated, user } = useAuth();
  const authModal = useAuthModal();
  const filters = useArticleFilters();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data, loading, error } = useQuery<GetAllArticlesQuery>(
    GET_ALL_ARTICLES,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const { data: tagsData } = useQuery<GetAllTagsQuery>(GET_TAGS);

  const isMyView = filters.showMyArticlesOnly && isAuthenticated;

  const filteredArticles = useFilteredArticles({
    articles: data?.articles,
    isMyView,
    currentUserId: user?.id,
    selectedTagId: filters.selectedTagId,
    selectedArticleType: filters.selectedArticleType,
  });

  return (
    <Box className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200">
      <Header
        onLogin={() => authModal.open("signin")}
        onSignup={() => authModal.open("signup")}
      />

      <Container maxW="6xl" py={5}>
        {data && (
          <HStack className="justify-between" pb={3}>
            <ArticleFilters
              tags={tagsData?.tags ?? []}
              selectedTagId={filters.selectedTagId}
              selectedArticleType={filters.selectedArticleType}
              isMyView={isMyView}
              onTagChange={filters.handleTagChange}
              onTypeChange={filters.handleTypeChange}
              onToggleMyArticles={filters.toggleMyArticles}
              isAuthenticated={isAuthenticated}
            />
            {isAuthenticated && (
              <Button
                colorPalette="gray"
                onClick={() => setShowCreateForm(true)}
                mb={2}
              >
                Add Article
              </Button>
            )}
          </HStack>
        )}

        <ArticleList
          loading={loading}
          error={error}
          articles={filteredArticles}
          isMyView={isMyView}
          selectedArticleType={filters.selectedArticleType}
        />
      </Container>

      <ArticleDetail />

      <CreateArticleForm 
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)} 
      />
      
      <AuthModal 
        isOpen={authModal.isOpen}
        onClose={authModal.close}
        defaultTab={authModal.tabOption}
      />
    </Box>
  );
}

export default App;