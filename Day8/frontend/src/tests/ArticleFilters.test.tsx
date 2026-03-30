import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
import ArticleFilters from "../components/ArticleFilters";
import { useAuth } from "../contexts/AuthContext";

jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("ArticleFilters", () => {
  const mockedUseAuth = useAuth as jest.Mock;

  const defaultProps = {
    tags: [
      { id: "1", name: "Tech" },
      { id: "2", name: "News" },
    ],
    selectedTagId: null,
    selectedArticleType: null,
    isMyView: false,
    onTagChange: jest.fn(),
    onTypeChange: jest.fn(),
    onToggleMyArticles: jest.fn(),
  };

  const renderFilters = (props = {}) =>
    render(
      <ChakraProvider value={defaultSystem}>
        <ArticleFilters {...defaultProps} {...props} />
      </ChakraProvider>,
    );

  beforeEach(() => {
    mockedUseAuth.mockReset();
    jest.clearAllMocks();
  });

  test("renders All button and tag buttons", () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: false });

    renderFilters();

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tech" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "News" })).toBeInTheDocument();
  });

  test("calls onTagChange with null when All is clicked", () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: false });
    const onTagChange = jest.fn();

    renderFilters({ onTagChange });
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(onTagChange).toHaveBeenCalledWith(null);
  });

  test("calls onTagChange with selected tag id when tag is clicked", () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: false });
    const onTagChange = jest.fn();

    renderFilters({ onTagChange });
    fireEvent.click(screen.getByRole("button", { name: "Tech" }));

    expect(onTagChange).toHaveBeenCalledWith("1");
  });
});