"use client";

import { useGetInvoices } from "@/features/invoice/invoice.hook";
import useGetReadings from "@/features/meter/hooks/readings.hook";
import { useGetPayments } from "@/features/payments/payment.hook";
import { useGetUsers } from "@/features/user/user.hook";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const getUsers = useGetUsers();
  const getInvoices = useGetInvoices();
  const getReadings = useGetReadings();
  const getPayments = useGetPayments();

  // should return not authorized page
  if (session?.user.role !== "ADMIN") return <p>FORBIDDEN</p>;

  return (
    <div>
      <p>Admin Page</p>
      <div>Nama Admin: {session.user.username}</div>
      <div>
        <h2>Ringkasan</h2>
        <div>Total User: {getUsers.data?.length}</div>
        <div>Total Invoice: {getInvoices.data?.length}</div>
        <div>Total Reading: {getReadings.data?.length}</div>
        <div>Total Payment: {getPayments.data?.length}</div>
      </div>
    </div>
  );
}
