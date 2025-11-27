import { PaymentAllocation } from "../payment-allocation/payment-allocation.type";

export type Payment = {
  id: string;
  userId: string;
  user?: {
    id: string;
    username: string;
  };
  amount: number;
  amountRemaining: number;
  amountAllocated: number;
  paymentMethod: "cash" | "transfer";
  notes: string | null;
  paymentAllocations?: Omit<PaymentAllocation, "payment" | "paymentId">[];
};
