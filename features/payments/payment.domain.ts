import { CreatePaymentDomainInput } from "./payment.repo";
import { CreatePaymentSchemaInput } from "./payment.schema";

export function createPayment(
  data: CreatePaymentSchemaInput
): CreatePaymentDomainInput {
  // do all logic

  return { ...data, amountAllocated: 0, amountRemaining: data.amount };
}
