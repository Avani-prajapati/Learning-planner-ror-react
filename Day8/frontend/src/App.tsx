import { useQuery } from "@apollo/client/react";
import {
  Box,
  Heading,
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
      <Text className="text-gray-400 text-sm">
        Start by creating your first Article 🚀
      </Text>
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

  function handleModal(tab: string) {
    setShowAuthModal(true);
    setTabOption(tab);
  }

  const handleTagSelect = (tagId: string | null) => {
    setSelectedTagId(tagId);
    setShowMyArticlesOnly(false);
  };

  const handleMyArticlesToggle = () => {
    setShowMyArticlesOnly(!showMyArticlesOnly);
    setSelectedTagId(null);
    setSelectedArticleType(null);
  };

  return (
    <Box className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200">
      <Box className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <Container maxW="6xl" py={6}>
          <HStack align="start" className="justify-between">
            <Heading size="lg" className="text-gray-800">
              Blogger
            </Heading>
            <HStack gap={3}>
              {isAuthenticated ? (
                <>
                  <Text fontSize="sm" color="gray.600">
                    {user?.name}
                  </Text>
                  <Button variant="outline" colorScheme="red" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleModal("signin")}
                  >
                    Login
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleModal("signup")}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </HStack>
          </HStack>
        </Container>
      </Box>

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
          <HStack className=" justify-between" pb={3}>
            <HStack gap={2} flexWrap="wrap">
              <Button
                size="sm"
                borderRadius="full"
                variant={
                  selectedTagId === null && !isMyView ? "solid" : "outline"
                }
                colorPalette={
                  selectedTagId === null && !isMyView ? "blue" : "gray"
                }
                onClick={() => handleTagSelect(null)}
              >
                All
              </Button>
              {tagsData?.tags.map((tag) => (
                <Button
                  key={tag.id}
                  size="sm"
                  borderRadius="full"
                  variant={
                    selectedTagId === tag.id && !isMyView ? "solid" : "outline"
                  }
                  colorPalette={selectedTagId === tag.id ? "blue" : "gray"}
                  onClick={() => handleTagSelect(tag.id)}
                >
                  {tag.name}
                </Button>
              ))}
              {isAuthenticated && (
                <Button
                  size="sm"
                  borderRadius="full"
                  variant={showMyArticlesOnly ? "solid" : "outline"}
                  colorPalette={showMyArticlesOnly ? "blue" : "gray"}
                  onClick={handleMyArticlesToggle}
                >
                  My Articles
                </Button>
              )}

              <Select.Root
                collection={articleTypeCollection}
                value={selectedArticleType ? [selectedArticleType] : []}
                onValueChange={(e) => {
                  setSelectedArticleType(e.value[0] || null);
                  setShowMyArticlesOnly(false);
                  setSelectedTagId(null);
                }}
                size="sm"
                width="220px"
              >
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="All Types" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                    <Select.ClearTrigger />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Select.Positioner>
                  <Select.Content>
                    {articleTypeCollection.items.map((item) => (
                      <Select.Item key={item.value} item={item.value}>
                        {item.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </HStack>
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
