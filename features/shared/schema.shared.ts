import z from "zod";

export const billingPeriodSchema = z
  .string()
  .regex(/^\d{4}-\d{2}$/, "format harus YYYY-MM");

export type BillingPeriod = z.infer<typeof billingPeriodSchema>;
