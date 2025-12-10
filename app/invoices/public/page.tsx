"use client";

import { InvoiceCard } from "@/features/invoice/components/invoice-card-2";
import { useGetInvoices } from "@/features/invoice/invoice.hook";
import { getPrevBillingPeriod } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
export default function DashboardPage() {
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId") ?? undefined;
  const billingPeriod = getPrevBillingPeriod(new Date());
  const getInvoices = useGetInvoices({ billingPeriod, userId });

  if (!userId) return <p>userId required</p>;
  if (getInvoices.isLoading) return <p>Loading...</p>;
  if (!getInvoices.data.length) return <p>Invoice not found</p>;
  const invoice = getInvoices.data[0];

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold text-center">Tagihan Bulan Ini</h2>
      <InvoiceCard invoice={invoice} />
    </div>
  );
}
