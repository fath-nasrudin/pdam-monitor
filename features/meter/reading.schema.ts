import { z } from "zod";

export const readingItemSchema = z.object({
  userId: z.string().min(1, "userId wajib"),
  readingValue: z.string().min(1).transform(Number),
  // .min(0, "nggak boleh minus"),
});

export const addReadingsSchema = z.object({
  billingPeriod: z.string().regex(/^\d{4}-\d{2}$/, "format harus YYYY-MM"),
  readings: z.array(readingItemSchema).min(1, "Minimal 1 reading"),
});

export type AddReadingsInput = z.infer<typeof addReadingsSchema>;
