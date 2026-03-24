import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      id
      title
      body
      comments {
        id
      }
    }
  }
`;

export const GET_POST = gql`
    query GetPost($id: ID!) {
        post(id: $id) {
            id
            title
            body
            comments {
                id
                body
            }
        }
    }
`