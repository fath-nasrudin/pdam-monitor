import z from "zod";
import { billingPeriodSchema } from "../shared/schema.shared";

export const generateInvoiceSchema = z.object({
  billingPeriod: billingPeriodSchema,
  userId: z.string().min(1, "userId cannot be empty"),
});

export type GenerateInvoiceInput = z.infer<typeof generateInvoiceSchema>;
