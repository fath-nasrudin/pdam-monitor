import { Payment } from "../payment.type";

export function PaymentCard({ payment }: { payment: Payment }) {
  return (
    <div className="flex flex-col gap-2 justify-between border p-1">
      {payment.user && <div>{payment.user.username}</div>}
      <div>{payment.amount}</div>
      <div>{payment.paymentMethod}</div>
    </div>
  );
}
