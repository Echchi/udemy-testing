import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("checkbox flow", async () => {
  const user = userEvent.setup();
  // render App
  render(<SummaryForm />);
  // find elements
  const buttonElement = screen.getByRole("button", { name: /order/i });
  const checkboxElement = screen.getByRole("checkbox", { name: /terms and conditions/i });
  // check initial conditions
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();

  // click checkbox to enable button
  await user.click(checkboxElement);
  expect(buttonElement).toBeEnabled();

  // click checkbox again to disble button
  await user.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
