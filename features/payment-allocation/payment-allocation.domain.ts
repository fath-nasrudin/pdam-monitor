import { CreatePaymentAllocationDomainInput } from "./payment-allocation.repo";
import { CreatePaymentAllocationSchemaInput } from "./payment-allocation.schema";

export function createPaymentAllocation({
  paymentAllocation,
}: {
  paymentAllocation: CreatePaymentAllocationSchemaInput;
}): CreatePaymentAllocationDomainInput {
  // add business logic later
  // throw error if the payAlloc amount > payment.remaining
  // throw error if the payAlloc amount > inv.notalreadypaid
  // throw error if payAlloc amount <= 0

  return paymentAllocation;
}
