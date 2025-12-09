import { userRegisterSchema, UserSafe } from "@/features/user/user.schema";
import { createUser } from "@/features/user/user.service";
import { responseError, responseSuccess } from "@/lib/api/response";
import { auth } from "@/lib/auth/auth";
import { PERMISSIONS } from "@/lib/auth/permission/permission.constant";
import { can } from "@/lib/auth/permission/permission.util";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    can(session, PERMISSIONS.user.create);

    const body = await req.json();
    const data = await userRegisterSchema.parseAsync(body);

    const user: UserSafe = await createUser(data);
    return responseSuccess({ data: user });
  } catch (error) {
    console.error(error);
    return responseError({ error });
  }
}
