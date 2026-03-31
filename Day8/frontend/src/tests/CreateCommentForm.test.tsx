import { fireEvent, screen, waitFor } from "@testing-library/react";
import CreateCommentForm from "../components/CreateCommentForm";
import { useArticle } from "../contexts/ArticleContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import { createCommentSuccessMock, refetchArticleMock } from "../__mocks__/commentFormMocks";

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

  test("enables Add Comment button when textarea is not empty", () => {
    renderWithProviders(<CreateCommentForm />);

    const textarea = screen.getByPlaceholderText("Write your comment...");
    fireEvent.change(textarea, { target: { value: "Hello world" } });

    expect(
      screen.getByRole("button", { name: /add comment/i })
    ).not.toBeDisabled();
  });

  test("clears textarea after successful comment submission", async () => {
    renderWithProviders(<CreateCommentForm />, [
      createCommentSuccessMock("1", "Hello world"),
      refetchArticleMock("1"),
    ]);

    const textarea = screen.getByPlaceholderText("Write your comment...");
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    fireEvent.click(screen.getByRole("button", { name: /add comment/i }));

    await waitFor(() => {
      expect(textarea).toHaveValue("");
    });
  });
});