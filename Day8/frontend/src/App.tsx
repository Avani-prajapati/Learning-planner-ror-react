import { Box, Heading, Text } from '@chakra-ui/react';

function App() {
  return (
    <Box className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Box textAlign="center" p={8}>
        <Heading size="xl" mb={2}>
          🚀 Setup working!
        </Heading>
        <Text color="gray.500" mb={4}>
          Chakra UI v3 is loaded.
        </Text>
        <p className="text-blue-500 font-bold text-lg">
          This blue text confirms Tailwind v4 works.
        </p>
      </Box>
    </Box>
  );
}

export default App;