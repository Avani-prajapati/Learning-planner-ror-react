import type { MockLink } from "@apollo/client/testing";
import { GET_ALL_ARTICLES } from "../graphql/articles/queries";
import { GET_TAGS } from "../graphql/tags/queries";
import { mockTags } from "./tagMocks";

export const mockArticles = [
  {
    id: "1",
    title: "First Article",
    body: "Body one",
    articleType: "text",
    videoUrl: null,
    status: "public",
    createdAt: "2024-01-01",
    comments: [],
    tags: [],
    user: { id: "u1", name: "Alice" },
    __typename: "Article",
  },
  {
    id: "2",
    title: "Second Article",
    body: null,
    articleType: "video",
    videoUrl: "https://cdn.example.com/video.mp4",
    status: "public",
    createdAt: "2024-01-02",
    comments: [],
    tags: [],
    user: { id: "u2", name: "Bob" },
    __typename: "Article",
  },
];

export const getAllArticlesEmptyMock: MockLink.MockedResponse = {
  request: { query: GET_ALL_ARTICLES },
  result: { data: { articles: [] } },
};

export const getAllArticlesLoadingMock: MockLink.MockedResponse = {
  request: { query: GET_ALL_ARTICLES },
  result: { data: { articles: mockArticles } },
  delay: 1000,
};

export const getTagsMock: MockLink.MockedResponse = {
  request: { query: GET_TAGS },
  result: { data: { tags: mockTags } },
};

export const getAllArticlesSuccessMock: MockLink.MockedResponse = {
  request: { query: GET_ALL_ARTICLES },
  result: { data: { articles: mockArticles } },
};

export const getAllArticlesErrorMock: MockLink.MockedResponse = {
  request: { query: GET_ALL_ARTICLES },
  error: new Error("Failed to fetch articles"),
};
