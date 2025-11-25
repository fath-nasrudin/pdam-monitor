"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetInvoices } from "@/features/invoice/invoice.hook";
import { useGetPayments } from "@/features/payments/payment.hook";
import { Payment } from "@/features/payments/payment.type";
import { translatePeriodToText } from "@/features/shared/utils.shared";
import { use } from "react";

function PaymentCard({ payment }: { payment: Payment }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pembayaran</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {payment.user && (
            <div>
              Dari: <span>{payment.user.username}</span>
            </div>
          )}
          <div>
            Total bayar: <span>{payment.amount}</span>
          </div>
          <div>
            Metode: <span>{payment.paymentMethod}</span>
          </div>
          <div>
            Telah dialokasikan: <span>{payment.amountAllocated}</span>
          </div>
          <div>
            Belum dialokasikan: <span>{payment.amountRemaining}</span>
          </div>

          <div className="p-2 border">
            <h2>Detail alokasi</h2>
            <div className="space-y-2">
              {payment.paymentAllocations.map((alloc) => (
                <div key={alloc.id} className="p-2 border">
                  <div>invoice: {alloc.invoiceId}</div>
                  <div>Dialokasikan: {alloc.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PaymentDetailPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = use(params);
  const { data, isFetching, isLoading } = useGetPayments();
  const currentPayment = data?.find((p) => p.id === paymentId);
  const { data: invoices } = useGetInvoices({
    userId: currentPayment?.userId ?? undefined,
  });

  if (isFetching) return <p>fetching data...</p>;
  if (isLoading) return <p>loading...</p>;
  if (!currentPayment) return <p>Payment Not Found</p>;

  return (
    <div>
      <PaymentCard payment={currentPayment} />

      <div>
        <div>invoice belum lunas</div>
        <div className="flex flex-col gap-2">
          {invoices?.map((inv) => (
            <div key={inv.id} className="p-2 border">
              <div>
                Periode:
                <span> {translatePeriodToText(inv.billingPeriod)}</span>
              </div>
              <div>
                Total Tagihan:
                <span> {inv.totalAmount}</span>
              </div>
              <div>
                Kurang Bayar:
                <span> {inv.totalAmount - inv.totalPaid}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
