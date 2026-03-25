import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { CREATE_POST, GET_ALL_POSTS } from "../graphql/queries";
import type { Post } from "../types";

interface Props {
  onClose: () => void;
}

interface createPostResponse {
  createPost: {
    post: Post | null;
    errors: string[];
  };
}

function CreatePostForm({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const [createPost, { loading }] = useMutation<createPostResponse>(
    CREATE_POST,
    {
      refetchQueries: [{ query: GET_ALL_POSTS }],
      onCompleted: (data) => {
        if (data.createPost.errors.length > 0) {
          setError(data.createPost.errors[0]);
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
    if (!title.trim() || !body.trim()) {
      setError("Title and body are required.");
      return;
    }
    createPost({ variables: { title: title.trim(), body: body.trim() } });
  };

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
          Create New Post
        </Heading>

        <VStack gap={4} align="stretch">
          <Box>
            <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={1}>
              Title
            </Text>
            <Input
              placeholder="Enter post title..."
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
              placeholder="Write your post content..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              borderRadius="xl"
              resize="none"
            />
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
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
              Create Post
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default CreatePostForm;
