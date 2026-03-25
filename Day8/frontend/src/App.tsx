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
} from "@chakra-ui/react";
import { GET_ALL_ARTICLES } from "./graphql/queries";
import { type Article } from "./types";
import ArticleCard from "./components/ArticleCard";
import ArticleDetail from "./components/ArticleDetail";
import { useState } from "react";
import CreateArticleForm from "./components/CreateArticleForm";
import { useAuth } from "./contexts/AuthContext";
import AuthModal from "./components/AuthModel";

interface GetAllArticlesQuery {
  articles: Article[];
}

function App() {
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

const { data, loading, error } = useQuery<GetAllArticlesQuery>(GET_ALL_ARTICLES, {
  variables: { tagId: selectedTagId },
});
  // const { data, loading, error } = useQuery<GetAllArticlesQuery>(GET_ALL_ARTICLES);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [tabOption, setTabOption] = useState('');

  function handleModal(tab:string){
    setShowAuthModal(true);
	setTabOption(tab)
  }

  return (
    <Box className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200">
      <Box className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <Container maxW="6xl" py={6}>
          <HStack align="start" className="justify-between">
            <Heading size="lg" className="text-gray-800">
              Articles Dashboard
            </Heading>
			<HStack gap={3}>
              {isAuthenticated ? (
                <>
                  <Text fontSize="sm" color="gray.600">👋 {user?.name}</Text>
                  <Button variant="outline" colorScheme="red" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
				<>
                <Button colorScheme="blue" onClick={()=>handleModal('signin')}>
                  Login
                </Button>
                <Button colorScheme="blue" onClick={()=>handleModal('signup')}>
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
        {data && 
        (<HStack className=" justify-between" pb={3}>
          <HStack gap={2} flexWrap="wrap" > 

          <Button
            size="sm"
            borderRadius="full"
            colorScheme={selectedTagId === null ? 'blue' : 'gray'}
            onClick={() => setSelectedTagId(null)}
          >
            All
          </Button>
          {data?.articles
            .flatMap((a) => a.tags)
            .filter((tag, index, self) => self.findIndex((t) => t.id === tag.id) === index)
            .map((tag) => (
              <Button
                key={tag.id}
                size="sm"
                borderRadius="full"
                colorScheme={selectedTagId === tag.id ? 'blue' : 'gray'}
                onClick={() => setSelectedTagId(tag.id)}
              >
                {tag.name}
              </Button>
            ))}
          </HStack>
            <Button
              colorScheme={"blue"}
              onClick={() => setShowCreateForm(true)}
              mb={2}
            >
              Add Article
        </Button>
        </HStack>)}
        {data && data.articles.length === 0 && (
          <VStack
            gap={4}
            py={20}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <Text className="text-gray-600 font-medium">
              No Articles available
            </Text>
            <Text className="text-gray-400 text-sm">
              Start by creating your first Article 🚀
            </Text>
          </VStack>
        )}

        {data && data.articles.length > 0 && (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           
            {data.articles.map((article) => (
              <Box
                key={article.id}
                className="transform transition duration-300 hover:scale-[1.02]"
              >
                <ArticleCard Article={article} />
              </Box>
            ))}
          </Box>
        )}
      </Container>

      <ArticleDetail />
      {showCreateForm && (
        <CreateArticleForm
          onClose={() => setShowCreateForm(false)}
        ></CreateArticleForm>
      )}

	  {showAuthModal && <AuthModal onClose={()=>setShowAuthModal(false)} tabOption={tabOption}></AuthModal>}
    </Box>
  );
}

export default App;
