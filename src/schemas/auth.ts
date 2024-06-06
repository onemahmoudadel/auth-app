import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1).max(24),
  lastName: z.string().min(1).max(24),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  confirmPassword: z.string().min(6).max(255),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255)
})
