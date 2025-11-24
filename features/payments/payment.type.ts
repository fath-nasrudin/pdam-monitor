import { User } from "@/lib/generated/prisma/browser";

export type Payment = {
  id: string;
  userId: string;
  user?: User;
  amount: number;
  amountRemaining: number;
  amountAllocated: number;
  paymentMethod: "cash" | "transfer";
  notes?: string;
};
