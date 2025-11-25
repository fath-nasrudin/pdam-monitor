import { Invoice } from "../invoice/invoice.type";
import { Payment } from "../payments/payment.type";

export type PaymentAllocation = {
  id: string;
  paymentId: string;
  payment?: Pick<Payment, "id">;
  invoiceId: string;
  invoice?: Pick<Invoice, "id">;
  amount: number;
  notes: string | null | undefined;
};
