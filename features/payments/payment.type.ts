import { User } from "@/lib/generated/prisma/browser";

export type Payment = {
  id: string;
  userId: string;
  user?: User;
  amount: number;
  amountRemaining: number;
  method: "cash" | "transfer";
  notes?: string;
};
