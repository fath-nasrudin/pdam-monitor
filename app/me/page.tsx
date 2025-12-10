"use client";
import { InvoiceCard } from "@/features/invoice/components/invoice-card-2";
import { useGetInvoices } from "@/features/invoice/invoice.hook";
import { getPrevBillingPeriod } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const billingPeriod = getPrevBillingPeriod(new Date());

  const userId = session?.user.id;

  // should return not authorized page

  const getInvoices = useGetInvoices({ billingPeriod, userId });

  if (session?.user?.role !== "USER") return <p>NOT AUTHORIZED</p>;
  if (!session) return <p>Not Authenticated</p>;
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
