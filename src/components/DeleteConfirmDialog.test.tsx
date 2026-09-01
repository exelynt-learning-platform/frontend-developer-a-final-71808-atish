import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import type { Employee } from "../types/employee";

const employee: Employee = {
  id: "532",
  name: "Atish Ovhal",
  email: "atish@example.com",
  mobile: "9876543210",
  country: "India",
  state: "Maharashtra",
  district: "Pune",
};

describe("DeleteConfirmDialog", () => {
  it("does not display when no employee is selected", () => {
    render(
      <DeleteConfirmDialog
        employee={null}
        loading={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    expect(
      screen.queryByText("Delete employee?"),
    ).not.toBeInTheDocument();
  });

  it("displays the selected employee name", () => {
    render(
      <DeleteConfirmDialog
        employee={employee}
        loading={false}
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Atish Ovhal"),
    ).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <DeleteConfirmDialog
        employee={employee}
        loading={false}
        onClose={onClose}
        onConfirm={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /cancel/i }),
    );

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onConfirm when Delete is clicked", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <DeleteConfirmDialog
        employee={employee}
        loading={false}
        onClose={vi.fn()}
        onConfirm={onConfirm}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /^delete$/i }),
    );

    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("disables actions while deletion is running", () => {
    render(
      <DeleteConfirmDialog
        employee={employee}
        loading
        onClose={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /cancel/i }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: /deleting/i }),
    ).toBeDisabled();
  });
});