import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment($articleId: ID!, $body: String!) {
    createComment(input: { articleId: $articleId, body: $body }) {
      comment {
        id
        body
      }
      errors
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(input: { id: $id }) {
      success
      errors
    }
  }
`;
