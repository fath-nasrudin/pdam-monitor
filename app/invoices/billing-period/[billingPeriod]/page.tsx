"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceCard } from "@/features/invoice/components/invoice-card";
import { GenerateInvoiceInput } from "@/features/invoice/invoice.schema";
import { Invoice } from "@/features/invoice/invoice.type";
import useGetUsersByBillingPeriod from "@/features/user/user.hook";
import { ApiResponse } from "@/lib/api/response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { use } from "react";

function EmptyInvoice({
  userId,
  billingPeriod,
}: {
  userId: string;
  billingPeriod: string;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const body: GenerateInvoiceInput = { userId, billingPeriod };
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const apiResponse: ApiResponse<Invoice> = await res.json();

      if (!res.ok) {
        throw new Error(apiResponse.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });
  return (
    <div>
      No Invoice{" "}
      <Button
        onClick={() => {
          mutateAsync();
        }}
      >
        Generate Invoice
      </Button>
    </div>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ billingPeriod: string }>;
}) {
  const { billingPeriod } = use(params);
  const { data: invoices, isLoading } = useQuery({
    initialData: [],
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await fetch(`/api/invoices?billingPeriod=${billingPeriod}`);
      if (!res.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data: { data: Invoice[] } = await res.json();
      return data.data;
    },
  });

  const { data: users, isLoading: isUsersLoading } =
    useGetUsersByBillingPeriod(billingPeriod);

  if (isLoading) return <p>Loading...</p>;
  if (isUsersLoading) return <p>Users Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Daftar Tagihan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {users?.map((u) => {
            const invoice = invoices.find((i) => i.userId === u.id);
            if (invoice) invoice.user = u;

            return (
              <div key={u.id}>
                <h2>{u.username}</h2>
                {invoice ? (
                  <InvoiceCard invoice={invoice} />
                ) : (
                  <EmptyInvoice billingPeriod={billingPeriod} userId={u.id} />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
