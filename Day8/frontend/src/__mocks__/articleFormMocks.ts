import type { MockLink } from "@apollo/client/testing";
import { GET_TAGS } from "../graphql/tags/queries";
import { mockTags } from "./tagMocks";
import { CREATE_ARTICLE } from "../graphql/articles/mutation";

export const tagsQueryMock: MockLink.MockedResponse = {
    request: { query: GET_TAGS },
    result: { data: { tags: mockTags } },
};

export const createArticleSuccessMock = (variables = {}): MockLink.MockedResponse => ({
    request: {
      query: CREATE_ARTICLE,
      variables,
    },
    result: {
      data: {
        createArticle: {
          article: {
            id: "1",
            title: "Test Article",
            body: "Test body",
            status: "public",
            articleType: "text",
            video: null,
            comments: [],
            tags: [],
          },
          errors: [],
        },
      },
    },
  });

export const createArticleErrorMock = (variables = {}): MockLink.MockedResponse => ({
    request: {
      query: CREATE_ARTICLE,
      variables,
    },
    result: {
      data: {
        createArticle: {
          article: null,
          errors: ["Title can't be blank"],
        },
      },
    },
});

export const createArticleNetworkErrorMock = (variables = {}): MockLink.MockedResponse => ({
    request: {
      query: CREATE_ARTICLE,
      variables,
    },
    error: new Error("Network error"),
});  