import ArticleDetail from "../components/ArticleDetail";
import { useArticle } from "../contexts/ArticleContext";
import { useAuth } from "../contexts/AuthContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import { mockArticleContextClosed, mockArticleContextOpen, mockAuthContextAuthenticated, mockAuthContextGuest } from "../__mocks__/contextMocks";
import { MockVideoPlayer, MockAddCommentForm, MockCommentCard } from "../__mocks__/compoentMocks";
import { getArticleErrorMock, getArticleLoadingMock, getArticleSuccessMock, getArticleWithCommentsMock } from "../__mocks__/apolloMocks";
import { fireEvent, screen, waitFor } from "@testing-library/react";

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

  test("renders article body text for text type articles", async () => {
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleSuccessMock("1")]);

    await waitFor(() => {
      expect(screen.getByText("This is the article body.")).toBeInTheDocument();
      expect(screen.queryByTestId("video-player")).not.toBeInTheDocument();
    });
  });

  test("renders VideoPlayer with correct src for video type articles", async () => {
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("2"));

    renderWithProviders(<ArticleDetail />, [getArticleSuccessMock("2")]);

    await waitFor(() => {
      const player = screen.getByTestId("video-player");
      expect(player).toBeInTheDocument();
      expect(player).toHaveAttribute("data-src", "https://cdn.example.com/video.mp4");
    });
  });

  test("shows no comments message when article has no comments", async () => {
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleSuccessMock("1")]);

    await waitFor(() => {
      expect(screen.getByText("No comments yet.")).toBeInTheDocument();
    });
  });

  test("renders a CommentCard for each comment in the article", async () => {
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleWithCommentsMock("1")]);

    await waitFor(() => {
      expect(screen.getAllByTestId("comment-card")).toHaveLength(2);
      expect(screen.getByText("First comment")).toBeInTheDocument();
      expect(screen.getByText("Second comment")).toBeInTheDocument();
    });
  });

  test("does not render AddCommentForm when user is not authenticated", async () => {
    mockedUseAuth.mockReturnValue(mockAuthContextGuest);
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleSuccessMock("1")]);

    await waitFor(() => {
      expect(screen.queryByTestId("add-comment-form")).not.toBeInTheDocument();
    });
  });

  test("renders AddCommentForm when user is authenticated", async () => {
    mockedUseAuth.mockReturnValue(mockAuthContextAuthenticated);
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1"));

    renderWithProviders(<ArticleDetail />, [getArticleSuccessMock("1")]);

    await waitFor(() => {
      expect(screen.getByTestId("add-comment-form")).toBeInTheDocument();
    });
  });

  test("calls closeDetail when the Close button is clicked", async () => {
    const closeDetail = jest.fn();
    mockedUseArticle.mockReturnValue(mockArticleContextOpen("1", closeDetail));

    renderWithProviders(<ArticleDetail />, [getArticleSuccessMock("1")]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(closeDetail).toHaveBeenCalledTimes(1);
  });
});

