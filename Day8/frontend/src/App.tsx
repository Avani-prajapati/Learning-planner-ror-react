import { useQuery } from "@apollo/client/react";
import {
  Box,
  HStack,
  Container,
  Button,
} from "@chakra-ui/react";
import { GET_ALL_ARTICLES } from "./graphql/articles/queries";
import { GET_TAGS } from "./graphql/tags/queries";
import { type Article, type Tag } from "./types";
import ArticleDetail from "./components/ArticleDetail";
import { useState} from "react";
import CreateArticleForm from "./components/CreateArticleForm";
import { useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/AuthModel";
import Header from "./components/Header";
import ArticleFilters from "./components/ArticleFilters";
import ArticleList from "./components/ArticleList";
import { useFilteredArticles } from "./hooks/useFilteredArticles";

interface GetAllArticlesQuery {
  articles: Article[];
}

interface GetAllTagsQuery {
  tags: Tag[];
}

function App() {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [showMyArticlesOnly, setShowMyArticlesOnly] = useState(false);
  const [selectedArticleType, setSelectedArticleType] = useState<string | null>(
    null,
  );
  const { data: tagsData } = useQuery<GetAllTagsQuery>(GET_TAGS);
  const { data, loading, error } = useQuery<GetAllArticlesQuery>(
    GET_ALL_ARTICLES,
    {
      fetchPolicy: "cache-and-network"
    },
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [tabOption, setTabOption] = useState("");

  const isMyView = showMyArticlesOnly && isAuthenticated;

  const filteredArticles = useFilteredArticles({
    articles: data?.articles,
    isMyView,
    currentUserId: user?.id,
    selectedTagId,
    selectedArticleType,
  });
  
  function openAuthModal(mode: string) {
    setShowAuthModal(true);
    setTabOption(mode);
  }

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

  return (
    <Box className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={() => openAuthModal("signin")}
        onSignup={() => openAuthModal("signup")}
        onLogout={logout}
      />

      <Container maxW="6xl" py={5}>
        {data && (
          <HStack className=" justify-between" pb={3}>
            <ArticleFilters
              tags={tagsData?.tags || []}
              selectedTagId={selectedTagId}
              selectedArticleType={selectedArticleType}
              isMyView={isMyView}
              isAuthenticated={isAuthenticated}
              onTagChange={handleTagChange}
              onTypeChange={handleTypeChange}
              onToggleMyArticles={toggleMyArticles}
            />

            {isAuthenticated && (
              <HStack>
                <Button
                  colorPalette={"gray"}
                  onClick={() => setShowCreateForm(true)}
                  mb={2}
                >
                  Add Article
                </Button>
              </HStack>
            )}
          </HStack>
        )}

        <ArticleList
          loading={loading}
          error={error}
          articles={filteredArticles}
          isEmpty={filteredArticles.length === 0}
          isMyView={isMyView}
          selectedArticleType={selectedArticleType}
        />
      </Container>

      <ArticleDetail />
      {showCreateForm && (
        <CreateArticleForm onClose={() => setShowCreateForm(false)} />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          tabOption={tabOption}
        />
      )}
    </Box>
  );
}

export default App;
