import { describe, expect, it } from "vitest";
import { employeeSchema } from "./employeeValidation";

const validEmployee = {
  name: "Atish Ovhal",
  email: "atish@example.com",
  mobile: "9876543210",
  country: "India",
  state: "Maharashtra",
  district: "Pune",
};

describe("employeeSchema", () => {
  it("accepts valid employee information", () => {
    const result = employeeSchema.safeParse(validEmployee);

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email address", () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      email: "invalid-email",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.flatten().fieldErrors.email,
      ).toContain("Enter a valid email address");
    }
  });

  it("rejects a mobile number shorter than 10 digits", () => {
    const result = employeeSchema.safeParse({
      ...validEmployee,
      mobile: "12345",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.flatten().fieldErrors.mobile,
      ).toContain("Mobile must contain 10 to 15 digits");
    }
  });

  it("rejects empty required fields", () => {
    const result = employeeSchema.safeParse({
      name: "",
      email: "",
      mobile: "",
      country: "",
      state: "",
      district: "",
    });

    expect(result.success).toBe(false);
  });
});