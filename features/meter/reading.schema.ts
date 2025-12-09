import { z } from "zod";
import { billingPeriodSchema } from "../shared/schema.shared";

export const readingItemSchema = z.object({
  userId: z.string().min(1, "userId wajib"),
  readingValue: z.string().min(1).transform(Number),
  // .min(0, "nggak boleh minus"),
});

export const addReadingsSchema = z.object({
  billingPeriod: billingPeriodSchema,
  readingDate: z.coerce.date<string>(),
  readings: z.array(readingItemSchema).min(1, "Minimal 1 reading"),
});

export type AddReadingsInput = z.infer<typeof addReadingsSchema>;
