import { NextResponse } from "next/server";
import {
  addReadingsBulk,
  AddReadingsBulkInput,
} from "@/features/meter/reading.service";

export async function POST(request: Request) {
  const body: AddReadingsBulkInput = await request.json();
  const result = await addReadingsBulk(body);
  try {
    return NextResponse.json({
      ok: true,
      message: "success",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      ok: false,
      message: "failed",
    });
  }
}
