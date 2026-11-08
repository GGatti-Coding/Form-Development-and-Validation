import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be under 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be under 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
      "Please enter a valid 10-digit phone number"
    ),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      "Please enter a valid Canadian postal code (e.g. T2M 4L8)"
    )
    .transform((val) => val.toUpperCase()),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;