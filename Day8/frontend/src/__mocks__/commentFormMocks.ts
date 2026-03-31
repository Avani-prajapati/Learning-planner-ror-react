import { GET_ARTICLE } from "../graphql/articles/queries";
import { MockLink } from "@apollo/client/testing";
import { CREATE_COMMENT } from "../graphql/comments/mutations";

export const refetchArticleMock = (
  articleId: string,
): MockLink.MockedResponse => ({
  request: {
    query: GET_ARTICLE,
    variables: { id: articleId },
  },
  result: {
    data: {
      article: {
        id: articleId,
        title: "Test Article",
        body: "Test body",
        articleType: "text",
        videoUrl: null,
        comments: [{ id: "c1", body: "Hello", author: { name: "Alice" } }],
      },
    },
  },
});

export const createCommentSuccessMock = (
  articleId: string,
  body: string,
): MockLink.MockedResponse => ({
  request: {
    query: CREATE_COMMENT,
    variables: { articleId, body },
  },
  result: {
    data: {
      createComment: {
        comment: { id: "c1", body, author: { name: "Alice" } },
        errors: [],
      },
    },
  },
});

export const createCommentServerErrorMock = (
  articleId: string,
  body: string,
): MockLink.MockedResponse => ({
  request: {
    query: CREATE_COMMENT,
    variables: { articleId, body },
  },
  result: {
    data: {
      createComment: {
        comment: null,
        errors: ["Not authenticated"],
      },
    },
  },
});

export const createCommentNetworkErrorMock = (
  articleId: string,
  body: string,
): MockLink.MockedResponse => ({
  request: {
    query: CREATE_COMMENT,
    variables: { articleId, body },
  },
  error: new Error("Network error"),
});
