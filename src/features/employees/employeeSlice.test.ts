import { describe, expect, it } from "vitest";
import type { Employee } from "../../types/employee";
import employeeReducer, {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "./employeeSlice";
import type { EmployeeFormValues } from "./employeeValidation";

const formValues: EmployeeFormValues = {
  name: "Atish Ovhal",
  email: "atish@example.com",
  mobile: "9876543210",
  country: "India",
  state: "Maharashtra",
  district: "Pune",
};

const employee: Employee = {
  id: "532",
  ...formValues,
};

describe("employee reducer", () => {
  it("returns the initial state", () => {
    const state = employeeReducer(undefined, {
      type: "unknown",
    });

    expect(state.employees).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("sets loading while employees are being fetched", () => {
    const initialState = employeeReducer(undefined, {
      type: "unknown",
    });

    const state = employeeReducer(
      initialState,
      fetchEmployees.pending("request-id", undefined),
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("stores fetched employees", () => {
    const initialState = employeeReducer(undefined, {
      type: "unknown",
    });

    const state = employeeReducer(
      initialState,
      fetchEmployees.fulfilled(
        [employee],
        "request-id",
        undefined,
      ),
    );

    expect(state.loading).toBe(false);
    expect(state.employees).toEqual([employee]);
  });

  it("adds a newly created employee", () => {
    const initialState = employeeReducer(undefined, {
      type: "unknown",
    });

    const state = employeeReducer(
      initialState,
      createEmployee.fulfilled(
        employee,
        "request-id",
        formValues,
      ),
    );

    expect(state.employees).toContainEqual(employee);
    expect(state.saving).toBe(false);
    expect(state.successMessage).toBe(
      "Employee added successfully",
    );
  });

  it("updates an existing employee", () => {
    const existingState = employeeReducer(
      undefined,
      fetchEmployees.fulfilled(
        [employee],
        "request-id",
        undefined,
      ),
    );

    const updatedEmployee: Employee = {
      ...employee,
      name: "Atish Updated",
    };

    const updatedValues: EmployeeFormValues = {
      ...formValues,
      name: "Atish Updated",
    };

    const state = employeeReducer(
      existingState,
      updateEmployee.fulfilled(
        updatedEmployee,
        "request-id",
        {
          id: employee.id,
          values: updatedValues,
        },
      ),
    );

    expect(state.employees[0].name).toBe("Atish Updated");
    expect(state.successMessage).toBe(
      "Employee updated successfully",
    );
  });

  it("removes a deleted employee", () => {
    const existingState = employeeReducer(
      undefined,
      fetchEmployees.fulfilled(
        [employee],
        "request-id",
        undefined,
      ),
    );

    const state = employeeReducer(
      existingState,
      deleteEmployee.fulfilled(
        employee.id,
        "request-id",
        employee.id,
      ),
    );

    expect(state.employees).toEqual([]);
    expect(state.deletingId).toBeNull();
    expect(state.successMessage).toBe(
      "Employee deleted successfully",
    );
  });
});