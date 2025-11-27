import { prisma } from "@/lib/prisma";
import { Payment } from "./payment.type";

export async function findPayments(): Promise<Payment[]> {
  const payments = await prisma.payment.findMany({
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return payments;
}

export type CreatePaymentDomainInput = Omit<
  Payment,
  "id" | "user" | "paymentAllocations"
>;
export async function createPayment(
  paymentData: CreatePaymentDomainInput
): Promise<Payment> {
  const createdPayment = await prisma.payment.create({
    data: paymentData,
  });
  return createdPayment;
}
