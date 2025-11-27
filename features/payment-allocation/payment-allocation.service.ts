import { CreatePaymentAllocationSchemaInput } from "./payment-allocation.schema";
import * as PayAllocDomain from "@/features/payment-allocation/payment-allocation.domain";
import * as PayAllocRepo from "@/features/payment-allocation/payment-allocation.repo";
import { PaymentAllocation } from "./payment-allocation.type";
import { getPaymentById } from "../payments/payment.service";
import { getInvoiceById } from "../invoice/invoice.service";

export async function createPaymentAllocation(
  data: CreatePaymentAllocationSchemaInput
): Promise<PaymentAllocation> {
  // should take the invoice and payment
  // feed to create pay alloc domain to check some business rule
  const payment = await getPaymentById(data.paymentId);
  const invoice = await getInvoiceById(data.invoiceId);

  // if all good
  // should update the payment status of invoice and payment
  // should create the payAlloc

  const payAlloc = PayAllocDomain.createPaymentAllocation({
    paymentAllocation: data,
    invoice,
    payment,
  });

  return PayAllocRepo.createPaymentAllocation(payAlloc);
}
