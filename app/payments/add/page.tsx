"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserCombobox } from "@/components/user-combobox";
import { PaymentCard } from "@/features/payments/components/payment-card";
import {
  CreatePaymentInput,
  createPaymentSchema,
} from "@/features/payments/payment.schema";
import { Payment } from "@/features/payments/payment.type";
import { useGetUsers } from "@/features/user/user.hook";
import { ApiResponse } from "@/lib/api/response";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function AddPaymentPage() {
  const queryClient = useQueryClient();
  const { data: userlist, isLoading: isLoadingUsers } = useGetUsers();

  const {
    data: payments,
    isLoading: isLoadingPayments,
    isFetching: isFetchingPayments,
  } = useQuery({
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
        {isLoadingPayments ? (
          <p>Payment Loading...</p>
        ) : isFetchingPayments ? (
          <p>Fetching Payments...</p>
        ) : !payments.length ? (
          <p>No payment found. Create payment first</p>
        ) : (
          payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        )}
      </div>
    </div>
  );
}
