import { Suspense } from "react";
import { Invoice } from "./invoice";
import { InvoiceCardSkeleton } from "@/features/invoice/components/invoice-card-2";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let userId = (await searchParams).userId;
  userId = (userId as string) ?? undefined;

  if (!userId) return <p>userId required</p>;

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold text-center">Tagihan Bulan Ini</h2>
      <Suspense fallback={<InvoiceCardSkeleton />}>
        <Invoice userId={userId} />
      </Suspense>
      {/* <InvoiceCardSkeleton /> */}
    </div>
  );
}
