import { NextResponse } from "next/server";

export type ApiResponse<T> = {
  ok: boolean;
  data: T;
  message: string;
  error: unknown;
};

export function responseSuccess<T>({
  data,
  message,
}: {
  data: T;
  message?: string;
}) {
  return NextResponse.json({
    ok: true,
    message: message || "success",
    data: data,
    error: null,
  });
}

export function responseError({
  error,
  message,
}: {
  error: unknown;
  message?: string;
}) {
  const status = 500;

  return NextResponse.json(
    {
      ok: false,
      message: message || "Something unexpected happened",
      data: null,
      error: error,
    },
    {
      status,
    }
  );
}
