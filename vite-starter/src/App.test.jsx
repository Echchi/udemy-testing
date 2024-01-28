import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";
import { expect } from "vitest";
import { kebobCaseToTitleCase } from "./helper";

test("button click flow", () => {
  // render App
  render(<App />);

  // find the button
  const buttonElement = screen.getByRole("button", { name: /blue/i });

  // check initial color
  expect(buttonElement).toHaveClass("medium-violet-red");

  // click the button
  fireEvent.click(buttonElement);

  // check button text
  expect(buttonElement).toHaveTextContent(/red/i);

  // check the button color
  expect(buttonElement).toHaveClass("midnight-blue");
});

test("checkbox flow", () => {
  render(<App />);
  // find elemets
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", { name: /disable button/i });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // click checkbox again to re-endable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");
});

test("checkbox flow after button click", () => {
  // render App
  render(<App />);

  // find elemets
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", { name: /disable button/i });

  // click button to change to blue
  fireEvent.click(buttonElement);

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // click checkbox again to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");
});

describe("kebobCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebobCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphen", () => {
    expect(kebobCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebobCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
