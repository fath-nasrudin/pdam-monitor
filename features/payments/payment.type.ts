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
};
