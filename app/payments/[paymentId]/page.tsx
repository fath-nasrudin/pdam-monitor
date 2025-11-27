"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetInvoices } from "@/features/invoice/invoice.hook";
import { Invoice } from "@/features/invoice/invoice.type";
import { createPaymentAllocationSchema } from "@/features/payment-allocation/payment-allocation.schema";
import { PaymentAllocation } from "@/features/payment-allocation/payment-allocation.type";
import { useGetPaymentById } from "@/features/payments/payment.hook";
import { Payment } from "@/features/payments/payment.type";
import { translatePeriodToText } from "@/features/shared/utils.shared";
import { ApiResponse } from "@/lib/api/response";
import { handleUIError } from "@/lib/error/uiErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { use } from "react";
import z from "zod";

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
              {payment.paymentAllocations?.map((alloc) => (
                <div key={alloc.id} className="p-2 border">
                  {alloc.invoice && (
                    <div>
                      Period:{" "}
                      {translatePeriodToText(alloc.invoice.billingPeriod)}
                    </div>
                  )}
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

function PayAllocFormItem({
  payment,
  invoice,
}: {
  payment: Payment;
  invoice: Invoice;
}) {
  const queryClient = useQueryClient();

  const createPayAlloc = useMutation({
    mutationFn: async (data: z.input<typeof createPaymentAllocationSchema>) => {
      const rawRes = await fetch("/api/payment-allocations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res: ApiResponse<PaymentAllocation> = await rawRes.json();
      if (!rawRes.ok) {
        throw new Error(res.message);
      }
      return res.data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
    },
    onError: (error) => {
      handleUIError(error);
    },
  });

  const totalUnpaid = invoice.totalAmount - invoice.totalPaid;
  const payAllocation =
    totalUnpaid > payment.amountRemaining
      ? payment.amountRemaining
      : totalUnpaid;

  return (
    <div key={invoice.id} className="flex gap-2 items-center">
      <div className="p-2 border">
        <div>
          Periode:
          <span> {translatePeriodToText(invoice.billingPeriod)}</span>
        </div>
        <div>
          Total Tagihan:
          <span> {invoice.totalAmount}</span>
        </div>
        <div>
          Kurang Bayar:
          <span> {invoice.totalAmount - invoice.totalPaid}</span>
        </div>
        <div>
          Status:
          <span> {invoice.paymentStatus}</span>
        </div>
      </div>
      <Button
        aria-disabled={createPayAlloc.isPending}
        onClick={async () => {
          const data = {
            amount: payAllocation.toString(),
            invoiceId: invoice.id,
            paymentId: payment.id,
          };
          createPayAlloc.mutateAsync(data);
        }}
      >
        {createPayAlloc.isPending ? "..." : "Bayar"}
      </Button>
    </div>
  );
}

function PaymentAllocationForm({
  payment,
  invoices,
}: {
  payment: Payment;
  invoices: Invoice[];
}) {
  return (
    <div>
      <div>Bayaran belum dialokasikan: {payment.amountRemaining}</div>
      <div className="flex flex-col gap-2">
        {invoices?.map((inv) => (
          <PayAllocFormItem key={inv.id} invoice={inv} payment={payment} />
        ))}
      </div>
    </div>
  );
}

export default function PaymentDetailPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = use(params);
  const {
    data: currentPayment,
    isFetching,
    isLoading,
  } = useGetPaymentById(paymentId);
  const { data: invoices } = useGetInvoices({
    userId: currentPayment?.userId ?? undefined,
    paymentStatus: ["unpaid", "partial"],
  });

  if (isFetching) return <p>fetching data...</p>;
  if (isLoading) return <p>loading...</p>;
  if (!currentPayment) return <p>Payment Not Found</p>;

  return (
    <div>
      <PaymentCard payment={currentPayment} />
      <PaymentAllocationForm payment={currentPayment} invoices={invoices} />
    </div>
  );
}
