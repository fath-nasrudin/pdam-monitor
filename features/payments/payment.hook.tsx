"use client";

import { ApiResponse } from "@/lib/api/response";
import { useQuery } from "@tanstack/react-query";
import { Payment } from "./payment.type";

export const useGetPayments = () => {
  const { data, isLoading, isFetching } = useQuery({
    initialData: [],
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await fetch("/api/payments");
      const response: ApiResponse<Payment[]> = await res.json();
      if (!res.ok) {
        throw new Error(response.message);
      }
      return response.data;
    },
  });

  return { data, isLoading, isFetching };
};
