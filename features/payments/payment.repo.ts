import { Payment } from "./payment.type";

const payments: Payment[] = [
  {
    id: "pay_001",
    userId: "user_123",
    amount: 500000,
    amountAllocated: 0,
    amountRemaining: 500000,
    paymentMethod: "cash",
    notes: "Pelunasan bulan Oktober",
  },
  {
    id: "pay_002",
    userId: "user_123",
    amount: 250000,
    amountAllocated: 0,
    amountRemaining: 50000,
    paymentMethod: "transfer",
    notes: "Pembayaran sebagian via BCA",
  },
  {
    id: "pay_003",
    userId: "user_456",
    amount: 1000000,
    amountAllocated: 0,
    amountRemaining: 0,
    paymentMethod: "transfer",
  },
  {
    id: "pay_004",
    userId: "user_789",
    amount: 150000,
    amountAllocated: 0,
    amountRemaining: 150000,
    paymentMethod: "cash",
    notes: "Belum dialokasikan ke invoice",
  },
];

export async function findPayments(): Promise<Payment[]> {
  return payments;
}

export type CreatePaymentDomainInput = Omit<Payment, "id">;
export async function createPayment(
  paymentData: CreatePaymentDomainInput
): Promise<Payment> {
  const createdPayment = {
    ...paymentData,
    id: Date.now().toString(),
  };
  payments.unshift(createdPayment);
  return createdPayment;
}
