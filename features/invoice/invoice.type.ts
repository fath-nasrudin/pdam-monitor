import { User } from "@/lib/generated/prisma/client";

export type Invoice = {
  id: string;
  userId: string;
  user?: User;
  billingPeriod: string;

  totalUsage: number;
  totalAmount: number;
  totalPaid: number;

  paymentStatus: "paid" | "partial" | "unpaid" | "waiped"; // computed
  documentStatus: "sent" | "draft";

  pricing: {
    fixed: number;
    tariff: number;
    discountAmount?: number;
    discountPercentage?: number;
  };

  reading: {
    prev: number;
    curr: number;
    discountAmount?: number;
    discountPercentage?: number;
  };

  paymentAllocation: { id: string; allocated: number }[];
};
