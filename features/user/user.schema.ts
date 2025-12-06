import z from "zod";
import { billingPeriodSchema } from "../shared/schema.shared";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  initialPeriod: billingPeriodSchema,
  initialReading: z.coerce.number(),
});

export const safeUserSchema = userSchema.omit({ password: true });

export const userRegisterSchema = userSchema.omit({ id: true });
export const userLoginSchema = userSchema.pick({
  username: true,
  password: true,
});

export type User = z.infer<typeof userSchema>;
export type UserSafe = z.infer<typeof safeUserSchema>;
export type UserRegisterInputSchema = z.infer<typeof userRegisterSchema>;
export type UserLoginInputSchema = z.infer<typeof userLoginSchema>;
