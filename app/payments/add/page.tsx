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
import { PaymentCard } from "@/features/payments/components/payment-card";
import {
  CreatePaymentInput,
  createPaymentSchema,
} from "@/features/payments/payment.schema";
import { Payment } from "@/features/payments/payment.type";
import { useGetUsers } from "@/features/user/user.hook";
import { ApiResponse } from "@/lib/api/response";
import { User } from "@/lib/generated/prisma/browser";
// import { getUserlist } from "@/features/user/user.service";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import React from "react";

function UserCombobox({
  userlist,
  value,
  onChange,
}: {
  userlist: User[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const selectedUser = userlist.find((u) => u.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedUser ? selectedUser.username : "Pilih Pengguna"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Cari Pengguna..." className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ada pengguna ditemukan</CommandEmpty>
            <CommandGroup>
              {userlist?.map((u) => (
                <CommandItem
                  key={u.id}
                  value={u.id}
                  onSelect={(currentId) => {
                    const newValue = currentId === value ? "" : currentId;
                    onChange(newValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === u.id ? "opacity-100" : "opacity-0"
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
  const queryClient = useQueryClient();
  const { data: userlist, isLoading: isLoadingUsers } = useGetUsers();

  const { data: payments, isLoading } = useQuery({
    initialData: [],
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await fetch("/api/payments");
      const response: ApiResponse<Payment[]> = await res.json();
      if (!res.ok) {
        throw new Error(response.message);
      }
      return response.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data: CreatePaymentInput) => {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // temporal fix
        body: JSON.stringify({ ...data, amount: data.amount.toString() }),
      });

      const resData: ApiResponse<Payment> = await res.json();

      if (!res.ok) {
        throw new Error(resData.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
  });

  const formDefaultValues = {
    amount: "",
    paymentMethod: "cash",
    userId: "",
  };

  const form = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onChange: createPaymentSchema,
    },

    onSubmit: async ({ value }) => {
      const data = createPaymentSchema.parse(value);
      mutateAsync(data);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md p-2">
      <Card>
        <CardHeader>
          <CardTitle>Buat Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();

              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
              {/* pilih user */}
              <form.Field name="userId">
                {(field) => (
                  <Field id={field.name} orientation={"vertical"}>
                    <FieldLabel className="min-w-40" htmlFor={field.name}>
                      Pilih Pengguna
                    </FieldLabel>
                    {isLoadingUsers || !userlist ? (
                      <p>loading...</p>
                    ) : (
                      <UserCombobox
                        userlist={userlist}
                        value={field.state.value}
                        onChange={field.handleChange}
                      />
                    )}
                    {!field.state.meta.isValid && (
                      <em role="alert">
                        {field.state.meta.errors[0]?.message}
                      </em>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* amount */}
              <form.Field name="amount">
                {(field) => (
                  <Field orientation={"vertical"}>
                    <FieldLabel className="min-w-40" htmlFor={field.name}>
                      Jumlah
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    {!field.state.meta.isValid && (
                      <em role="alert">
                        {field.state.meta.errors[0]?.message}
                      </em>
                    )}
                  </Field>
                )}
              </form.Field>
              {/* method */}
              <form.Field name="paymentMethod">
                {(field) => (
                  <Field orientation={"vertical"}>
                    <FieldLabel className="min-w-40" htmlFor={field.name}>
                      Metode Pembayaran
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      required
                    />
                    {!field.state.meta.isValid && (
                      <em role="alert">
                        {field.state.meta.errors[0]?.message}
                      </em>
                    )}
                  </Field>
                )}
              </form.Field>

              {/* pilih beberapa invoice, simpan ke saldo jika ada lebih */}
              {/* pilih tanggal dan jam bayar. default sekarang */}

              {/* submit button */}
              <Button>Buat</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* list payment */}
      <div className="flex flex-col gap-2">
        {payments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
}
