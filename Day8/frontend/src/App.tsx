import { useQuery } from '@apollo/client/react';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
import { GET_ALL_POSTS } from './graphql/queries';
import { type Post } from './types';

interface GetAllPostsQuery {
  posts: Post[];
}

function App() {
  const { data, loading, error } = useQuery<GetAllPostsQuery>(GET_ALL_POSTS);

  return (
    <Box className="min-h-screen bg-gray-100 p-8">
      <Heading size="xl" mb={6}>
        All Posts
      </Heading>

      {loading && <Spinner size="lg" />}

      {error && (
        <Text color="red.500">
          ❌ Error: {error.message}
        </Text>
      )}

      {data && data.posts.map((post) => (
        <Box
          key={post.id}
          bg="white"
          p={4}
          mb={4}
          borderRadius="md"
          shadow="sm"
        >
          <Text fontWeight="bold">{post.title}</Text>
          <Text color="gray.500" fontSize="sm">{post.body}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default App;