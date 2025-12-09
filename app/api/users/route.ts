import { getUsersByBillingPeriod } from "@/features/user/user.service";
import { responseError } from "@/lib/api/response";
import { auth } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/permission/permission.constant";
import { can } from "@/lib/auth/permission/permission.util";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const currentPeriod = `${new Date().getFullYear()}-${String(
    new Date().getMonth()
  ).padStart(2, "0")}`;
  const period = url.searchParams.get("period") || currentPeriod;

  try {
    const session = await auth();
    can(session, PERMISSIONS.user.readList);

    const data = await getUsersByBillingPeriod(period);
    return Response.json({
      ok: true,
      message: "success",
      period,
      data,
    });
  } catch (error) {
    console.error(error);
    return responseError({
      error,
      message: error instanceof Error ? error.message : "failed",
    });
  }
}
