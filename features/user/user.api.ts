import { User } from "@/lib/generated/prisma/client";

export const userApi = {
  fetchUsers: async () => {
    const response = await fetch("/api/users");

    // error will be handle with tanstack global error
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: { data: User[] } = await response.json();
    return data.data;
  },
  fetchUsersHOF:
    ({ billingPeriod }: { billingPeriod?: string }) =>
    async () => {
      const url = `/api/users?
    ${billingPeriod && `billingPeriod=${billingPeriod}`}`;
      const response = await fetch(url);

      // error will be handle with tanstack global error
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: { data: User[] } = await response.json();
      return data.data;
    },
};
