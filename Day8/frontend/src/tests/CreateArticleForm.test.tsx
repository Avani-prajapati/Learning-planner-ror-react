import { fireEvent, screen, waitFor } from "@testing-library/react";
import CreateArticleForm from "../components/CreateArticleForm";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import {
  createArticleNetworkErrorMock,
  createArticleSuccessMock,
  tagsQueryMock,
} from "../__mocks__/articleFormMocks";

jest.mock("../components/ui/Modal", () => ({
  __esModule: true,
  Modal: ({ isOpen, children, title }: any) =>
    isOpen ? (
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    ) : null,
}));

const DEFAULT_TITLE = "Test Article";
const DEFAULT_BODY = "Test body";

const defaultVariables = {
  title: DEFAULT_TITLE,
  body: DEFAULT_BODY,
  status: "public",
  articleType: "text",
  tagIds: [],
  video: null,
};

const renderForm = (mocks: any[] = [], ArticleFormprops = {}) => {
  return renderWithProviders(
    <CreateArticleForm
      isOpen={true}
      onClose={jest.fn()}
      {...ArticleFormprops}
    />,
    [tagsQueryMock, ...mocks],
  );
};

const fillForm = async () => {
  fireEvent.change(
    await screen.findByPlaceholderText("Enter Article title..."),
    { target: { value: DEFAULT_TITLE } },
  );

  fireEvent.change(
    screen.getByPlaceholderText("Write your Article content..."),
    { target: { value: DEFAULT_BODY } },
  );
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CreateArticleForm", () => {
  test("renders form when modal is open", async () => {
    renderForm();

    expect(await screen.findByText("Create New Article")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Article title..."),
    ).toBeInTheDocument();
  });

  test("renders nothing when modal is closed", () => {
    renderWithProviders(
      <CreateArticleForm isOpen={false} onClose={jest.fn()} />,
      [tagsQueryMock],
    );

    expect(screen.queryByText("Create New Article")).not.toBeInTheDocument();
  });

  test("loads and displays tags", async () => {
    renderForm();

    const addTagBtn = await screen.findByRole("button", {
      name: /add tag/i,
    });

    fireEvent.click(addTagBtn);

    expect(await screen.findByText("React")).toBeInTheDocument();
    expect(screen.getByText("GraphQL")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  test("shows text input by default", async () => {
    renderForm();

    expect(
      await screen.findByPlaceholderText("Write your Article content..."),
    ).toBeInTheDocument();

    expect(screen.queryByLabelText(/video file/i)).not.toBeInTheDocument();
  });

  test("switches to video input when selected", async () => {
    renderForm();

    fireEvent.click(await screen.findByRole("button", { name: /video/i }));

    expect(await screen.findByText("Video File")).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("Write your Article content..."),
    ).not.toBeInTheDocument();
  });

  test("submits successfully and closes modal", async () => {
    const onClose = jest.fn();

    renderForm([createArticleSuccessMock(defaultVariables)], { onClose });

    await fillForm();

    fireEvent.click(screen.getByRole("button", { name: /create article/i }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test("shows network error", async () => {
    renderForm([createArticleNetworkErrorMock(defaultVariables)]);

    await fillForm();

    fireEvent.click(screen.getByRole("button", { name: /create article/i }));

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });

  test("calls onClose when cancel is clicked", async () => {
    const onClose = jest.fn();

    renderForm([], { onClose });

    fireEvent.click(await screen.findByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
