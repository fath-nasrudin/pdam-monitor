"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "./user.api";

export default function useGetUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.fetchUsers,
    meta: {
      successMessage: "Success fetch data",
    },
  });

  return { isLoading, data };
}
