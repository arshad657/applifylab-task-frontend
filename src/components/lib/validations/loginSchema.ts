import { z } from "zod";

/**
 * Login schema. Deliberately lighter than the registration schema — we
 * don't re-enforce password composition rules at login time, since a
 * user's existing password may predate a policy change. We only check
 * that something was submitted.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(254, "Email is too long")
    .email("Enter a valid email address"),
  password: z.string().min(1, "Password is required").max(128, "Password is too long"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginServerSchema = loginSchema;
