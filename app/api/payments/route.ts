import { createPaymentSchema } from "@/features/payments/payment.schema";
import { responseError, responseSuccess } from "@/lib/api/response";
import { NextRequest } from "next/server";
import * as PaymentService from "@/features/payments/payment.service";
import { PaymentAllocation } from "@/features/payments/payment.type";

const paymentAllocations: PaymentAllocation[] = [
  {
    id: "alloc-1",
    paymentId: "pay-1",
    invoiceId: "inv-1",
    amount: 50000,
    notes: "Pembayaran sebagian",
  },
  {
    id: "alloc-2",
    paymentId: "pay-1",
    invoiceId: "inv-2",
    amount: 75000,
    notes: null,
  },
  {
    id: "alloc-3",
    paymentId: "pay-2",
    invoiceId: "inv-3",
    amount: 100000,
    notes: "Pelunasan",
  },
  {
    id: "alloc-4",
    paymentId: "pay-3",
    invoiceId: "inv-4",
    amount: 25000,
    notes: null,
  },
];

export async function GET() {
  try {
    const payments = await PaymentService.getPayments();

    const extendedPayments = payments.map((p) => ({
      ...p,
      paymentAllocations: paymentAllocations,
    }));
    return responseSuccess({ data: extendedPayments });
  } catch (error) {
    return responseError({ error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await createPaymentSchema.parseAsync(body);
    const payment = await PaymentService.createPayment(data);
    return responseSuccess({ data: payment });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
