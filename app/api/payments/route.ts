import { createPaymentSchema } from "@/features/payments/payment.schema";
import { Payment } from "@/features/payments/payment.type";
import { responseError, responseSuccess } from "@/lib/api/response";
import { NextRequest } from "next/server";

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

export async function GET() {
  try {
    return responseSuccess({ data: payments });
  } catch (error) {
    return responseError({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await createPaymentSchema.parseAsync(body);
    payments.unshift({
      ...data,
      id: Date.now().toString(),
      amountRemaining: data.amount,
      amountAllocated: 0,
    });
    return responseSuccess({ data: data });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
