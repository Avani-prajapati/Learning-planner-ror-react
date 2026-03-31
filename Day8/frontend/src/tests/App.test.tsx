import { fireEvent, screen, waitFor } from "@testing-library/react";
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
  default: ({ isOpen, defaultTab }: { isOpen: boolean; defaultTab: string }) =>
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

const mockedUseAuth = useAuth as jest.Mock;
const guestAuth = { isAuthenticated: false, user: null };
const authenticatedAuth = { isAuthenticated: true, user: { id: "1", name: "Avani" } };

describe("App Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuth.mockReturnValue(guestAuth);
  });

  test("displays Login and Sign up buttons for unauthenticated users", () => {
    renderWithProviders(<App />, [getAllArticlesLoadingMock, getTagsMock]);

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  test("shows loading state while fetching articles", () => {
    renderWithProviders(<App />, [getAllArticlesLoadingMock, getTagsMock]);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("displays error when article fetch fails", async () => {
    renderWithProviders(<App />, [getAllArticlesErrorMock, getTagsMock]);

    expect(await screen.findByTestId("error")).toBeInTheDocument();
  });

  test("renders article list after successful fetch", async () => {
    renderWithProviders(<App />, [getAllArticlesSuccessMock, getTagsMock]);

    await waitFor(() => {
      expect(screen.getByText("First Article")).toBeInTheDocument();
      expect(screen.getByText("Second Article")).toBeInTheDocument();
    });
  });

  test("hides Add Article button for unauthenticated users", async () => {
    mockedUseAuth.mockReturnValue(guestAuth);
    renderWithProviders(<App />, [getAllArticlesSuccessMock, getTagsMock]);

    await waitFor(() => {
      expect(screen.getByText("First Article")).toBeInTheDocument();
    });

    expect(
      screen.queryByRole("button", { name: /add article/i })
    ).not.toBeInTheDocument();
  });

  test("shows Add Article button for authenticated users", async () => {
    mockedUseAuth.mockReturnValue(authenticatedAuth);
    renderWithProviders(<App />, [getAllArticlesSuccessMock, getTagsMock]);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /add article/i })
      ).toBeInTheDocument();
    });
  });

  test("create form is hidden initially", async () => {
    mockedUseAuth.mockReturnValue(authenticatedAuth);
    renderWithProviders(<App />, [getAllArticlesSuccessMock, getTagsMock]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /add article/i })).toBeInTheDocument();
    });

    expect(screen.queryByTestId("create-article-form")).not.toBeInTheDocument();
  });

  test("opens create form when Add Article button is clicked", async () => {
    mockedUseAuth.mockReturnValue(authenticatedAuth);
    renderWithProviders(<App />, [getAllArticlesSuccessMock, getTagsMock]);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /add article/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /add article/i }));

    expect(screen.getByTestId("create-article-form")).toBeInTheDocument();
  });

  test("auth modal is hidden initially", () => {
    renderWithProviders(<App />, [getAllArticlesLoadingMock, getTagsMock]);

    expect(screen.queryByTestId("auth-modal")).not.toBeInTheDocument();
  });

  test("opens auth modal with signin tab when Login button is clicked", () => {
    renderWithProviders(<App />, [getAllArticlesLoadingMock, getTagsMock]);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    const modal = screen.getByTestId("auth-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("data-tab", "signin");
  });

  test("opens auth modal with signup tab when Sign up button is clicked", () => {
    renderWithProviders(<App />, [getAllArticlesLoadingMock, getTagsMock]);

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    const modal = screen.getByTestId("auth-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("data-tab", "signup");
  });
});
