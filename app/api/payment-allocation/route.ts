import { createPaymentAllocationSchema } from "@/features/payment-allocation/payment-allocation.schema";
import { responseError, responseSuccess } from "@/lib/api/response";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await createPaymentAllocationSchema.parseAsync(body);
    return responseSuccess({ data: data });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
