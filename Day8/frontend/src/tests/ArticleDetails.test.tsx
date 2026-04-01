import ArticleDetail from "../components/ArticleDetail";
import { useArticle } from "../contexts/ArticleContext";
import { useAuth } from "../contexts/AuthContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import {
  mockArticleContextClosed,
  mockArticleContextOpen,
  mockAuthContextAuthenticated,
  mockAuthContextGuest,
} from "../__mocks__/contextMocks";
import {
  MockVideoPlayer,
  MockAddCommentForm,
  MockCommentCard,
} from "../__mocks__/componentMocks";
import {
  getArticleErrorMock,
  getArticleLoadingMock,
  getArticleSuccessMock,
  getArticleWithCommentsMock,
} from "../__mocks__/apolloMocks";
import { fireEvent, screen } from "@testing-library/react";

jest.mock("../contexts/ArticleContext", () => ({ useArticle: jest.fn() }));
jest.mock("../contexts/AuthContext", () => ({ useAuth: jest.fn() }));

jest.mock(
  "../components/VideoPlayer",
  () =>
    ({ src }: { src: string }) =>
      MockVideoPlayer({ src }),
);

jest.mock("../components/CreateCommentForm", () => () =>
  MockAddCommentForm(),
);

jest.mock(
  "../components/CommentCard",
  () =>
    ({ comment }: { comment: { body: string } }) =>
      MockCommentCard({ comment }),
);

const mockedUseArticle = useArticle as jest.Mock;
const mockedUseAuth = useAuth as jest.Mock;

const openArticle = (id = "1", closeFn = jest.fn()) => {
  mockedUseArticle.mockReturnValue(mockArticleContextOpen(id, closeFn));
  return closeFn;
};

const renderArticle = (apolloMock: any) => {
  return renderWithProviders(<ArticleDetail />, [apolloMock]);
};

const ARTICLE_ID_TEXT = "1";
const ARTICLE_ID_VIDEO = "2";

beforeEach(() => {
  mockedUseAuth.mockReturnValue(mockAuthContextGuest);
  mockedUseArticle.mockReset();
});

describe("ArticleDetail", () => {
  test("renders nothing when panel is closed", () => {
    mockedUseArticle.mockReturnValue(mockArticleContextClosed);

    const { container } = renderWithProviders(<ArticleDetail />);

    expect(container).toBeEmptyDOMElement();
  });

  test("shows loading state", () => {
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleLoadingMock(ARTICLE_ID_TEXT));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error state", async () => {
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleErrorMock(ARTICLE_ID_TEXT));

    expect(
      await screen.findByText("Error: Failed to fetch article"),
    ).toBeInTheDocument();
  });

  test("renders article title and badge", async () => {
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_TEXT));

    expect(await screen.findByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Article #1")).toBeInTheDocument();
  });

  test("renders text article content", async () => {
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_TEXT));

    expect(
      await screen.findByText("This is the article body."),
    ).toBeInTheDocument();

    expect(screen.queryByTestId("video-player")).not.toBeInTheDocument();
  });

  test("renders video player for video articles", async () => {
    openArticle(ARTICLE_ID_VIDEO);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_VIDEO));

    const player = await screen.findByTestId("video-player");

    expect(player).toHaveAttribute(
      "data-src",
      "https://cdn.example.com/video.mp4",
    );
  });

  test("shows empty comments state", async () => {
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_TEXT));

    expect(await screen.findByText("No comments yet.")).toBeInTheDocument();
  });

  test("renders comments list", async () => {
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleWithCommentsMock(ARTICLE_ID_TEXT));

    const comments = await screen.findAllByTestId("comment-card");

    expect(comments).toHaveLength(2);
    expect(screen.getByText("First comment")).toBeInTheDocument();
    expect(screen.getByText("Second comment")).toBeInTheDocument();
  });

  test("hides comment form for guests", async () => {
    mockedUseAuth.mockReturnValue(mockAuthContextGuest);
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_TEXT));

    expect(
      await screen.findByText("No comments yet."),
    ).toBeInTheDocument();

    expect(screen.queryByTestId("add-comment-form")).not.toBeInTheDocument();
  });

  test("shows comment form for authenticated users", async () => {
    mockedUseAuth.mockReturnValue(mockAuthContextAuthenticated);
    openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_TEXT));

    expect(await screen.findByTestId("add-comment-form")).toBeInTheDocument();
  });

  test("calls closeDetail on Close button click", async () => {
    const closeFn = openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_TEXT));

    fireEvent.click(await screen.findByRole("button", { name: "Close" }));

    expect(closeFn).toHaveBeenCalledTimes(1);
  });

  test("calls closeDetail on backdrop click", async () => {
    const closeFn = openArticle(ARTICLE_ID_TEXT);

    renderArticle(getArticleSuccessMock(ARTICLE_ID_TEXT));

    fireEvent.click(await screen.findByTestId("backdrop"));

    expect(closeFn).toHaveBeenCalledTimes(1);
  });
});
