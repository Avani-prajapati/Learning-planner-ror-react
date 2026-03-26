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
import { ArticleContext } from "../contexts/ArticleContext";
import { GET_ARTICLE } from "../graphql/articles/queries";
import { type Article } from "../types";
import AddCommentForm from "./CreateCommentForm";

interface GetArticleQuery {
  article: Article;
}

function ArticleDetail() {
  const { selectedArticle, isDetailOpen, closeDetail } =
    useContext(ArticleContext);

  const { data, loading, error } = useQuery<GetArticleQuery>(GET_ARTICLE, {
    variables: { id: selectedArticle?.id },
    skip: !selectedArticle?.id,
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
            <Heading size="md">Article Details</Heading>
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
                  {data.article.title}
                </Heading>
                <Badge colorScheme="blue">Article #{data.article.id}</Badge>
              </Box>

              <Box bg="gray.50" p={4} borderRadius="md">
                <Text>{data.article.body}</Text>
              </Box>

              <Box>
                <HStack justify="space-between" mb={3}>
                  <Heading size="sm">Comments</Heading>
                  <Badge colorScheme="blue">
                    {data.article.comments?.length || 0}
                  </Badge>
                </HStack>

                {!data.article.comments ||
                data.article.comments.length === 0 ? (
                  <Text color="gray.500">No comments yet.</Text>
                ) : (
                  <VStack gap={3} align="stretch">
                    {data.article.comments.map((comment) => (
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

export default ArticleDetail;
