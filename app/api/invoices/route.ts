import { generateInvoiceSchema } from "@/features/invoice/invoice.schema";
import {
  generateInvoice,
  getInvoices,
} from "@/features/invoice/invoice.service";
import { responseError, responseSuccess } from "@/lib/api/response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const billingPeriod = searchParams.get("billingPeriod");
  const data = await getInvoices({ billingPeriod });
  try {
    return Response.json({
      ok: true,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      ok: false,
      message: "failed",
    });
  }
}

// generate invoice
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await generateInvoiceSchema.parseAsync(body);

    const createdInvoice = await generateInvoice(data);

    return responseSuccess({ data: createdInvoice });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
