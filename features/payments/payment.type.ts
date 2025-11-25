import { Invoice } from "../invoice/invoice.type";

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
  paymentAllocations: PaymentAllocation[];
};

export type PaymentAllocation = {
  id: string;
  paymentId: string;
  payment?: Payment;
  invoiceId: string;
  invoice?: Invoice;
  amount: number;
  notes: string | null | undefined;
};
