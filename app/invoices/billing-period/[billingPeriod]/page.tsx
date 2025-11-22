"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceCard } from "@/features/invoice/components/invoice-card";
import { Invoice } from "@/features/invoice/invoice.type";
import { useQuery } from "@tanstack/react-query";
// import { use } from "react";

export default function Page() {
  //   {
  //   params,
  // }: {
  //   params: Promise<{ billingPeriod: string }>;
  // }
  // const { billingPeriod } = use(params);
  const { data: invoices, isLoading } = useQuery({
    initialData: [],
    queryKey: ["invoices"],
    queryFn: async () => {
      //  ambil data
      // jika error throw
      // jika sukses return (otomatis nimpa initialData)
      const res = await fetch("/api/invoices");
      if (!res.ok) {
        // nanti kasih error ke error handler
        throw new Error("Failed to fetch invoices");
      }
      const data: { data: Invoice[] } = await res.json();
      return data.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Tagihan Yang Belum Lunas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {invoices.map((invoice, index) => (
            <InvoiceCard key={index} invoice={invoice} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
