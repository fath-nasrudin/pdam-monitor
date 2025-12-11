"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/features/invoice/invoice.type";
import { translatePeriodToText } from "@/features/shared/utils.shared";
import { formatRupiah } from "@/lib/utils";

interface Props {
  invoice?: Invoice;
}

const paymentStatusLabel = {
  unpaid: "Belum Dibayar",
  partial: "Dibayar sebagian",
  paid: "Lunas",
  waiped: "Dianggap lunas",
};

export function InvoiceCard({ invoice }: Props) {
  if (!invoice) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        <p>No Invoice found. Generate first</p>
      </Card>
    );
  }

  const rows = [
    {
      label: "Nama Pengguna",
      value: invoice.user?.username ?? "-",
      bold: true,
    },
    { label: "Meteran Awal", value: invoice.reading.prev },
    { label: "Meteran Akhir", value: invoice.reading.curr },
    {
      label: "Total Penggunaan",
      value: (
        <>
          {invoice.totalUsage}m<sup>3</sup>
        </>
      ),
      bold: true,
    },
    { label: "Beban Bulanan", value: invoice.pricing.fixed, type: "price" },
    { label: "Air per kubik", value: invoice.pricing.tariff, type: "price" },
    {
      label: "Total Tagihan",
      value: invoice.totalAmount,
      type: "price",
      bold: true,
    },
    { label: "Yang sudah dibayar", value: invoice.totalPaid, type: "price" },
    {
      label: "Kurang bayar",
      value: invoice.totalAmount - invoice.totalPaid,
      type: "price",
    },
  ];

  return (
    <Card className="shadow-md border rounded-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="space-y-1">
          <div className="text-lg font-semibold">Tagihan</div>
          <div className="text-sm text-muted-foreground">
            {translatePeriodToText(invoice.billingPeriod)}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {rows.map((item) => (
            <div key={item.label} className={`flex justify-between text-sm`}>
              <span
                className={`${
                  item.bold
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`${
                  item.bold
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {item.type === "price" ? formatRupiah(item.value) : item.value}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status Pembayaran</span>
          <Badge
            variant={
              invoice.paymentStatus === "paid"
                ? "default"
                : invoice.paymentStatus === "partial"
                ? "secondary"
                : "destructive"
            }
          >
            {paymentStatusLabel[invoice.paymentStatus]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function PaymentBreakdown({
  payments,
}: {
  payments: { amount: number; date: string }[];
}) {
  if (!payments?.length) return null;
  return (
    <div className="mt-4 space-y-2 text-sm">
      <div className="font-medium">Rincian Pembayaran</div>
      {payments.map((p, i) => (
        <div key={i} className="flex justify-between text-muted-foreground">
          <span>{p.date}</span>
          <span>{p.amount}</span>
        </div>
      ))}
    </div>
  );
}

export function InvoiceCardSkeleton() {
  return (
    <Card className="shadow-md border rounded-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="space-y-2 flex flex-col items-center">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-32" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
