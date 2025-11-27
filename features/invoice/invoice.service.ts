import type { PaymentStatus } from "@/lib/generated/prisma/enums";
import { BillingPeriod } from "../shared/schema.shared";
import * as invoiceDomain from "./invoice.domain";
import * as invoiceRepo from "./invoice.repo";
import { GenerateInvoiceInput } from "./invoice.schema";
import { Invoice } from "./invoice.type";
import { CreatePaymentAllocationSchemaInput } from "../payment-allocation/payment-allocation.schema";
import { Invoice as InvoiceDB } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

function getPrevBillingPeriod(currentPeriod: BillingPeriod) {
  const [yearStr, monthStr] = currentPeriod.split("-");
  let year = Number(yearStr);
  let month = Number(monthStr);

  if (month === 1) {
    month = 12;
    year -= 1;
  } else {
    month -= 1;
  }

  const m = month.toString().padStart(2, "0");
  return `${year}-${m}`;
}

async function getActivePricing(): Promise<Invoice["pricing"]> {
  return {
    fixed: 10000,
    tariff: 6000,
  };
}

async function getPrevAndCurrentReading({
  userId,
  billingPeriod,
}: {
  userId: string;
  billingPeriod: BillingPeriod;
}) {
  const prevReading = await invoiceRepo.getReadingValue({
    userId,
    billingPeriod: getPrevBillingPeriod(billingPeriod),
  });

  const currReading = await invoiceRepo.getReadingValue({
    userId,
    billingPeriod,
  });
  if (!prevReading)
    throw new Error("Catatan meteran bulan lalu tidak ditemukan di database");
  if (!currReading)
    throw new Error("Catatan meteran bulan ini tidak ditemukan di database");
  return {
    prev: prevReading,
    curr: currReading,
  };
}

export async function generateInvoice({
  userId,
  billingPeriod,
}: GenerateInvoiceInput): Promise<Invoice> {
  const pricing = await getActivePricing();
  const reading = await getPrevAndCurrentReading({ userId, billingPeriod });

  const invoiceData = await invoiceDomain.generateInvoice({
    reading: reading,
    pricing,
    userId,
    billingPeriod,
  });

  //   save invoice data to db
  // return saved invoice data
  const savedInvoice = await invoiceRepo.createInvoice(invoiceData);
  return savedInvoice;
  //   should append user?
}

export async function getInvoices(props?: {
  billingPeriod?: BillingPeriod;
  userId?: string;
  paymentStatus?: PaymentStatus[];
}) {
  return invoiceRepo.findInvoices({ where: props });
}

export async function getInvoiceById(invoiceId: string) {
  return invoiceRepo.findInvoiceById(invoiceId);
}

export async function updateInvoiceForAlloc(
  invoice: Invoice,
  payAlloc: CreatePaymentAllocationSchemaInput
) {
  // logic for create alloc
  const totalPaid = invoice.totalPaid + payAlloc.amount;

  const data: Pick<InvoiceDB, "totalPaid" | "paymentStatus"> = {
    totalPaid: totalPaid,
    paymentStatus: invoice.totalAmount === totalPaid ? "paid" : "partial",
  };

  return prisma.invoice.update({ where: { id: invoice.id }, data: data });
}
