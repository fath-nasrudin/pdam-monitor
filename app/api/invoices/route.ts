import {
  findInvoiceQuerySchema,
  generateInvoiceSchema,
} from "@/features/invoice/invoice.schema";
import {
  generateInvoice,
  getInvoices,
} from "@/features/invoice/invoice.service";
import { responseError, responseSuccess } from "@/lib/api/response";
import { auth } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/permission/permission.constant";
import { can } from "@/lib/auth/permission/permission.util";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const billingPeriod = searchParams.get("billingPeriod") ?? undefined;
  const userId = searchParams.get("userId") ?? undefined;

  try {
    const session = await auth();
    can(session, PERMISSIONS.invoice.read);

    const { paymentStatus } = await findInvoiceQuerySchema.parseAsync({
      paymentStatus: searchParams.getAll("paymentStatus"),
    });

    const data = await getInvoices({ billingPeriod, userId, paymentStatus });

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
    const session = await auth();
    can(session, PERMISSIONS.invoice.create);

    const body = await req.json();
    const data = await generateInvoiceSchema.parseAsync(body);

    const createdInvoice = await generateInvoice(data);

    return responseSuccess({ data: createdInvoice });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
