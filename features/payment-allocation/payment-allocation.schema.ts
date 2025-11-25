import z from "zod";

export const createPaymentAllocationSchema = z.object({
  invoiceId: z.string(),
  paymentId: z.string(),
  amount: z.string().min(1).transform(Number),
  notes: z.string().optional(),
});

export type CreatePaymentAllocationSchemaInput = z.infer<
  typeof createPaymentAllocationSchema
>;
