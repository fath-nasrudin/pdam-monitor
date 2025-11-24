import * as PaymentRepo from "./payment.repo";
import * as PaymentDomain from "./payment.domain";
import { CreatePaymentInput } from "./payment.schema";
import { Payment } from "./payment.type";

export async function getPayments(): Promise<Payment[]> {
  return PaymentRepo.findPayments();
}

export async function createPayment(
  data: CreatePaymentInput
): Promise<Payment> {
  const payment = PaymentDomain.createPayment(data);

  const createdPayment = await PaymentRepo.createPayment(payment);
  return createdPayment;
}
