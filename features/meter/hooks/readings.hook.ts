"use client";

import { useQuery } from "@tanstack/react-query";

type UserMeterReadings = {
  userId: string;
  name: string;
  readings: Record<string, number | null>;
};
export default function useGetReadings() {
  const { data, isLoading } = useQuery({
    queryKey: ["readings"],
    queryFn: async () => {
      const response = await fetch("/api/meters/readings");

      // error will be handle with tanstack global error
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: { data: UserMeterReadings[] } = await response.json();
      return data.data;
    },
    meta: {
      successMessage: "Success fetch data",
    },
  });

  return { isLoading, data };
}
