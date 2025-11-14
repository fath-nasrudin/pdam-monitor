"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getUserlist } from "@/features/user/user.service";

export default function AddMeterPage() {
  const users = getUserlist();
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Tambah Catatan Meteran</CardTitle>
        <CardDescription>
          Tambah catatan meteran setiap akhir bulan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Try to submit");
            console.log("SHOULD CALL THE ACTION FROM THE HOOK");
          }}
        >
          {users.map((u) => (
            <Field key={u.id} orientation={"horizontal"}>
              <FieldLabel className="min-w-40" htmlFor={u.id}>
                {u.username}
              </FieldLabel>
              <Input id={u.id} name={u.id} type="number" required />
            </Field>
          ))}

          <Button className="">Tambah Data</Button>
        </form>
      </CardContent>
    </Card>
  );
}
