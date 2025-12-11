import { InvoiceCard } from "@/features/invoice/components/invoice-card-2";
import { getInvoices } from "@/features/invoice/invoice.service";
import { getPrevBillingPeriod } from "@/lib/utils";

export async function Invoice({ userId }: { userId: string }) {
  userId = (userId as string) ?? undefined;

  const billingPeriod = getPrevBillingPeriod(new Date());
  const invoices = await getInvoices({ billingPeriod, userId });

  if (!userId) return <p>userId required</p>;
  if (!invoices.length) return <p>Invoice not found</p>;
  const invoice = invoices[0];

  return <InvoiceCard invoice={invoice} />;
}
