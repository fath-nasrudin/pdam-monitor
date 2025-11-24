import z from "zod";
import { billingPeriodSchema } from "../shared/schema.shared";

export const generateInvoiceSchema = z.object({
  billingPeriod: billingPeriodSchema,
  userId: z.string().min(1, "userId cannot be empty"),
});

export const findInvoiceQuerySchema = z.object({
  billingPeriod: billingPeriodSchema.optional(),
  paymentStatus: z
    .array(z.enum(["paid", "partial", "unpaid", "waiped"]))
    .optional(),
});

export type FindInvoiceQueryInput = z.infer<typeof findInvoiceQuerySchema>;
export type GenerateInvoiceInput = z.infer<typeof generateInvoiceSchema>;
