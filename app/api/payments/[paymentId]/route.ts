import * as PaymentService from "@/features/payments/payment.service";
import { responseError, responseSuccess } from "@/lib/api/response";
import { auth } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/permission/permission.constant";
import { can } from "@/lib/auth/permission/permission.util";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  try {
    const session = await auth();
    can(session, PERMISSIONS.payment.read);

    const { paymentId } = await params;
    const payment = await PaymentService.getPaymentById(paymentId);

    return responseSuccess({ data: payment });
  } catch (error) {
    return responseError({ error });
  }
}
