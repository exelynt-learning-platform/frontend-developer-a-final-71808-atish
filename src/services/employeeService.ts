import api from "./api";
import type { Employee, EmployeeFormData } from "../types/employee";

export const employeeService = {
  async getAll(): Promise<Employee[]> {
    const response = await api.get<Employee[]>("/employee");
    return response.data;
  },

  async getById(id: string): Promise<Employee> {
    const response = await api.get<Employee>(`/employee/${id}`);
    return response.data;
  },

  async create(employee: EmployeeFormData): Promise<Employee> {
    const response = await api.post<Employee>("/employee", employee);
    return response.data;
  },

  async update(
    id: string,
    employee: EmployeeFormData,
  ): Promise<Employee> {
    const response = await api.put<Employee>(`/employee/${id}`, employee);
    return response.data;
  },

  async remove(id: string): Promise<Employee> {
    const response = await api.delete<Employee>(`/employee/${id}`);
    return response.data;
  },
};