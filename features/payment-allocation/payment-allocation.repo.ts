import { prisma } from "@/lib/prisma";
import { PaymentAllocation } from "./payment-allocation.type";

export type CreatePaymentAllocationDomainInput = Pick<
  PaymentAllocation,
  "amount" | "invoiceId" | "paymentId" | "notes"
>;
export async function createPaymentAllocation(
  data: CreatePaymentAllocationDomainInput
): Promise<PaymentAllocation> {
  return prisma.paymentAllocation.create({ data });
}
