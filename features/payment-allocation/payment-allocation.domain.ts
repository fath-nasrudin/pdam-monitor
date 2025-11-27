import { Invoice } from "../invoice/invoice.type";
import { Payment } from "../payments/payment.type";
import { CreatePaymentAllocationDomainInput } from "./payment-allocation.repo";
import { CreatePaymentAllocationSchemaInput } from "./payment-allocation.schema";

export function createPaymentAllocation({
  invoice,
  payment,
  paymentAllocation,
}: {
  paymentAllocation: CreatePaymentAllocationSchemaInput;
  invoice: Invoice;
  payment: Payment;
}): CreatePaymentAllocationDomainInput {
  if (paymentAllocation.amount <= 0) {
    throw new Error("PAYMENT_ALLOCATION_MUST_BE_POSITIVE_NUMBER");
  }

  if (payment.amountRemaining < paymentAllocation.amount) {
    throw new Error("INSUFFICIENCE_PAYMENT_AMOUNT_REMAINING");
  }
  const invoiceTotalUnpaid = invoice.totalAmount - invoice.totalPaid;
  if (invoiceTotalUnpaid < paymentAllocation.amount) {
    throw new Error("TOTAL_PAYMENT_ALLOCATION_BIGGER_THAN_TOBEPAID");
  }

  return paymentAllocation;
}
