import * as PaymentService from "@/features/payments/payment.service";
import { responseError, responseSuccess } from "@/lib/api/response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await params;
    const payment = await PaymentService.getPaymentById(paymentId);

    return responseSuccess({ data: payment });
  } catch (error) {
    return responseError({ error });
  }
}
