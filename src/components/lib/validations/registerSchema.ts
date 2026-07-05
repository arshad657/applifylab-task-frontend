import { z } from "zod";

/**
 * Shared registration schema.
 *
 * Used on the client (react-hook-form) AND re-validated on the server
 * (API route) so that a tampered or scripted client request can never
 * bypass validation. Never trust client-side validation alone.
 */
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name must be under 50 characters"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name must be under 50 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .max(254, "Email is too long")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password is too long"),
    confirmPassword: z.string().min(1, "Please repeat your password"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms & conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerServerSchema = registerSchema;
