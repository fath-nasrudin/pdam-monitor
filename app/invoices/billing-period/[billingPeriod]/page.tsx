"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/features/invoice/invoice.type";
import { translatePeriodToText } from "@/features/shared/utils.shared";
import { useQuery } from "@tanstack/react-query";
// import { use } from "react";

function InvoiceListItem({ invoice }: { invoice: Invoice }) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>
          Tagihan{" "}
          <span className="block">
            {translatePeriodToText(invoice.billingPeriod)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <div>nama Pengguna</div> <div>Fathurrohman</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Meteran Awal</div> <div>{invoice.reading.prev}</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Meteran Akhir</div> <div>{invoice.reading.curr}</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Total Meteran</div> <div>{invoice.totalUsage}</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Beban Bulanan</div> <div>{}</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Air Per kubik</div> <div>{invoice.pricing.tariff}</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Beban Bulanan</div> <div>{invoice.pricing.fixed}</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Anuan</div> <div>(Rp. 6.000 * 12) + 10.000 = 124.000</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Total Tagihan</div> <div>{invoice.totalAmount}</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Status Bayaran</div> <div>{invoice.paymentStatus}</div>
            {/* di bayar sebagian ada dropdown lihat berapa saja udah bayar. terhubung ke bagian payment */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
            <InvoiceListItem key={index} invoice={invoice} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
