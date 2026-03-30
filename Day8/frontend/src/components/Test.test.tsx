import { render, screen } from '@testing-library/react';
import Test from "./Test";

describe('Test', () => {
    test("renders Test component text", () => {
        render(<Test />);
      
        expect(screen.getByText("Test")).toBeInTheDocument();
    });
});