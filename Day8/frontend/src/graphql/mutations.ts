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


export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(input: { name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation }) {
      token
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $body: String!, $status: String!, $tagIds: [ID!]) {
    createArticle(input: { title: $title, body: $body, status: $status, tagIds: $tagIds }) {
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
  deleteArticle(input: {id: $id}) {
    success
    errors
  }
}
`