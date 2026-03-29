import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Box, Button, Textarea, Text } from "@chakra-ui/react";
import { GET_ARTICLE } from "../graphql/articles/queries";
import { useArticle } from "../contexts/ArticleContext";
import type { Comment } from "../types";
import { CREATE_COMMENT } from "../graphql/comments/mutations";

interface createCommentResponse {
  createComment: {
    comment: Comment | null;
    errors: string[];
  };
}

function CreateCommentForm() {
  const { selectedArticle } = useArticle();
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const [createComment, { loading }] = useMutation<createCommentResponse>(
    CREATE_COMMENT,
    {
      refetchQueries: [
        { query: GET_ARTICLE, variables: { id: selectedArticle?.id } },
      ],
      onCompleted: (data) => {
        if (data.createComment.errors.length > 0) {
          setError(data.createComment.errors[0]);
        } else {
          setBody("");
          setError("");
        }
      },
      onError: (err) => setError(err.message),
    },
  );

  const handleSubmit = (): void => {
    if (!body.trim()) return;
    createComment({
      variables: { articleId: selectedArticle?.id, body: body.trim() },
    });
  };

  return (
    <Box className="mt-6">
      <Text className="text-sm font-medium text-gray-700 mb-2">
        Add a comment
      </Text>

      <Textarea
        placeholder="Write your comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {error && (
        <Text color="red.500" fontSize="sm" mt={1}>
          {error} {error == "Not authenticated" ? "Please login" : ""}
        </Text>
      )}

      <div className="flex justify-end mt-3">
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!body.trim()}
          colorScheme="blue"
          size="sm"
          borderRadius="xl"
        >
          Add Comment
        </Button>
      </div>
    </Box>
  );
}

export default CreateCommentForm;
