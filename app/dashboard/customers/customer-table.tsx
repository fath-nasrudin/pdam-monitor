import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCustomers } from "@/features/user/user.service";
import { sleep } from "@/lib/utils";

export async function CustomerTable() {
  await sleep(3000);
  const users = await getCustomers();
  return (
    <Table>
      <TableCaption>Daftar Pengguna Air Sumur.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>username</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total Pengguna</TableCell>
          <TableCell className="text-right">{users.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export function CustomerTableSkeleton() {
  return (
    <Table>
      <TableCaption>
        <Skeleton className="h-4 w-32 mx-auto" />
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Skeleton className="h-4 w-10" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-20" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 6 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-8 ml-auto" />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
