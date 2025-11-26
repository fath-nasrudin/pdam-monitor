import * as PaymentRepo from "./payment.repo";
import * as PaymentDomain from "./payment.domain";
import { CreatePaymentInput } from "./payment.schema";
import { Payment } from "./payment.type";
import { prisma } from "@/lib/prisma";

export async function getPayments(): Promise<Payment[]> {
  return PaymentRepo.findPayments();
}

export async function getPaymentById(paymentId: string): Promise<Payment> {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      paymentAllocations: {
        where: {
          paymentId: paymentId,
        },
      },
    },
  });

  if (!payment) throw new Error(`Payment with id: "${paymentId}" not found`);
  return payment;
}

export async function createPayment(
  data: CreatePaymentInput
): Promise<Payment> {
  const payment = PaymentDomain.createPayment(data);

  const createdPayment = await PaymentRepo.createPayment(payment);
  return createdPayment;
}
