import { User } from "@/lib/generated/prisma/client";

export type Invoice = {
  id: string;
  userId: string;
  user?: Partial<User>;
  billingPeriod: string;

  totalUsage: number;
  totalAmount: number;
  totalPaid: number;

  paymentStatus: "paid" | "partial" | "unpaid" | "waiped"; // computed
  documentStatus: "sent" | "draft";

  pricing: {
    fixed: number;
    tariff: number;
    discountAmount?: number | null;
    discountPercentage?: number | null;
  };

  reading: {
    prev: number;
    curr: number;
    discountAmount?: number | null;
    discountPercentage?: number | null;
  };

  paymentAllocation: { id: string; allocated: number }[];
};
