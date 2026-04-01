import { fireEvent, screen } from "@testing-library/react";
import App from "../App";
import { useAuth } from "../contexts/AuthContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import {
  getAllArticlesErrorMock,
  getAllArticlesLoadingMock,
  getAllArticlesSuccessMock,
  getTagsMock,
} from "../__mocks__/appMocks";

jest.mock("../contexts/AuthContext", () => ({ useAuth: jest.fn() }));

jest.mock("../components/ArticleDetail", () => ({
  __esModule: true,
  default: () => <div data-testid="article-detail" />,
}));

jest.mock("../components/CreateArticleForm", () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="create-article-form" /> : null,
}));

jest.mock("../components/AuthModal", () => ({
  __esModule: true,
  default: ({ isOpen, defaultTab }: any) =>
    isOpen ? <div data-testid="auth-modal" data-tab={defaultTab} /> : null,
}));

jest.mock("../components/ArticleList", () => ({
  __esModule: true,
  default: ({ loading, error, articles }: any) => {
    if (loading) return <div data-testid="loading" />;
    if (error) return <div data-testid="error">Error occurred</div>;
    return (
      <div>
        {articles?.map((a: any) => (
          <p key={a.id}>{a.title}</p>
        ))}
      </div>
    );
  },
}));

jest.mock("../components/ArticleFilters", () => ({
  __esModule: true,
  default: () => <div data-testid="article-filters" />,
}));

const mockedUseAuth = useAuth as jest.Mock;

const guestAuth = { isAuthenticated: false, user: null };
const authenticatedAuth = {
  isAuthenticated: true,
  user: { id: "1", name: "Avani" },
};

const renderApp = (mocks: any[] = []) => {
  return renderWithProviders(<App />, mocks);
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedUseAuth.mockReturnValue(guestAuth);
});

describe("App Integration", () => {
  test("shows auth buttons for guests", () => {
    renderApp([getAllArticlesLoadingMock, getTagsMock]);

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  test("shows loading state", () => {
    renderApp([getAllArticlesLoadingMock, getTagsMock]);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("shows error state", async () => {
    renderApp([getAllArticlesErrorMock, getTagsMock]);

    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });

  test("renders articles on success", async () => {
    renderApp([getAllArticlesSuccessMock, getTagsMock]);

    expect(await screen.findByText("First Article")).toBeInTheDocument();
    expect(screen.getByText("Second Article")).toBeInTheDocument();
  });

  test("hides Add Article for guests", async () => {
    renderApp([getAllArticlesSuccessMock, getTagsMock]);

    await screen.findByText("First Article");

    expect(
      screen.queryByRole("button", { name: /add article/i }),
    ).not.toBeInTheDocument();
  });

  test("shows Add Article for authenticated users", async () => {
    mockedUseAuth.mockReturnValue(authenticatedAuth);

    renderApp([getAllArticlesSuccessMock, getTagsMock]);

    expect(
      await screen.findByRole("button", { name: /add article/i }),
    ).toBeInTheDocument();
  });

  test("create form toggles on button click", async () => {
    mockedUseAuth.mockReturnValue(authenticatedAuth);

    renderApp([getAllArticlesSuccessMock, getTagsMock]);

    const button = await screen.findByRole("button", {
      name: /add article/i,
    });

    expect(screen.queryByTestId("create-article-form")).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByTestId("create-article-form")).toBeInTheDocument();
  });

  test("auth modal toggles with correct tab", () => {
    renderApp([getAllArticlesLoadingMock, getTagsMock]);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByTestId("auth-modal")).toHaveAttribute("data-tab", "signin");

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));
    expect(screen.getByTestId("auth-modal")).toHaveAttribute("data-tab", "signup");
  });

  test("renders filters after load", async () => {
    renderApp([getAllArticlesSuccessMock, getTagsMock]);

    expect(await screen.findByTestId("article-filters")).toBeInTheDocument();
  });
});
