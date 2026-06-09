import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"), // Fixed typo in error message ("First" -> "Last")
    email: z.string().email("Invalid email address"), // Fixed: z.email() -> z.string().email()
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
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be minimum 8 characters")
    .max(16, "Password must be maximum 16 characters"),
});

export const createGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, "Group name is required")
    .max(30, "Name cannot exceed 30 characters"),
  groupDescription: z
    .string()
    .max(100, "Description cannot exceed 100 characters")
    .optional(),
  selectedIcon: z.string().min(1, "Please pick a group icon image"),
  friendsInGroup: z
    .array(z.string())
    .min(1, "Please select at least one member to join the group"),
});

export const addExpenseSchema = z.object({
  groupId: z.number(),
  amountValue: z
    .number()
    .positive("Amount must be greater than zero")
    .max(999999, "Amount is too high"),
  group: z.number().min(1, "Please select a group"), // Fixed: Rescued this from being trapped in a comment string
  expenseReason: z.string().min(1).optional(),
  date: z.date(),
});

export type AddExpenseFormData = z.infer<typeof addExpenseSchema>;
export type CreateGroupFormData = z.infer<typeof createGroupSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
