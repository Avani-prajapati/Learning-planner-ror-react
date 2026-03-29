import { Box, Text, CloseButton } from "@chakra-ui/react";
import { type Comment } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { DELETE_COMMENT } from "../graphql/comments/mutations";
import { useMutation } from "@apollo/client/react";
import { GET_ARTICLE } from "../graphql/articles/queries";
import { useArticle } from "../contexts/ArticleContext";

export default function CommentCard({ comment }: { comment: Comment }) {
  const { user, isAuthenticated } = useAuth();
  const { selectedArticle } = useArticle();
  const isOwner = isAuthenticated && user?.id === comment?.user?.id;
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      { query: GET_ARTICLE, variables: { id: selectedArticle?.id } },
    ],
  });

  const handleDelete = (e: React.MouseEvent): void => {
    e.stopPropagation();
    deleteComment({ variables: { id: comment.id } });
  };
  return (
    <Box
      key={comment.id}
      bg="gray.50"
      p={3}
      borderRadius="md"
      className="flex items-center justify-between"
    >
      <Text color="gray.600">{comment.body}</Text>
      {isOwner && <CloseButton onClick={handleDelete} />}
    </Box>
  );
}
