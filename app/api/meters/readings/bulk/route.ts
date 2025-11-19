import { NextResponse } from "next/server";
import { addReadingsBulk } from "@/features/meter/reading.service";
import { addReadingsSchema } from "@/features/meter/reading.schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await addReadingsSchema.parseAsync(body);
    const result = await addReadingsBulk(data);
    return NextResponse.json({
      ok: true,
      billingPeriod: data.billingPeriod,
      message: "success",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        message: "failed",
      },
      {}
    );
  }
}
