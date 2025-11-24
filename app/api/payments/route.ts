import { createPaymentSchema } from "@/features/payments/payment.schema";
import { responseError, responseSuccess } from "@/lib/api/response";
import { NextRequest } from "next/server";
import * as PaymentService from "@/features/payments/payment.service";

export async function GET() {
  try {
    const payments = await PaymentService.getPayments();
    return responseSuccess({ data: payments });
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
