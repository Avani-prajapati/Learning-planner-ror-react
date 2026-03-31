import { screen} from "@testing-library/react";
import App from "../App";
import { useAuth } from "../contexts/AuthContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import {
  getAllArticlesLoadingMock,
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
    default: ({ loading }: { loading: boolean }) =>
      loading ? <div data-testid="loading" /> : <div>Loaded</div>,
}));

const mockedUseAuth = useAuth as jest.Mock;
const guestAuth = { isAuthenticated: false, user: null };

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
});