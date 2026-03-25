import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  Heading,
  VStack,
  HStack,
  Menu,
} from "@chakra-ui/react";
import { GET_ALL_ARTICLES, GET_TAGS } from "../graphql/queries";
import { CREATE_ARTICLE } from "../graphql/mutations";
import type { Article, Tag } from "../types";

interface Props {
  onClose: () => void;
}

interface CreateArticleResponse {
  createArticle: {
    article: Article | null;
    errors: string[];
  };
}

function CreateArticleForm({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { data: tagsData } = useQuery(GET_TAGS);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const [createArticle, { loading }] = useMutation<CreateArticleResponse>(
    CREATE_ARTICLE,
    {
      refetchQueries: [{ query: GET_ALL_ARTICLES, variables: {tagId: null} }],
      onCompleted: (data) => {
        if (data.createArticle.errors.length > 0) {
          setError(data.createArticle.errors[0]);
        } else {
          setTitle("");
          setBody("");
          setError("");
          onClose();
        }
      },
      onError: (err) => setError(err.message),
    }
  );

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) {
      setError("Title and body are required.");
      return;
    }
    createArticle({
      variables: {
        title: title.trim(),
        body: body.trim(),
        status: "public",
        tagIds: selectedTagIds,
      },
    });
  };

  const availableTags =
    tagsData?.tags?.filter((tag: Tag) => !selectedTagIds.includes(tag.id)) || [];

  return (
    <Box
      position="fixed"
      inset={0}
      bg="blackAlpha.600"
      zIndex={50}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
    >
      <Box
        bg="white"
        borderRadius="2xl"
        p={8}
        w="100%"
        maxW="lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Heading size="md" mb={6}>
          Create New Article
        </Heading>

        <VStack gap={4} align="stretch">
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              Title
            </Text>
            <Input
              placeholder="Enter Article title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              borderRadius="xl"
            />
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              Body
            </Text>
            <Textarea
              placeholder="Write your Article content..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              borderRadius="xl"
              resize="none"
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
                  {availableTags.map((tag: Tag) => (
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

            {/* Selected Tags */}
            {selectedTagIds.length > 0 && (
              <HStack gap={2} flexWrap="wrap" mt={2}>
                {selectedTagIds.map((id) => {
                  const tag = tagsData?.tags.find((t: Tag) => t.id === id);
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

          {error && (
            <Text color="red.500" fontSize="sm">
              {error} {error === "Not authenticated" ? "- Please login" : ""}
            </Text>
          )}

          <Box display="flex" justifyContent="flex-end" gap={3}>
            <Button variant="ghost" borderRadius="xl" onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              borderRadius="xl"
              onClick={handleSubmit}
              loading={loading}
              disabled={!title.trim() || !body.trim()}
            >
              Create Article
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default CreateArticleForm;