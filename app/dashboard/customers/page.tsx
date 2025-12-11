import { Suspense } from "react";
import { CustomerTable, CustomerTableSkeleton } from "./customer-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomersPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Daftar Pengguna</h1>
        <p className="text-muted-foreground text-sm">
          Semua pengguna yang terdaftar dalam sistem.
        </p>
      </header>

      <Card className="shadow-sm border rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Users</CardTitle>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<CustomerTableSkeleton />}>
            <CustomerTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
