import type { MockLink } from "@apollo/client/testing";
import { GET_TAGS } from "../graphql/tags/queries";
import { mockTags } from "./tagMocks";

export const tagsQueryMock: MockLink.MockedResponse = {
    request: { query: GET_TAGS },
    result: { data: { tags: mockTags } },
  };