import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
  licenseNumber: z.string().min(16),
  licenseValidUntil: z.coerce.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createUserSchema = userSchema
  .pick({
    name: true,
    email: true,
    password: true,
    licenseNumber: true,
    licenseValidUntil: true,
  })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export type User = z.infer<typeof userSchema>;

export type CreateUserRequestBody = z.infer<typeof createUserSchema>;
