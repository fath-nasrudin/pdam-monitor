import { createPaymentAllocationSchema } from "@/features/payment-allocation/payment-allocation.schema";
import { responseError, responseSuccess } from "@/lib/api/response";
import { NextRequest } from "next/server";
import { createPaymentAllocation as createPayAllocService } from "@/features/payment-allocation/payment-allocation.service";
import { auth } from "@/lib/auth/auth";
import { can } from "@/lib/auth/permission/permission.util";
import { PERMISSIONS } from "@/lib/auth/permission/permission.constant";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    can(session, PERMISSIONS.payAlloc.create);
    const body = await req.json();
    const data = await createPaymentAllocationSchema.parseAsync(body);
    const payAlloc = await createPayAllocService(data);
    return responseSuccess({ data: payAlloc });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
