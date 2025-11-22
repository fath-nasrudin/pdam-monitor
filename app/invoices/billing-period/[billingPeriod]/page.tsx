"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceCard } from "@/features/invoice/components/invoice-card";
import { Invoice } from "@/features/invoice/invoice.type";
import useGetUsersByBillingPeriod from "@/features/user/user.hook";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

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
        <div>
          {users?.map((u) => {
            const invoice = invoices.find((i) => i.userId === u.id);
            if (invoice) invoice.user = u;

            return (
              <div key={u.id}>
                <h2>{u.username}</h2>
                <InvoiceCard invoice={invoice} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
