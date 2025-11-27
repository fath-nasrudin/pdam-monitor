import { createPaymentAllocationSchema } from "@/features/payment-allocation/payment-allocation.schema";
import { responseError, responseSuccess } from "@/lib/api/response";
import { NextRequest } from "next/server";
import { createPaymentAllocation as createPayAllocService } from "@/features/payment-allocation/payment-allocation.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await createPaymentAllocationSchema.parseAsync(body);
    const payAlloc = await createPayAllocService(data);
    return responseSuccess({ data: payAlloc });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
