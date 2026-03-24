import { useQuery } from '@apollo/client/react';
import {
  Box,
  Heading,
  Spinner,
  Text,
  VStack,
  Container,
} from '@chakra-ui/react';
import { GET_ALL_POSTS } from './graphql/queries';
import { type Post } from './types';
import PostCard from './components/PostCard';

interface GetAllPostsQuery {
  posts: Post[];
}

function App() {
  const { data, loading, error } = useQuery<GetAllPostsQuery>(GET_ALL_POSTS);

  return (
    <Box className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      
      {/* 🔷 Header */}
      <Box className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <Container maxW="6xl" py={6}>
          <VStack align="start" gap={1}>
            <Heading size="lg" className="text-gray-800">
              📋 Posts Dashboard
            </Heading>
            <Text className="text-gray-500 text-sm">
              Explore and manage all your posts in one place
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* 🔷 Content */}
      <Container maxW="6xl" py={10}>
        
        {/* Loading */}
        {loading && (
          <VStack gap={4} py={20}>
            <Spinner size="xl" width={'4px'} color="blue.500" />
            <Text className="text-gray-500">Loading posts...</Text>
          </VStack>
        )}

        {/* Error */}
        {error && (
          <Box className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
            <Text color="red.500" fontWeight="medium">
              ❌ {error.message}
            </Text>
          </Box>
        )}

        {/* Empty State */}
        {data && data.posts.length === 0 && (
          <VStack
            gap={4}
            py={20}
            className="bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            <Text fontSize="3xl">📭</Text>
            <Text className="text-gray-600 font-medium">
              No posts available
            </Text>
            <Text className="text-gray-400 text-sm">
              Start by creating your first post 🚀
            </Text>
          </VStack>
        )}

        {/* Posts Grid */}
        {data && data.posts.length > 0 && (
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.posts.map((post) => (
              <Box
                key={post.id}
                className="transform transition duration-300 hover:scale-[1.02]"
              >
                <PostCard post={post} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;