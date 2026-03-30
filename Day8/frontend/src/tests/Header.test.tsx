import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

jest.mock("../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Header", () => {
  const mockedUseAuth = useAuth as jest.Mock;

  const renderHeader = (onLogin = jest.fn(), onSignup = jest.fn()) =>
    render(
      <ChakraProvider value={defaultSystem}>
        <Header onLogin={onLogin} onSignup={onSignup} />
      </ChakraProvider>,
    );

  beforeEach(() => {
    mockedUseAuth.mockReset();
  });

  test("renders Login and Sign up buttons when user is not authenticated", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      onLogout: jest.fn(),
    });

    renderHeader();

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Logout" })).not.toBeInTheDocument();
  });
});