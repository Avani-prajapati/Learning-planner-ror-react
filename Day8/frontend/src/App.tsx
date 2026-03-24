import { useContext } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { PostContext } from './contexts/PostContext';

function App() {
  const { selectedPost, isDetailOpen, selectPost, closeDetail } = useContext(PostContext);

  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Box textAlign="center" p={8}>
        <Heading size="xl" mb={4}>
          Context API Test
        </Heading>

        <Text color="gray.500" mb={4}>
          isDetailOpen: <strong>{String(isDetailOpen)}</strong>
        </Text>

        <Text color="gray.500" mb={6}>
          selectedPost: <strong>{selectedPost ? selectedPost.title : 'none'}</strong>
        </Text>

        <Button
          onClick={() =>
            selectPost({
              id: '1',
              title: 'Test Post',
              body: 'Hello from context!',
              createdAt: new Date().toISOString(),
              comments: [],
            })
          }
          colorScheme="blue"
          mr={3}
        >
          Select a Post
        </Button>

        <Button onClick={closeDetail} colorScheme="red">
          Close Detail
        </Button>
      </Box>
    </Box>
  );
}

export default App;