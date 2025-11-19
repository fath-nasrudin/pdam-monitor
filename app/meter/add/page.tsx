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
import { addReadingsSchema } from "@/features/meter/reading.schema";
import useGetUsers from "@/features/user/user.hook";
import { handleUIError } from "@/lib/error/uiErrorHandler";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export default function AddMeterPage() {
  const { data: users, isLoading } = useGetUsers();
  const queryClient = useQueryClient();
  const router = useRouter();

  // mutation
  const mutation = useMutation({
    mutationFn: async (values: z.input<typeof addReadingsSchema>) => {
      const response = await fetch("/api/meters/readings/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat data");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Berhasil tambah data");

      queryClient.invalidateQueries({ queryKey: ["readings"] });

      router.push("/meter");
    },
    onError: (error) => {
      handleUIError(error);
    },
  });

  const defaultReadings = users
    ? users.map((u) => ({
        userId: u.id,
        readingValue: ``,
      }))
    : [{ userId: "", readingValue: "" }];

  const formDefaultValues = {
    billingPeriod: "",
    readings: defaultReadings,
  };
  // form
  const form = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onChange: addReadingsSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      mutation.mutate(value);
    },
  });

  if (isLoading || !users) return <p>Loading...</p>;

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
            e.stopPropagation();

            form.handleSubmit();
          }}
        >
          <form.Field name="billingPeriod">
            {(field) => (
              <Field orientation={"horizontal"}>
                <FieldLabel className="min-w-40" htmlFor={field.name}>
                  {"Periode"}
                </FieldLabel>
                <div>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert">{field.state.meta.errors[0]?.message}</em>
                  )}
                </div>
              </Field>
            )}
          </form.Field>

          <div className="h-0.5 w-full bg-gray-100"></div>

          <form.Field name="readings">
            {(field) => {
              return (
                <div className="flex flex-col gap-2">
                  {field.state.value.map((_, i) => {
                    return (
                      <form.Field key={i} name={`readings[${i}].readingValue`}>
                        {(subField) => {
                          return (
                            <Field orientation={"horizontal"}>
                              <FieldLabel
                                className="min-w-40"
                                htmlFor={subField.name}
                              >
                                {users[i].username}
                              </FieldLabel>
                              <div>
                                <Input
                                  id={subField.name}
                                  name={subField.name}
                                  value={subField.state.value}
                                  type="number"
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                  required
                                />
                                <em role="alert">
                                  {field.state.meta.errors[0]?.message}
                                </em>
                              </div>
                            </Field>
                          );
                        }}
                      </form.Field>
                    );
                  })}
                </div>
              );
            }}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" aria-disabled={!canSubmit}>
                {isSubmitting ? "..." : "Tambahkan"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
