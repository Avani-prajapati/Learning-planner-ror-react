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
  mutation SignUp(
    $name: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      input: {
        name: $name
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
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
