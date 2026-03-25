import { gql } from '@apollo/client';

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles($tagId: ID) {
    articles(tagId: $tagId) {
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
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
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
        body
        status
        createdAt
        user {
          id
          name
        }
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;
