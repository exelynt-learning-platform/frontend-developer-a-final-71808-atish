import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import EmployeeForm from "./EmployeeForm";
import type { Country } from "../types/country";
import type { EmployeeFormValues } from "../features/employees/employeeValidation";

const countries: Country[] = [
  {
    id: "1",
    country: "India",
  },
  {
    id: "2",
    country: "Singapore",
  },
];

const defaultValues: EmployeeFormValues = {
  name: "Atish Ovhal",
  email: "atish@example.com",
  mobile: "9876543210",
  country: "India",
  state: "Maharashtra",
  district: "Pune",
};

describe("EmployeeForm", () => {
  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();

    render(
      <EmployeeForm
        countries={countries}
        submitting={false}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /save employee/i,
      }),
    );

    expect(
      await screen.findByText(
        "Name must contain at least 2 characters",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Email is required"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Mobile must contain 10 to 15 digits",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Country is required"),
    ).toBeInTheDocument();
  });

  it("pre-populates employee values in edit mode", () => {
    render(
      <EmployeeForm
        countries={countries}
        defaultValues={defaultValues}
        submitting={false}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Name")).toHaveValue(
      "Atish Ovhal",
    );

    expect(screen.getByLabelText("Email")).toHaveValue(
      "atish@example.com",
    );

    expect(screen.getByLabelText("Mobile")).toHaveValue(
      "9876543210",
    );

    expect(screen.getByLabelText("State")).toHaveValue(
      "Maharashtra",
    );

    expect(screen.getByLabelText("District")).toHaveValue(
      "Pune",
    );
  });

  it("calls onCancel when Cancel is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <EmployeeForm
        countries={countries}
        submitting={false}
        onSubmit={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /cancel/i }),
    );

    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("disables form actions while submitting", () => {
    render(
      <EmployeeForm
        countries={countries}
        submitting
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /saving/i }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: /cancel/i }),
    ).toBeDisabled();
  });
});