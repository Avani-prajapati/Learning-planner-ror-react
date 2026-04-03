import { useState } from "react";
import {
  Box,
  Text,
  Badge,
  HStack,
  VStack,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { useArticle } from "../contexts/ArticleContext";
import { useAuth } from "../contexts/AuthContext";
import { type Article } from "../types";
import { DELETE_ARTICLE } from "../graphql/articles/mutation";
import { GET_ALL_ARTICLES } from "../graphql/articles/queries";
import "video.js/dist/video-js.css";
import VideoPlayer from "./VideoPlayer";
import { Modal } from "./ui/Modal";

interface ArticleProps {
  article: Article;
}

function ArticleCard({ article }: ArticleProps) {
  const { selectArticle } = useArticle();
  const { user, isAuthenticated } = useAuth();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const tagCount = article.tags?.length ?? 0;
  const tags = article.tags ?? [];
  const maxTagsToShow = 5;
  const displayedTags = tags.slice(0, maxTagsToShow);
  const remainingTagsCount = Math.max(0, tagCount - displayedTags.length);

  const bodyLineClamp = 3;
  const bodyMinHeightEm = bodyLineClamp * 1.5;

  const [deleteArticle] = useMutation(DELETE_ARTICLE, {
    refetchQueries: [{ query: GET_ALL_ARTICLES, variables: { tagId: null } }],
  });

  const handleVideoLinkClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsVideoModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = (): void => {
    deleteArticle({ variables: { id: article.id } });
    setIsDeleteModalOpen(false);
  };

  const isOwner = isAuthenticated && user?.id === article.user.id;

  return (
    <>
      <Box
        onClick={() => selectArticle(article)}
        cursor="pointer"
        bg="white"
        borderRadius="2xl"
        tabIndex={0}
        role="button"
        aria-label={`Open article ${article.title}`}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectArticle(article);
          }
        }}
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
        className="justify-between"
      >
        <VStack align="stretch" p={6} gap={3} h="100%">
          <HStack justify="space-between" align="start">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              color="gray.800"
              lineHeight="short"
              transition="color 0.2s"
              _hover={{ color: "blue.500" }}
            >
              {article.title}
            </Text>

            {isOwner && (
              <CloseButton
                size="xs"
                colorScheme="red"
                variant="outline"
                onClick={handleDeleteClick}
                borderRadius="lg"
                aria-label="Delete article"
                title="Delete article"
              />
            )}
          </HStack>

          <Box flex="1" minH="0">
            {article.body ? (
              <Text
                fontSize="sm"
                color="gray.600"
                lineHeight="1.5"
                minH={`${bodyMinHeightEm}em`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: bodyLineClamp,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {article.body}
              </Text>
            ) : article.videoUrl ? (
              <Link
                onClick={handleVideoLinkClick}
                color="blue.500"
                fontSize="sm"
                fontWeight="medium"
                textDecoration="underline"
                _hover={{ color: "blue.600" }}
              >
                🎥 Click to view video
              </Link>
            ) : null}
          </Box>

          <HStack
            justify="space-between"
            align="center"
            pt={2}
            borderTopWidth="1px"
            borderTopColor="gray.100"
          >
            <HStack gap={2} align="center" flexWrap="wrap">
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
                {article.comments?.length ?? 0} comments
              </Badge>

              {tagCount > 0 && (
                <HStack gap={2} flexWrap="wrap">
                  {displayedTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      colorScheme="green"
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="medium"
                      display="flex"
                      alignItems="center"
                      title={tag.name}
                    >
                      <Box as="span" mr={1}>
                        🏷️
                      </Box>
                      {tag.name}
                    </Badge>
                  ))}

                  {remainingTagsCount > 0 && (
                    <Badge
                      colorScheme="green"
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="medium"
                      display="flex"
                      alignItems="center"
                      title={`${remainingTagsCount} more tags`}
                    >
                      +{remainingTagsCount} more
                    </Badge>
                  )}
                </HStack>
              )}
            </HStack>
          </HStack>
        </VStack>
      </Box>

      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        size="lg"
      >
        {article.videoUrl && <VideoPlayer src={article.videoUrl} />}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Article"
        size="sm"
      >
        <VStack gap={4} align="stretch">
          <Text fontSize="sm" color="gray.600">
            Are you sure you want to delete this article? This action cannot be
            undone.
          </Text>

          <HStack justify="flex-end">
            <Box
              as="button"
              px={4}
              py={2}
              borderRadius="md"
              bg="gray.100"
              _hover={{ bg: "gray.200" }}
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Box>

            <Box
              as="button"
              px={4}
              py={2}
              borderRadius="md"
              bg="red.500"
              color="white"
              _hover={{ bg: "red.600" }}
              onClick={confirmDelete}
            >
              Delete
            </Box>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}

export default ArticleCard;
