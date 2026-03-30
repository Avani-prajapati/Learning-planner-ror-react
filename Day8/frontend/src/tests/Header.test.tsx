import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";
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

  test("calls onLogin and onSignup when unauthenticated buttons are clicked", () => {
    const onLogin = jest.fn();
    const onSignup = jest.fn();

    mockedUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
      onLogout: jest.fn(),
    });

    renderHeader(onLogin, onSignup);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onSignup).toHaveBeenCalledTimes(1);
  });

  test("renders user name and Logout button when user is authenticated", () => {
    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", name: "Avani"},
      onLogout: jest.fn(),
    });

    renderHeader();

    expect(screen.getByText("Avani")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Login" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Sign up" })).not.toBeInTheDocument();
  });

  test("calls onLogout when Logout button is clicked", () => {
    const onLogout = jest.fn();

    mockedUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", name: "Avani"},
      onLogout,
    });

    renderHeader();

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});