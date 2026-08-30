import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),

  mobile: z
    .string()
    .trim()
    .regex(/^[0-9]{10,15}$/, "Mobile must contain 10 to 15 digits"),

  country: z
    .string()
    .min(1, "Country is required"),

  state: z
    .string()
    .trim()
    .min(2, "State must contain at least 2 characters")
    .max(50, "State cannot exceed 50 characters"),

  district: z
    .string()
    .trim()
    .min(2, "District must contain at least 2 characters")
    .max(50, "District cannot exceed 50 characters"),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;