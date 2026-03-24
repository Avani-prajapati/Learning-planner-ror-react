import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

interface Post {
  id: string,
  title: string
}

interface GetPostsQuery {
  posts : Post[];
}

const TEST_QUERY = gql`
  query {
    posts {
      id
      title
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery<GetPostsQuery>(TEST_QUERY);

  console.log(data)
  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Box textAlign="center" p={8}>
        <Heading size="xl" mb={4}>
          Apollo Connection Test
        </Heading>

        {loading && <Spinner size="lg" />}

        {error && (
          <Text color="red.500">
            ❌ Error: {error.message}
          </Text>
        )}

        {data && (
          <Box>
            <Text color="green.500" fontWeight="bold" mb={2}>
              ✅ Connected to Rails GraphQL!
            </Text>
            <Text color="gray.600">
              Found {data.posts.length} posts
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;