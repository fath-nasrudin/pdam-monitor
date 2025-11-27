import { CreatePaymentAllocationSchemaInput } from "./payment-allocation.schema";
import * as PayAllocDomain from "@/features/payment-allocation/payment-allocation.domain";
import * as PayAllocRepo from "@/features/payment-allocation/payment-allocation.repo";
import { PaymentAllocation } from "./payment-allocation.type";
import {
  getPaymentById,
  updatePaymentForAlloc,
} from "../payments/payment.service";
import {
  getInvoiceById,
  updateInvoiceForAlloc,
} from "../invoice/invoice.service";

export async function createPaymentAllocation(
  data: CreatePaymentAllocationSchemaInput
): Promise<PaymentAllocation> {
  // should take the invoice and payment
  // feed to create pay alloc domain to check some business rule
  const payment = await getPaymentById(data.paymentId);
  const invoice = await getInvoiceById(data.invoiceId);

  const payAlloc = PayAllocDomain.createPaymentAllocation({
    paymentAllocation: data,
    invoice,
    payment,
  });

  // if all good
  // should update the payment status of invoice and payment
  await updatePaymentForAlloc(payment.id, {
    amountAllocated: payment.amountAllocated + data.amount,
    amountRemaining: payment.amountRemaining - data.amount,
  });

  await updateInvoiceForAlloc(invoice, data);

  // should create the payAlloc

  return PayAllocRepo.createPaymentAllocation(payAlloc);
}
