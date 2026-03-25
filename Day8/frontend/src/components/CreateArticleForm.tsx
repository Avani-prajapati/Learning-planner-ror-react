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
import { GET_ALL_ARTICLES } from "../graphql/queries";
import { CREATE_ARTICLE } from "../graphql/mutations";
import type { Article } from "../types";

interface Props {
  onClose: () => void;
}

interface createArticleResponse {
  createArticle: {
    Article: Article | null;
    errors: string[];
  };
}

function CreateArticleForm({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const [createArticle, { loading }] = useMutation<createArticleResponse>(
    CREATE_ARTICLE,
    {
      refetchQueries: [{ query: GET_ALL_ARTICLES }],
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
    if (!title.trim() || !body.trim()) {
      setError("Title and body are required.");
      return;
    }
    createArticle({ variables: { title: title.trim(), body: body.trim(), status: "public" } });
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

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}  {error == "Not authenticated"?"-Please login":""}
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
