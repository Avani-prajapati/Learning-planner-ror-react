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
import { GET_ALL_ARTICLES } from "../graphql/articles/queries";
import { GET_TAGS } from "../graphql/tags/queries";
import { CREATE_ARTICLE } from "../graphql/articles/mutation";
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

interface TagsQuery {
  tags: Tag[];
}

function CreateArticleForm({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [articleType, setArticleType] = useState<"text"|"video">("text")
  const [videoFile, setVideoFile] = useState<File|null>(null);
  const { data: tagsData } = useQuery<TagsQuery>(GET_TAGS);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const [createArticle, { loading }] = useMutation<CreateArticleResponse>(
    CREATE_ARTICLE,
    {
      refetchQueries: [{ query: GET_ALL_ARTICLES, variables: { tagId: null } }],
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
    },
  );

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    console.log(videoFile instanceof File)
    console.log(videoFile)
    if (articleType === "text" && !body.trim()) {
      setError("Body is required for text articles.");
      return;
    }
    if (articleType === "video" && !videoFile) {
      setError("Video file is required for video articles.");
      return;
    }
    createArticle({
      variables: {
        title: title.trim(),
        body: articleType === "text" ? body.trim() : null,
        status: "public",
        articleType,
        tagIds: selectedTagIds,
        video: articleType === "video" ? videoFile : null,
      },
    });
  };

  const availableTags =
    tagsData?.tags?.filter((tag: Tag) => !selectedTagIds.includes(tag.id)) ||
    [];

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

          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              Article Type
            </Text>
            <HStack gap={2}>
              <Button
                size="sm"
                borderRadius="xl"
                colorScheme={articleType === "text" ? "blue" : "gray"}
                onClick={() => { setArticleType("text"); setVideoFile(null); setError(""); }}
              >
                Text
              </Button>
              <Button
                size="sm"
                borderRadius="xl"
                colorScheme={articleType === "video" ? "blue" : "gray"}
                onClick={() => { setArticleType("video"); setBody(""); setError(""); }}
              >
                Video
              </Button>
            </HStack>
          </Box>

          {articleType === "text" && (
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
          )}

          {articleType === "video" && (
            <Box>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
                Video File
              </Text>
              <Input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                borderRadius="xl"
                p={1}
                onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
              />
              {videoFile && (
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Selected: {videoFile.name}
                </Text>
              )}
            </Box>
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
