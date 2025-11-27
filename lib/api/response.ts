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
  let msg = message;

  if (error instanceof Error && !msg) {
    msg = error.message;
  }

  return NextResponse.json(
    {
      ok: false,
      message: msg || "Something unexpected happened",
      data: null,
      error: error,
    },
    {
      status,
    }
  );
}
