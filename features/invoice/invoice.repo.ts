import { prisma } from "@/lib/prisma";
import { BillingPeriod } from "../shared/schema.shared";
// import { Invoice } from "./invoice.type";
import { Invoice as InvoiceDB, Prisma } from "@/lib/generated/prisma/client";
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

export const invoices: Invoice[] = [
  {
    id: "inv-001",
    userId: "cmi44y9d90000uuv0cbf4wydg", //dadang
    billingPeriod: "2025-01",
    totalUsage: 120,
    totalAmount: 145000,
    totalPaid: 145000,
    paymentStatus: "paid",
    documentStatus: "sent",
    pricing: {
      fixed: 50000,
      tariff: 800,
      discountAmount: 10000,
    },
    reading: {
      prev: 1000,
      curr: 1120,
    },
    paymentAllocation: [{ id: "pay-001", allocated: 145000 }],
  },

  {
    id: "inv-002",
    userId: "cmi44y9d90000uuv0cbf4wydg", //dadang
    billingPeriod: "2025-02",
    totalUsage: 95,
    totalAmount: 124000,
    totalPaid: 60000,
    paymentStatus: "partial",
    documentStatus: "sent",
    pricing: {
      fixed: 50000,
      tariff: 800,
    },
    reading: {
      prev: 1120,
      curr: 1215,
      discountPercentage: 5,
    },
    paymentAllocation: [{ id: "pay-002", allocated: 60000 }],
  },

  {
    id: "inv-003",
    userId: "cmi44y9ea0002uuv0jpkscmvi", //diding
    billingPeriod: "2025-01",
    totalUsage: 180,
    totalAmount: 190000,
    totalPaid: 0,
    paymentStatus: "unpaid",
    documentStatus: "draft",
    pricing: {
      fixed: 60000,
      tariff: 750,
    },
    reading: {
      prev: 500,
      curr: 680,
    },
    paymentAllocation: [],
  },

  {
    id: "inv-004",
    userId: "cmi44y9ea0002uuv0jpkscmvi", // diding
    billingPeriod: "2025-02",
    totalUsage: 0,
    totalAmount: 0,
    totalPaid: 0,
    paymentStatus: "waiped",
    documentStatus: "sent",
    pricing: {
      fixed: 60000,
      tariff: 750,
      discountPercentage: 100,
    },
    reading: {
      prev: 680,
      curr: 680,
      discountPercentage: 100,
    },
    paymentAllocation: [],
  },

  {
    id: "inv-005",
    userId: "cmi44y9ek0004uuv0nqw498g1", // yeyen
    billingPeriod: "2025-03",
    totalUsage: 210,
    totalAmount: 240000,
    totalPaid: 200000,
    paymentStatus: "partial",
    documentStatus: "draft",
    pricing: {
      fixed: 55000,
      tariff: 880,
    },
    reading: {
      prev: 300,
      curr: 510,
    },
    paymentAllocation: [
      { id: "pay-010", allocated: 150000 },
      { id: "pay-011", allocated: 50000 },
    ],
  },
];

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
    billingPeriod?: BillingPeriod | null;
  };
}): Promise<Invoice[]> {
  let billingPeriod = props?.where?.billingPeriod ?? undefined;

  // convert null -> undefined
  if (billingPeriod === null) {
    billingPeriod = undefined;
  }

  const invoiceDB = await prisma.invoice.findMany({ where: { billingPeriod } });
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
