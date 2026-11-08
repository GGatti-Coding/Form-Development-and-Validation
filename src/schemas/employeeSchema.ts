import { z } from "zod";
 
// Letters (including accented ones), spaces, hyphens and apostrophes
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s'’-]*$/;
 
export const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be 50 characters or fewer")
    .regex(NAME_REGEX, "First name can only contain letters, spaces, hyphens and apostrophes"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be 50 characters or fewer")
    .regex(NAME_REGEX, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Please enter a valid email address")),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
      "Please enter a valid 10-digit phone number"
    ),
  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .regex(
      /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
      "Please enter a valid Canadian postal code (e.g. T2M 4L8)"
    )
    .transform((val) => val.toUpperCase()),
});
 
export type EmployeeFormData = z.infer<typeof employeeSchema>;
