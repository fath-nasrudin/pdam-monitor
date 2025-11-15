import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex gap-4 flex-col items-center justify-center ">
      <h1 className="text-5xl font-bold">PPAS Web</h1>
      <Link href={ROUTES.meter.add.path}>
        <Button>Tambah Catatan Meter</Button>
      </Link>
      <Link href={ROUTES.invoices.path}>
        <Button>Daftar Invoices</Button>
      </Link>
      <Link href={ROUTES.payments.add.path}>
        <Button>Tambah Pembayaran</Button>
      </Link>
    </div>
  );
}
