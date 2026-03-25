import { useContext } from "react";
import { useQuery } from "@apollo/client/react";
import {
  Box,
  Text,
  Heading,
  Spinner,
  Badge,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { PostContext } from "../contexts/PostContext";
import { GET_POST } from "../graphql/queries";
import { type Post } from "../types";
import AddCommentForm from "./CreateCommentForm";

interface GetPostQuery {
  post: Post;
}

function PostDetail() {
  const { selectedPost, isDetailOpen, closeDetail } = useContext(PostContext);

  const { data, loading, error } = useQuery<GetPostQuery>(GET_POST, {
    variables: { id: selectedPost?.id },
    skip: !selectedPost?.id,
  });

  if (!isDetailOpen) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      zIndex={50}
      display="flex"
      justifyContent="flex-end"
      onClick={closeDetail}
    >
      <Box
        bg="white"
        w="100%"
        maxW="lg"
        h="100vh"
        overflowY="auto"
        position="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Box borderBottom="1px" borderColor="gray.200" px={6} py={4}>
          <HStack justify="space-between" align="center">
            <Heading size="md">Post Details</Heading>
            <Button size="sm" variant="ghost" onClick={closeDetail}>
              Close
            </Button>
          </HStack>
        </Box>

        <Box p={6}>
          {loading && (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" />
              <Text mt={2}>Loading...</Text>
            </Box>
          )}

          {error && (
            <Box bg="red.50" p={4} borderRadius="md">
              <Text color="red.600">Error: {error.message}</Text>
            </Box>
          )}

          {data && (
            <VStack align="stretch" gap={4}>
              <Box>
                <Heading size="lg" mb={2}>
                  {data.post.title}
                </Heading>
                <Badge colorScheme="blue">Post #{data.post.id}</Badge>
              </Box>

              <Box bg="gray.50" p={4} borderRadius="md">
                <Text>{data.post.body}</Text>
              </Box>

              <Box>
                <HStack justify="space-between" mb={3}>
                  <Heading size="sm">Comments</Heading>
                  <Badge colorScheme="blue">
                    {data.post.comments?.length || 0}
                  </Badge>
                </HStack>

                {!data.post.comments || data.post.comments.length === 0 ? (
                  <Text color="gray.500">No comments yet.</Text>
                ) : (
                  <VStack gap={3} align="stretch">
                    {data.post.comments.map((comment) => (
                      <Box
                        key={comment.id}
                        bg="gray.50"
                        p={3}
                        borderRadius="md"
                      >
                        <Text color="gray.600">{comment.body}</Text>
                      </Box>
                    ))}
                  </VStack>
                )}
              </Box>

              <Box borderTop={"1px"} borderColor={"gray.200"} pt={4}>
                <AddCommentForm />
              </Box>
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PostDetail;
