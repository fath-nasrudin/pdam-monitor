import { prisma } from "@/lib/prisma";
import { BillingPeriod } from "../shared/schema.shared";
// import { Invoice } from "./invoice.type";
import {
  Invoice as InvoiceDB,
  PaymentStatus,
  Prisma,
} from "@/lib/generated/prisma/client";
import { Invoice } from "./invoice.type";

function transformInvoiceToObject(data: InvoiceDB): Invoice {
  return {
    id: data.id,
    userId: data.userId, //dadang
    billingPeriod: data.billingPeriod,
    totalUsage: data.totalUsage,
    totalAmount: data.totalAmount,
    totalPaid: data.totalPaid,
    paymentStatus: "unpaid",
    documentStatus: data.documentStatus,
    pricing: {
      fixed: data.pricingFixed,
      tariff: data.pricingTariff,
      discountAmount: data.pricingDiscountAmount,
    },
    reading: {
      prev: data.readingPrev,
      curr: data.readingCurr,
      discountAmount: data.readingDiscountAmount,
      discountPercentage: data.readingDiscountPercent,
    },
    paymentAllocation: [],
  };
}

function transformInvoiceToDB(
  data: GenerateInvoiceRepoInput
): Prisma.InvoiceUncheckedCreateInput {
  return {
    billingPeriod: data.billingPeriod,
    documentStatus: data.documentStatus,
    totalAmount: data.totalAmount,
    totalPaid: data.totalPaid,
    userId: data.userId,
    pricingFixed: data.pricing.fixed,
    pricingTariff: data.pricing.tariff,
    pricingDiscountAmount: data.pricing.discountAmount,
    pricingDiscountPercent: data.pricing.discountPercentage,
    readingCurr: data.reading.curr,
    readingPrev: data.reading.prev,
    totalUsage: data.totalUsage,
    readingDiscountAmount: data.reading.discountAmount,
    readingDiscountPercent: data.reading.discountPercentage,
  };
}

export async function getReadingValue({
  userId,
  billingPeriod,
}: {
  userId: string;
  billingPeriod: BillingPeriod;
}) {
  const result = await prisma.reading.findFirst({
    where: {
      userId,
      billingPeriod,
    },
  });
  if (!result) return null;
  return result.readingValue;
}

export async function findInvoices(props?: {
  where?: {
    billingPeriod?: BillingPeriod;
    userId?: string;
    paymentStatus?: PaymentStatus[];
  };
}): Promise<Invoice[]> {
  let billingPeriod = props?.where?.billingPeriod ?? undefined;

  // convert null -> undefined
  if (billingPeriod === null) {
    billingPeriod = undefined;
  }

  const invoiceDB = await prisma.invoice.findMany({
    where: {
      ...props?.where,
      paymentStatus: props?.where?.paymentStatus?.length
        ? {
            in: props?.where?.paymentStatus,
          }
        : undefined,
    },
  });
  return invoiceDB.map((invDB) => transformInvoiceToObject(invDB));
}

export type GenerateInvoiceRepoInput = Omit<Invoice, "id" | "user">;

export async function createInvoice(
  data: GenerateInvoiceRepoInput
): Promise<Invoice> {
  const mappedInvoice = transformInvoiceToDB(data);
  const createdInvoice = await prisma.invoice.create({ data: mappedInvoice });

  const mappedData = transformInvoiceToObject(createdInvoice);

  return mappedData;
}
