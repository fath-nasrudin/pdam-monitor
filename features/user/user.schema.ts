import z from "zod";
import { billingPeriodSchema } from "../shared/schema.shared";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  initialPeriod: billingPeriodSchema,
  initialReading: z.coerce.number(),
});

export const safeUserSchema = userSchema.omit({ password: true });

export const userRegisterSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type UserSafe = z.infer<typeof safeUserSchema>;
export type UserRegisterInputSchema = z.infer<typeof userRegisterSchema>;
