"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "./user.api";
import { BillingPeriod } from "../shared/schema.shared";

export function useGetUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.fetchUsers,
    meta: {
      successMessage: "Success fetch data",
    },
  });

  return { isLoading, data };
}

export default function useGetUsersByBillingPeriod(
  billingPeriod: BillingPeriod
) {
  const { data, isLoading } = useQuery({
    queryKey: ["users", billingPeriod],
    queryFn: userApi.fetchUsersHOF({ billingPeriod }),
    meta: {
      successMessage: "Success fetch data",
    },
  });

  return { isLoading, data };
}
