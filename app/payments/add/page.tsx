"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserlist } from "@/features/user/user.service";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React from "react";

function UserCombobox() {
  const userlist = getUserlist();
  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedUserId
            ? userlist.find((u) => u.id === selectedUserId)?.username
            : "Pilih Pengguna"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Cari Pengguna..." className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ada pengguna ditemukan</CommandEmpty>
            <CommandGroup>
              {userlist.map((u) => (
                <CommandItem
                  key={u.id}
                  value={u.id}
                  onSelect={(currentUserId) => {
                    setSelectedUserId(
                      currentUserId === selectedUserId ? "" : currentUserId
                    );
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedUserId === u.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {u.username}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function AddPaymentPage() {
  return (
    <div className="max-w-md p-2">
      <Card>
        <CardHeader>
          <CardTitle>Buat Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              {/* pilih user */}
              <Field key={"test1"} orientation={"vertical"}>
                <FieldLabel className="min-w-40" htmlFor={"test1"}>
                  Pilih Pengguna
                </FieldLabel>
                {/* <Input id={"test1"} name={"test1"} type="text" required /> */}
                <UserCombobox />
              </Field>

              {/* amount */}
              <Field key={"test2"} orientation={"vertical"}>
                <FieldLabel className="min-w-40" htmlFor={"test2"}>
                  Jumlah
                </FieldLabel>
                <Input id={"test2"} name={"test2"} type="number" required />
              </Field>

              {/* method */}
              <Field key={"test3"} orientation={"vertical"}>
                <FieldLabel className="min-w-40" htmlFor={"test3"}>
                  Metode Pembayaran
                </FieldLabel>
                <Input id={"test3"} name={"test3"} type="text" required />
              </Field>

              {/* pilih beberapa invoice, simpan ke saldo jika ada lebih */}
              {/* pilih tanggal dan jam bayar. default sekarang */}
              <Field key={"test4"} orientation={"vertical"}>
                <FieldLabel className="min-w-40" htmlFor={"test4"}>
                  Pilih tagihan yang mau dibayar
                </FieldLabel>
                <Input id={"test4"} name={"test4"} type="text" required />
              </Field>

              {/* submit button */}
              <Button>Buat</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
