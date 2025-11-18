import { getUsersForReadings } from "@/features/user/user.service";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPeriod = `${new Date().getFullYear()}-${String(
    new Date().getMonth()
  ).padStart(2, "0")}`;
  const period = url.searchParams.get("period") || currentPeriod;

  try {
    const data = await getUsersForReadings(period);
    return Response.json({
      ok: true,
      message: "success",
      period,
      data,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      ok: false,
      message: "failed",
    });
  }
}
