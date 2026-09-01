import type { AxiosResponse } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "./api";
import { employeeService } from "./employeeService";
import type {
  Employee,
  EmployeeFormData,
} from "../types/employee";

vi.mock("./api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const employee: Employee = {
  id: "532",
  name: "Atish Ovhal",
  email: "atish@example.com",
  mobile: "9876543210",
  country: "India",
  state: "Maharashtra",
  district: "Pune",
};

const formValues: EmployeeFormData = {
  name: "Atish Ovhal",
  email: "atish@example.com",
  mobile: "9876543210",
  country: "India",
  state: "Maharashtra",
  district: "Pune",
};

describe("employeeService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("gets all employees", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: [employee],
    } as AxiosResponse<Employee[]>);

    const result = await employeeService.getAll();

    expect(api.get).toHaveBeenCalledWith("/employee");
    expect(result).toEqual([employee]);
  });

  it("gets an employee by ID", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: employee,
    } as AxiosResponse<Employee>);

    const result = await employeeService.getById("532");

    expect(api.get).toHaveBeenCalledWith("/employee/532");
    expect(result).toEqual(employee);
  });

  it("creates an employee", async () => {
    vi.mocked(api.post).mockResolvedValue({
      data: employee,
    } as AxiosResponse<Employee>);

    const result = await employeeService.create(formValues);

    expect(api.post).toHaveBeenCalledWith(
      "/employee",
      formValues,
    );
    expect(result).toEqual(employee);
  });

  it("updates an employee", async () => {
    vi.mocked(api.put).mockResolvedValue({
      data: employee,
    } as AxiosResponse<Employee>);

    const result = await employeeService.update(
      "532",
      formValues,
    );

    expect(api.put).toHaveBeenCalledWith(
      "/employee/532",
      formValues,
    );
    expect(result).toEqual(employee);
  });

  it("deletes an employee", async () => {
    vi.mocked(api.delete).mockResolvedValue({
      data: employee,
    } as AxiosResponse<Employee>);

    const result = await employeeService.remove("532");

    expect(api.delete).toHaveBeenCalledWith(
      "/employee/532",
    );
    expect(result).toEqual(employee);
  });
});