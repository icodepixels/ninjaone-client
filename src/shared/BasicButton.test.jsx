import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from 'vitest';
import BasicButton from "@/shared/BasicButton";

test("renders a button with the correct text", () => {
  render(<BasicButton type="button" onClick={() => "Clicked"} variant="outlined">
            Cancel
          </BasicButton>);

  const buttonElement = screen.getByRole("button", { name: "Cancel" });
  expect(buttonElement).toBeInTheDocument();
});

describe('BasicButton', () => {
  test('applies the correct variant class', () => {
    render(<BasicButton variant="danger">Delete</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('danger');
  });

  test('applies the correct size class', () => {
    render(<BasicButton size="large">Large Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('large');
  });

  test('handles click events', () => {
    const handleClick = vi.fn();
    render(<BasicButton onClick={handleClick}>Click Me</BasicButton>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with start icon', () => {
    render(<BasicButton startIcon="icon-name">With Icon</BasicButton>);
    const iconContainer = document.querySelector('.svg-container');
    expect(iconContainer).toBeInTheDocument();
  });

  test('renders with end icon', () => {
    render(<BasicButton endIcon={<span>→</span>}>Next</BasicButton>);
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  test('applies disabled state correctly', () => {
    render(<BasicButton disabled>Disabled Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('applies additional className', () => {
    render(<BasicButton className="custom-class">Custom Button</BasicButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});