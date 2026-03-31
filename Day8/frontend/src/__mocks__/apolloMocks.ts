import type { MockLink } from "@apollo/client/testing";
import { GET_ARTICLE } from "../graphql/articles/queries";
import { mockTextArticle } from "./articleMocks";

export const getArticleLoadingMock = (id: string): MockLink.MockedResponse => ({
    request: { query: GET_ARTICLE, variables: { id } },
    result: { data: { article: mockTextArticle } },
    delay: 500,
});

export const getArticleErrorMock = (id: string): MockLink.MockedResponse => ({
    request: { query: GET_ARTICLE, variables: { id } },
    error: new Error("Failed to fetch article"),
});  