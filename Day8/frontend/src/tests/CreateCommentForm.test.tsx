import { screen } from "@testing-library/react";
import CreateCommentForm from "../components/CreateCommentForm";
import { useArticle } from "../contexts/ArticleContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";

jest.mock("../contexts/ArticleContext", () => ({ useArticle: jest.fn() }));

const mockedUseArticle = useArticle as jest.Mock;

const mockSelectedArticle = { id: "1" };

describe("CreateCommentForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseArticle.mockReturnValue({
      selectedArticle: mockSelectedArticle,
    });
  });

  test("renders textarea and disabled Add Comment button", () => {
    renderWithProviders(<CreateCommentForm />);

    expect(
      screen.getByPlaceholderText("Write your comment...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add comment/i })
    ).toBeDisabled();
  });
});