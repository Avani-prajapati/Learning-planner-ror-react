import { fireEvent, screen } from "@testing-library/react";
import CreateCommentForm from "../components/CreateCommentForm";
import { useArticle } from "../contexts/ArticleContext";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import {
  createCommentNetworkErrorMock,
  createCommentServerErrorMock,
  createCommentSuccessMock,
  refetchArticleMock,
} from "../__mocks__/commentFormMocks";

jest.mock("../contexts/ArticleContext", () => ({ useArticle: jest.fn() }));

const mockedUseArticle = useArticle as jest.Mock;

const ARTICLE_ID = "1";
const COMMENT_TEXT = "Hello world";

const renderForm = (mocks: any[] = []) => {
  return renderWithProviders(<CreateCommentForm />, mocks);
};

const typeComment = () => {
  const textarea = screen.getByPlaceholderText("Write your comment...");
  fireEvent.change(textarea, { target: { value: COMMENT_TEXT } });
  return textarea;
};

const submitComment = () => {
  fireEvent.click(screen.getByRole("button", { name: /add comment/i }));
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedUseArticle.mockReturnValue({
    selectedArticle: { id: ARTICLE_ID },
  });
});

describe("CreateCommentForm", () => {
  test("renders initial state", () => {
    renderForm();

    expect(
      screen.getByPlaceholderText("Write your comment..."),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /add comment/i })).toBeDisabled();
  });

  test("enables submit button when input is filled", () => {
    renderForm();

    typeComment();

    expect(
      screen.getByRole("button", { name: /add comment/i }),
    ).not.toBeDisabled();
  });

  test("clears textarea on successful submit", async () => {
    renderForm([
      createCommentSuccessMock(ARTICLE_ID, COMMENT_TEXT),
      refetchArticleMock(ARTICLE_ID),
    ]);

    const textarea = typeComment();
    submitComment();

    expect(await screen.findByDisplayValue("")).toBeInTheDocument();
    expect(textarea).toHaveValue("");
  });

  test("shows server error message", async () => {
    renderForm([createCommentServerErrorMock(ARTICLE_ID, COMMENT_TEXT)]);

    typeComment();
    submitComment();

    expect(await screen.findByText(/not authenticated/i)).toBeInTheDocument();
    expect(screen.getByText(/please login/i)).toBeInTheDocument();
  });

  test("shows network error message", async () => {
    renderForm([createCommentNetworkErrorMock(ARTICLE_ID, COMMENT_TEXT)]);

    typeComment();
    submitComment();

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });
});
