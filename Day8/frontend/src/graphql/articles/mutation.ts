import { gql } from "@apollo/client";

export const CREATE_ARTICLE = gql`
  mutation CreateArticle(
    $title: String!
    $body: String
    $status: String!
    $articleType: String!
    $tagIds: [ID!]
    $video: Upload
  ) {
    createArticle(
      input: {
        title: $title
        body: $body
        status: $status
        articleType: $articleType
        tagIds: $tagIds
        video: $video
      }
    ) {
      article {
        id
        title
        body
        status
        articleType
        videoUrl
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
