"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Invoice } from "@/features/invoice/invoice.type";
import { translatePeriodToText } from "@/features/shared/utils.shared";

export function InvoiceCard({ invoice }: { invoice: Invoice }) {
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
