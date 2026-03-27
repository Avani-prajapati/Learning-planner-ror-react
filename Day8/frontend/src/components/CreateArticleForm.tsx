import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  VStack,
  HStack,
  Menu,
} from "@chakra-ui/react";
import { GET_ALL_ARTICLES } from "../graphql/articles/queries";
import { GET_TAGS } from "../graphql/tags/queries";
import { CREATE_ARTICLE } from "../graphql/articles/mutation";
import { type Article, type Tag } from "../types";
import { useArticleForm } from "../hooks/useArticleForm";
import { buildVariables, validateForm } from "../utility/articleForm";
import { Modal } from "./ui/Modal";

interface CreateArticleFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CreateArticleResponse {
  createArticle: {
    article: Article | null;
    errors: string[];
  };
}

function CreateArticleForm({ isOpen, onClose }: CreateArticleFormProps) {
  const { formState, setField, toggleTag, setArticleType, reset } =
    useArticleForm();
  const [error, setError] = useState("");

  const { data: tagsData } = useQuery<{ tags: Tag[] }>(GET_TAGS);

  const availableTags = useMemo(
    () =>
      tagsData?.tags?.filter(
        (tag) => !formState.selectedTagIds.includes(tag.id),
      ) ?? [],
    [tagsData?.tags, formState.selectedTagIds],
  );

  const [createArticle, { loading }] = useMutation<CreateArticleResponse>(
    CREATE_ARTICLE,
    {
      update(cache, { data }) {
        if (!data?.createArticle.article) return;
        const existing = cache.readQuery<{ articles: Article[] }>({
          query: GET_ALL_ARTICLES,
        });
        if (existing) {
          cache.writeQuery({
            query: GET_ALL_ARTICLES,
            data: {
              articles: [data.createArticle.article, ...existing.articles],
            },
          });
        }
      },
      onCompleted(data) {
        if (data.createArticle.errors.length > 0) {
          setError(data.createArticle.errors[0]);
        } else {
          reset();
          setError("");
          onClose();
        }
      },
      onError: (err) => setError(err.message),
    },
  );

  const handleSubmit = () => {
    const validationError = validateForm(formState);
    if (validationError) {
      setError(validationError);
      return;
    }
    createArticle({ variables: buildVariables(formState) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Article" size="lg">
      <VStack gap={4} align="stretch">
        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
            Title
          </Text>
          <Input
            placeholder="Enter Article title..."
            value={formState.title}
            onChange={(e) => setField("title", e.target.value)}
            borderRadius="xl"
          />
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
            Tags
          </Text>
          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                variant="outline"
                borderRadius="xl"
                w="100%"
                disabled={availableTags.length === 0}
              >
                {availableTags.length === 0 ? "All tags selected" : "Add Tag"}
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content maxH="200px" overflowY="auto">
                {availableTags.map((tag) => (
                  <Menu.Item
                    key={tag.id}
                    value={tag.id}
                    onSelect={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>

          {formState.selectedTagIds.length > 0 && (
            <HStack gap={2} flexWrap="wrap" mt={2}>
              {formState.selectedTagIds.map((id) => {
                const tag = tagsData?.tags.find((t) => t.id === id);
                return (
                  <Button
                    key={id}
                    size="xs"
                    borderRadius="full"
                    colorScheme="blue"
                    onClick={() => toggleTag(id)}
                  >
                    {tag?.name} ✕
                  </Button>
                );
              })}
            </HStack>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
            Article Type
          </Text>
          <HStack gap={2}>
            {(["text", "video"] as const).map((type) => (
              <Button
                key={type}
                size="sm"
                borderRadius="xl"
                variant="outline"
                colorPalette={
                  formState.articleType === type ? "blue" : "gray"
                }
                onClick={() => setArticleType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </HStack>
        </Box>

        {formState.articleType === "text" ? (
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              Body
            </Text>
            <Textarea
              placeholder="Write your Article content..."
              value={formState.body}
              onChange={(e) => setField("body", e.target.value)}
              rows={5}
              borderRadius="xl"
              resize="none"
            />
          </Box>
        ) : (
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              Video File
            </Text>
            <Input
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              borderRadius="xl"
              p={1}
              onChange={(e) =>
                setField("videoFile", e.target.files?.[0] ?? null)
              }
            />
            {formState.videoFile && (
              <Text fontSize="xs" color="gray.500" mt={1}>
                Selected: {formState.videoFile.name}
              </Text>
            )}
          </Box>
        )}

        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
            {error === "Not authenticated" ? " - Please login" : ""}
          </Text>
        )}

        <HStack justify="flex-end" gap={3}>
          <Button variant="ghost" borderRadius="xl" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            borderRadius="xl"
            onClick={handleSubmit}
            loading={loading}
          >
            Create Article
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
}

export default CreateArticleForm