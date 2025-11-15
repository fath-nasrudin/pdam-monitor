import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function InvoiceListItem() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>
          Tagihan <span className="block">November 2025</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <div>nama Pengguna</div> <div>Fathurrohman</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Meteran Awal</div> <div>123</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Meteran Akhir</div> <div>123</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Total Meteran</div> <div>123</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Beban Bulanan</div> <div>Rp. 10.000</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Air Per kubik</div> <div>Rp. 6.000</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Air Per kubik</div> <div>Rp. 6.000</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Anuan</div> <div>(Rp. 6.000 * 12) + 10.000 = 124.000</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Total Tagihan</div> <div>Rp. 124.000</div>
          </div>
          <div className="flex gap-2 justify-between">
            <div>Status Bayaran</div> <div>Bayar Sebagian</div>
            {/* di bayar sebagian ada dropdown lihat berapa saja udah bayar. terhubung ke bagian payment */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function InvoiceListPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Tagihan Yang Belum Lunas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <InvoiceListItem key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
