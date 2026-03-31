import React from "react";
import { screen, waitFor} from "@testing-library/react";
import CreateArticleForm from "../components/CreateArticleForm";
import { renderWithProviders } from "../__mocks__/renderWithProvider";
import { tagsQueryMock } from "../__mocks__/articleFormMocks";

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
});