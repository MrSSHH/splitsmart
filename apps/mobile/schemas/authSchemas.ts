import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "First name is too short"),
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be minimum 8 characters")
      .max(16, "Password must be maximum 16 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be minimum 8 characters")
    .max(16, "Password must be maximum 16 characters"),
});
