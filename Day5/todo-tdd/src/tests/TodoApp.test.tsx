import { render, screen } from "@testing-library/react";
import TodoApp from "../components/TodoApp";
import userEvent from "@testing-library/user-event";

describe("TodoApp", () => {
  test("renders todo title", () => {
    render(<TodoApp />);
    
    const title = screen.getByText("Todo App");

    expect(title).toBeInTheDocument();
  });

  test("renders input field", () => {
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Add a todo");

  expect(input).toBeInTheDocument();
});

test("adds a new todo", async () => {
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Add a todo");
  const button = screen.getByText("Add");

  await userEvent.type(input, "Learn TDD");
  await userEvent.click(button);

  const todo = screen.getByText("Learn TDD");

  expect(todo).toBeInTheDocument();
});

test("delete todo", async () => {
  render(<TodoApp />);

  const input = screen.getByPlaceholderText("Add a todo");
  const addBtn = screen.getByText("Add");

  await userEvent.type(input, "Learn React");
  await userEvent.click(addBtn);

  const deleteBtn = screen.getByText("Delete");

  await userEvent.click(deleteBtn);

  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});

});