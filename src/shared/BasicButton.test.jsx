import { render, screen } from "@testing-library/react";
// import { test, expect } from "@jest/globals";
import BasicButton from "@/shared/BasicButton";

test("renders a button with the correct text", () => {
  render(<BasicButton type="button" onClick={() => "Clicked"} variant="outlined">
            Cancel
          </BasicButton>);

  const buttonElement = screen.getByRole("button", { name: "Cancel" });
  expect(buttonElement).toBeInTheDocument();
});