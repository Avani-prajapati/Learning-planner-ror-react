import { useContext } from "react";
import { Box, Text, Badge, HStack, VStack, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { ArticleContext } from "../contexts/ArticleContext";
import { useAuth } from "../contexts/AuthContext";
import { type Article } from "../types";
import { DELETE_ARTICLE } from "../graphql/articles/mutation";
import { GET_ALL_ARTICLES } from "../graphql/articles/queries";

interface Props {
  Article: Article;
}

function ArticleCard({ Article }: Props) {
  const { selectArticle } = useContext(ArticleContext);
  const { user, isAuthenticated } = useAuth();

  const [deleteArticle] = useMutation(DELETE_ARTICLE, {
    refetchQueries: [{ query: GET_ALL_ARTICLES, variables: { tagId: null } }],
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteArticle({ variables: { id: Article.id } });
  };

  const isOwner = isAuthenticated && user?.id === Article.user.id;

  return (
    <Box
      onClick={() => selectArticle(Article)}
      cursor="pointer"
      bg="white"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="gray.200"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
        borderColor: "blue.200",
        bg: "gray.50",
      }}
      position="relative"
      height="100%"
    >
      <VStack align="stretch" p={6} gap={3}>
        <HStack justify="space-between" align="start">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="gray.800"
            lineHeight="short"
            transition="color 0.2s"
            _hover={{ color: "blue.500" }}
          >
            {Article.title}
          </Text>

          {isOwner && (
            <Button
              size="xs"
              colorScheme="red"
              variant="ghost"
              onClick={handleDelete}
              borderRadius="lg"
            >
              X
            </Button>
          )}
        </HStack>

        <Text fontSize="sm" color="gray.600" lineHeight="relaxed" mb={2}>
          {Article.body}
        </Text>

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
            <Box as="span" mr={1}>
              💬
            </Box>
            {Article.comments?.length ?? 0} comments
          </Badge>

          <Text
            fontSize="xs"
            fontWeight="medium"
            color="gray.400"
            transition="all 0.2s"
            _hover={{ color: "blue.500", transform: "translateX(4px)" }}
          >
            View details →
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default ArticleCard;
