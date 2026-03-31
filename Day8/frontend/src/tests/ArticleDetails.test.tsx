import ArticleDetail from "../components/ArticleDetail";
import { useArticle } from "../contexts/ArticleContext";
import { useAuth } from "../contexts/AuthContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import { mockArticleContextClosed, mockArticleContextOpen, mockAuthContextGuest } from "../__mocks__/contextMocks";
import { MockVideoPlayer, MockAddCommentForm, MockCommentCard } from "../__mocks__/compoentMocks";
import { getArticleErrorMock, getArticleLoadingMock, getArticleSuccessMock } from "../__mocks__/apolloMocks";
import { screen, waitFor } from "@testing-library/react";

jest.mock("../contexts/ArticleContext", () => ({ useArticle: jest.fn() }));
jest.mock("../contexts/AuthContext", () => ({ useAuth: jest.fn() }));
jest.mock("../components/VideoPlayer", () => ({ src }: { src: string }) => MockVideoPlayer({ src }));
jest.mock("../components/CreateCommentForm", () => () => MockAddCommentForm());
jest.mock("../components/CommentCard", () => ({ comment }: { comment: { body: string } }) => MockCommentCard({ comment }));

const mockedUseArticle = useArticle as jest.Mock;
const mockedUseAuth = useAuth as jest.Mock;

describe("ArticleDetail", () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue(mockAuthContextGuest);
    mockedUseArticle.mockReset();
  });

  test("renders nothing when detail panel is closed", () => {
    mockedUseArticle.mockReturnValue(mockArticleContextClosed);

    const { container } = renderWithProviders(<ArticleDetail />);

    expect(container).toBeEmptyDOMElement();
  });

  test("shows loading spinner while article is being fetched", () => {
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleLoadingMock("1")]);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error message when article query fails", async () => {
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleErrorMock("1")]);

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch article")).toBeInTheDocument();
    });
  });

  test("renders article title and id badge after successful fetch", async () => {
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleSuccessMock("1")]);

    await waitFor(() => {
      expect(screen.getByText("Test Article")).toBeInTheDocument();
      expect(screen.getByText("Article #1")).toBeInTheDocument();
    });
  });
});

