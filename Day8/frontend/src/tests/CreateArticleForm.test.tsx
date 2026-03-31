import React from "react";
import { fireEvent, screen, waitFor} from "@testing-library/react";
import CreateArticleForm from "../components/CreateArticleForm";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import { createArticleErrorMock, createArticleNetworkErrorMock, createArticleSuccessMock, tagsQueryMock } from "../__mocks__/articleFormMocks";

jest.mock("../components/ui/Modal", () => ({
  __esModule: true,
  Modal: ({ isOpen, children, title }: {
    isOpen: boolean;
    children: React.ReactNode;
    title: string;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    ) : null,
}));

describe("CreateArticleForm", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form with title when modal is open", async () => {
    renderWithProviders(<CreateArticleForm {...defaultProps} />, [tagsQueryMock]);

    await waitFor(() => {
      expect(screen.getByText("Create New Article")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter Article title...")).toBeInTheDocument();
    });
  });

  test("renders nothing when modal is closed", () => {
    renderWithProviders(
      <CreateArticleForm isOpen={false} onClose={jest.fn()} />,
      [tagsQueryMock]
    );

    expect(screen.queryByText("Create New Article")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Enter Article title...")).not.toBeInTheDocument();
  });

  test("loads and displays available tags in the dropdown", async () => {
    renderWithProviders(<CreateArticleForm {...defaultProps} />, [tagsQueryMock]);

    const addTagButton = await screen.findByRole("button", { name: /add tag/i });
    expect(addTagButton).toBeInTheDocument();

    fireEvent.click(addTagButton);

    await waitFor(() => {
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("GraphQL")).toBeInTheDocument();
      expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });
  });

  test("shows body textarea by default for text article type", async () => {
    renderWithProviders(<CreateArticleForm {...defaultProps} />, [tagsQueryMock]);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Write your Article content...")
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(/video file/i)).not.toBeInTheDocument();
    });
  });

  test("shows video file input when video article type is selected", async () => {
    renderWithProviders(<CreateArticleForm {...defaultProps} />, [tagsQueryMock]);

    const videoButton = await screen.findByRole("button", { name: /video/i });
    fireEvent.click(videoButton);

    await waitFor(() => {
      expect(screen.getByText("Video File")).toBeInTheDocument();
      expect(
        screen.queryByPlaceholderText("Write your Article content...")
      ).not.toBeInTheDocument();
    });
  });

  test("calls mutation and closes modal on successful article creation", async () => {
    const onClose = jest.fn();
    const variables = {
        title: "Test Article",
        body: "Test body",
        status: "public",
        articleType: "text",
        tagIds: [],
        video: null,
    };

    renderWithProviders(
      <CreateArticleForm isOpen={true} onClose={onClose} />,
      [tagsQueryMock, createArticleSuccessMock(variables)]
    );

    fireEvent.change(
      await screen.findByPlaceholderText("Enter Article title..."),
      { target: { value: "Test Article" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Write your Article content..."),
      { target: { value: "Test body" } }
    );

    fireEvent.click(screen.getByRole("button", { name: /create article/i }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test("displays server error message when mutation returns errors", async () => {
    const variables = {
      title: "Test Article",
      body: "Test body",
      status: "public",
      articleType: "text",
      tagIds: [],
      video: null,
    };

    renderWithProviders(
      <CreateArticleForm {...defaultProps} />,
      [tagsQueryMock, createArticleErrorMock(variables)]
    );

    fireEvent.change(
      await screen.findByPlaceholderText("Enter Article title..."),
      { target: { value: "Test Article" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Write your Article content..."),
      { target: { value: "Test body" } }
    );

    fireEvent.click(screen.getByRole("button", { name: /create article/i }));

    await waitFor(() => {
      expect(screen.getByText("Title can't be blank")).toBeInTheDocument();
    });
  });

  test("displays network error message when mutation fails with network error", async () => {
    const variables = {
      title: "Test Article",
      body: "Test body",
      status: "public",
      articleType: "text",
      tagIds: [],
      video: null,
    };

    renderWithProviders(
      <CreateArticleForm {...defaultProps} />,
      [tagsQueryMock, createArticleNetworkErrorMock(variables)]
    );

    fireEvent.change(
      await screen.findByPlaceholderText("Enter Article title..."),
      { target: { value: "Test Article" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Write your Article content..."),
      { target: { value: "Test body" } }
    );

    fireEvent.click(screen.getByRole("button", { name: /create article/i }));

    await waitFor(() => {
      expect(screen.getByText("Network error")).toBeInTheDocument();
    });
  });

  test("calls onClose when cancel button is clicked without submitting", async () => {
    const onClose = jest.fn();

    renderWithProviders(
      <CreateArticleForm isOpen={true} onClose={onClose} />,
      [tagsQueryMock]
    );

    const cancelButton = await screen.findByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});