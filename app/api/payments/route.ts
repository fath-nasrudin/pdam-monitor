import { Payment } from "@/features/payments/payment.type";
import { responseError, responseSuccess } from "@/lib/api/response";

const payments: Payment[] = [
  {
    id: "pay_001",
    userId: "user_123",
    amount: 500000,
    amountRemaining: 0,
    method: "cash",
    notes: "Pelunasan bulan Oktober",
  },
  {
    id: "pay_002",
    userId: "user_123",
    amount: 250000,
    amountRemaining: 50000,
    method: "transfer",
    notes: "Pembayaran sebagian via BCA",
  },
  {
    id: "pay_003",
    userId: "user_456",
    amount: 1000000,
    amountRemaining: 0,
    method: "transfer",
  },
  {
    id: "pay_004",
    userId: "user_789",
    amount: 150000,
    amountRemaining: 150000,
    method: "cash",
    notes: "Belum dialokasikan ke invoice",
  },
];

export async function GET() {
  try {
    return responseSuccess({ data: payments });
  } catch (error) {
    return responseError({ error });
  }
}
