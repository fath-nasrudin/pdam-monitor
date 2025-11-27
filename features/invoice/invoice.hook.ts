"use client";

import { useQuery } from "@tanstack/react-query";
import { Invoice } from "./invoice.type";

export const useGetInvoices = (queries?: {
  billingPeriod?: string;
  userId?: string;
  paymentStatus?: Invoice["paymentStatus"][];
}) => {
  let url = `/api/invoices?`;
  if (queries?.billingPeriod) {
    url = `${url}&billingPeriod=${queries.billingPeriod}`;
  }
  if (queries?.userId) {
    url = `${url}&userId=${queries.userId}`;
  }
  if (queries?.paymentStatus?.length) {
    queries.paymentStatus.forEach((pS) => {
      url += `&paymentStatus=${pS}`;
    });
  }

  // query key builder
  const queryKey = ["invoice"];
  if (queries?.userId) queryKey.push(queries.userId);
  if (queries?.billingPeriod) queryKey.push(queries.billingPeriod);
  if (queries?.paymentStatus)
    queryKey.push(JSON.stringify(queries.paymentStatus));

  const { data, isLoading, isFetching } = useQuery({
    initialData: [],
    queryKey,
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data: { data: Invoice[] } = await res.json();
      return data.data;
    },
  });

  return { data, isLoading, isFetching };
};
