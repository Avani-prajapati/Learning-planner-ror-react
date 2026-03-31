import ArticleDetail from "../components/ArticleDetail";
import { useArticle } from "../contexts/ArticleContext";
import { useAuth } from "../contexts/AuthContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import { mockArticleContextClosed, mockAuthContextGuest } from "../__mocks__/contextMocks";
import { MockVideoPlayer, MockAddCommentForm, MockCommentCard } from "../__mocks__/compoentMocks";

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
});