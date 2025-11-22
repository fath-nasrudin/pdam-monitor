import { Invoice } from "./invoice.type";

export type GenerateInvoiceDomainInput = Pick<
  Invoice,
  "billingPeriod" | "reading" | "pricing" | "userId"
>;

export type GenerateInvoiceDomainOutput = Omit<Invoice, "id" | "user">;

// helper
function calculateUsage(reading: GenerateInvoiceDomainInput["reading"]) {
  let result = reading.curr - reading.prev;

  if (reading.discountAmount) result = result - reading.discountAmount;
  if (reading.discountPercentage) result = result - reading.discountPercentage;

  if (result < 0) throw new Error("Usage should not below zero");

  return result;
}

function calculateAmount({
  usage,
  pricing,
}: {
  usage: number;
  pricing: GenerateInvoiceDomainInput["pricing"];
}) {
  let result = usage * pricing.tariff + pricing.fixed;

  if (pricing.discountAmount) result = result - pricing.discountAmount;
  if (pricing.discountPercentage) result = result - pricing.discountPercentage;

  if (result < 0) throw new Error("totalAmount should not below zero");

  return result;
}

export function generateInvoice(
  data: GenerateInvoiceDomainInput
): GenerateInvoiceDomainOutput {
  const usage = calculateUsage(data.reading);
  const totalAmount = calculateAmount({ usage, pricing: data.pricing });

  return {
    ...data,
    billingPeriod: data.billingPeriod,
    totalAmount,
    documentStatus: "draft",
    paymentStatus: "unpaid",
    paymentAllocation: [],
    totalPaid: 0,
    totalUsage: usage,
    pricing: data.pricing,
    userId: data.userId,
    reading: data.reading,
  };
}
