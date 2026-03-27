import { useQuery } from "@apollo/client/react";
import {
  Box,
  Spinner,
  Text,
  VStack,
  HStack,
  Container,
  Button,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { GET_ALL_ARTICLES } from "./graphql/articles/queries";
import { GET_TAGS } from "./graphql/tags/queries";
import { type Article, type Tag } from "./types";
import ArticleCard from "./components/ArticleCard";
import ArticleDetail from "./components/ArticleDetail";
import { useState, useMemo } from "react";
import CreateArticleForm from "./components/CreateArticleForm";
import { useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/AuthModel";
import Header from "./components/Header";
import ArticleFilters from "./components/ArticleFilters";

interface GetAllArticlesQuery {
  articles: Article[];
}

interface GetAllTagsQuery {
  tags: Tag[];
}

const articleTypeCollection = createListCollection({
  items: [
    { value: "text", label: "Text Only" },
    { value: "video", label: "Video Only" },
  ],
});

function useArticleFilter({
  articles,
  isMyView,
  currentUserId,
  selectedTagId,
  selectedArticleType,
}: {
  articles: Article[] | undefined;
  isMyView: boolean;
  currentUserId?: string;
  selectedTagId: string | null;
  selectedArticleType: string | null;
}) {
  return useMemo(() => {
    if (!articles) return [];

    let filtered = [...articles];

    if (isMyView && currentUserId) {
      filtered = filtered.filter(
        (article) => article.user.id === currentUserId,
      );
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

function EmptyState({
  isMyView,
  selectedArticleType,
}: {
  isMyView: boolean;
  selectedArticleType: string | null;
}) {
  const getMessage = () => {
    if (selectedArticleType) {
      return `No ${selectedArticleType === "text" ? "text" : "video"} articles available`;
    }
    if (isMyView) {
      return "No your articles available";
    }
    return "No Articles available";
  };

  return (
    <VStack
      gap={4}
      py={20}
      className="bg-white rounded-2xl shadow-sm border border-gray-200"
    >
      <Text className="text-gray-600 font-medium">{getMessage()}</Text>
    </VStack>
  );
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
      variables: { tagId: selectedTagId },
    },
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [tabOption, setTabOption] = useState("");

  const isMyView = showMyArticlesOnly && isAuthenticated;

  const filteredArticles = useArticleFilter({
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
        {loading && (
          <VStack gap={4} py={20}>
            <Spinner size="xl" width={"4px"} color="blue.500" />
            <Text className="text-gray-500">Loading Articles...</Text>
          </VStack>
        )}

        {error && (
          <Box className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
            <Text color="red.500" fontWeight="medium">
              {error.message}
            </Text>
          </Box>
        )}

        {data && (
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
        )}

        {data && filteredArticles.length === 0 ? (
          <EmptyState
            isMyView={isMyView}
            selectedArticleType={selectedArticleType}
          />
        ) : data && filteredArticles.length > 0 ? (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Box
                key={article.id}
                className="transform transition duration-300 hover:scale-[1.02]"
              >
                <ArticleCard Article={article} />
              </Box>
            ))}
          </Box>
        ) : null}
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
