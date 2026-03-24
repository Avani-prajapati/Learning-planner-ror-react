import { useContext } from 'react';
import { Box, Text, Badge, HStack, VStack } from '@chakra-ui/react';
import { PostContext } from '../contexts/PostContext';
import { type Post } from '../types';

interface Props {
  post: Post;
}

function PostCard({ post }: Props) {
  const { selectPost } = useContext(PostContext);

  return (
    <Box
      onClick={() => selectPost(post)}
      cursor="pointer"
      bg="white"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="gray.200"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: 'blue.200',
        bg: 'gray.50',
      }}
      position="relative"
      height="100%"
    >
      {/* Top accent line */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="3px"
        bgGradient="linear(to-r, blue.400, purple.500)"
        opacity={0.6}
        transition="opacity 0.3s"
        _hover={{ opacity: 1 }}
      />
      
      {/* Content Container */}
      <VStack align="stretch" p={6} gap={3}>
        {/* Title */}
        <Text
          fontSize="lg"
          fontWeight="semibold"
          color="gray.800"
          lineHeight="short"
          transition="color 0.2s"
          _hover={{ color: 'blue.500' }}
        >
          {post.title}
        </Text>

        {/* Body */}
        <Text
          fontSize="sm"
          color="gray.600"
          lineHeight="relaxed"
          mb={2}
        >
          {post.body}
        </Text>

        {/* Footer */}
        <HStack 
          justify="space-between" 
          align="center" 
          pt={2}
          borderTopWidth="1px"
          borderTopColor="gray.100"
        >
          <Badge
            colorScheme="blue"
            variant="subtle"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="medium"
            display="flex"
            alignItems="center"
          >
            <Box as="span" mr={1}>💬</Box>
            {post.comments?.length ?? 0} comments
          </Badge>

          <Text
            fontSize="xs"
            fontWeight="medium"
            color="gray.400"
            transition="all 0.2s"
            _hover={{ color: 'blue.500', transform: 'translateX(4px)' }}
          >
            View details →
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default PostCard;