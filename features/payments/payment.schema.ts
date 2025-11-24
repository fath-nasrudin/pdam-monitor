import z from "zod";

export const createPaymentSchema = z.object({
  userId: z.string(),
  amount: z.string().min(1).transform(Number),
  paymentMethod: z.enum(["cash", "transfer"]),
  notes: z.string().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
