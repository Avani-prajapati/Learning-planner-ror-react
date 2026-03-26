import { gql } from "@apollo/client";

export const CREATE_ARTICLE = gql`
  mutation CreateArticle(
    $title: String!
    $body: String!
    $status: String!
    $tagIds: [ID!]
  ) {
    createArticle(
      input: { title: $title, body: $body, status: $status, tagIds: $tagIds }
    ) {
      article {
        id
        title
        body
        status
        createdAt
        user {
          id
          name
        }
        comments {
          id
        }
        tags {
          id
          name
        }
      }
      errors
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(input: { id: $id }) {
      success
      errors
    }
  }
`;
